import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Validate required fields
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Create and save new note
    const note = new Note({
      title: title.trim(),
      content: content || "",
      userId
    });

    const savedNote = await note.save();

    return res.status(201).json({
      message: "Note created successfully",
      note: savedNote
    });
  } catch (error) {
    console.error("createNote error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error creating note" });
  }
};

export const getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Find all notes for the user, sorted by newest first
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Notes retrieved successfully",
      notes
    });
  } catch (error) {
    console.error("getNotesByUser error:", error);
    return res.status(500).json({ message: "Error retrieving notes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note retrieved successfully",
      note
    });
  } catch (error) {
    console.error("getNoteById error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    return res.status(500).json({ message: "Error retrieving note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    // Build update object
    const updateData = {};
    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updateData.title = title.trim();
    }
    if (content !== undefined) {
      updateData.content = content;
    }

    const note = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error("updateNote error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    return res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("deleteNote error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    return res.status(500).json({ message: "Error deleting note" });
  }
};

