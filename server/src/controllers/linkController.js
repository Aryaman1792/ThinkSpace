import Link from "../models/Link.js";
import Note from "../models/Note.js";

// Extract note links from text using [[Note Title]] syntax
function extractNoteLinks(text) {
  if (!text) return [];
  const regex = /\[\[([^\]]+)\]\]/g;
  const found = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const linkTitle = match[1].trim();
    if (linkTitle) {
      found.push(linkTitle);
    }
  }
  // Remove duplicates
  return [...new Set(found)];
}

export const updateLinksForNote = async (req, res) => {
  try {
    const { noteId, content, userId } = req.body;

    if (!noteId) {
      return res.status(400).json({ message: "NoteId is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Verify the source note exists and belongs to the user
    const sourceNote = await Note.findOne({ _id: noteId, userId });
    if (!sourceNote) {
      return res.status(404).json({ message: "Note not found or access denied" });
    }

    // Extract all linked note titles from content
    const linkedTitles = extractNoteLinks(content || "");

    // Find or create target notes
    const targetNoteIds = [];
    for (const title of linkedTitles) {
      // Try to find existing note with this title
      let targetNote = await Note.findOne({ 
        title: title, 
        userId 
      });

      // If note doesn't exist, create it automatically
      if (!targetNote) {
        targetNote = new Note({
          title: title,
          content: "",
          userId
        });
        await targetNote.save();
      }

      targetNoteIds.push(targetNote._id);
    }

    // Get current links for this note
    const currentLinks = await Link.find({ sourceNoteId: noteId });
    const currentTargetIds = currentLinks.map(link => link.targetNoteId.toString());

    // Find links to delete (old links not in new list)
    const linksToDelete = currentLinks.filter(link => 
      !targetNoteIds.some(id => id.toString() === link.targetNoteId.toString())
    );

    // Delete old links
    if (linksToDelete.length > 0) {
      await Link.deleteMany({
        _id: { $in: linksToDelete.map(link => link._id) }
      });
    }

    // Find links to create (new links not in current list)
    const linksToCreate = targetNoteIds.filter(targetId => 
      !currentTargetIds.includes(targetId.toString())
    );

    // Create new links
    const newLinks = [];
    for (const targetId of linksToCreate) {
      // Prevent self-links
      if (targetId.toString() === noteId.toString()) {
        continue;
      }

      try {
        const link = new Link({
          sourceNoteId: noteId,
          targetNoteId: targetId,
          userId
        });
        await link.save();
        newLinks.push(link);
      } catch (error) {
        // Ignore duplicate link errors (unique index)
        if (error.code !== 11000) {
          console.error("Error creating link:", error);
        }
      }
    }

    return res.status(200).json({
      message: "Links updated successfully",
      linksCreated: newLinks.length,
      linksDeleted: linksToDelete.length,
      totalLinks: targetNoteIds.length
    });
  } catch (error) {
    console.error("updateLinksForNote error:", error);
    return res.status(500).json({ message: "Error updating links" });
  }
};

export const getBacklinks = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({ message: "NoteId is required" });
    }

    // Find all links where this note is the target
    const links = await Link.find({ targetNoteId: noteId }).populate({
      path: "sourceNoteId",
      select: "title content"
    });

    // Extract source notes
    const backlinkNotes = links
      .map(link => link.sourceNoteId)
      .filter(note => note !== null); // Filter out any nulls if note was deleted

    return res.status(200).json({
      message: "Backlinks retrieved successfully",
      backlinks: backlinkNotes
    });
  } catch (error) {
    console.error("getBacklinks error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    return res.status(500).json({ message: "Error retrieving backlinks" });
  }
};

