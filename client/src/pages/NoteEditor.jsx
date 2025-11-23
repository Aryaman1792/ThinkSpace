import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote, getBacklinks, updateLinks, getNotes } from "../utils/noteAPI";
import { extractNoteLinks } from "../utils/extractLinks";

export default function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [backlinks, setBacklinks] = useState([]);
  const [isLoadingBacklinks, setIsLoadingBacklinks] = useState(false);
  const autoSaveIntervalRef = useRef(null);
  const hasChangesRef = useRef(false);
  const titleRef = useRef("");
  const contentRef = useRef("");
  
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const response = await getNote(id);
        const noteData = response.note;
        setNote(noteData);
        const noteTitle = noteData.title || "";
        const noteContent = noteData.content || "";
        setTitle(noteTitle);
        setContent(noteContent);
        titleRef.current = noteTitle;
        contentRef.current = noteContent;
        setLastSaved(new Date(noteData.updatedAt || noteData.createdAt));
        hasChangesRef.current = false;
        
        // Fetch backlinks
        fetchBacklinks(id);
      } catch (error) {
        console.error("Error fetching note:", error);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const fetchBacklinks = async (noteId) => {
    if (!noteId) return;
    
    setIsLoadingBacklinks(true);
    try {
      const response = await getBacklinks(noteId);
      setBacklinks(response.backlinks || []);
    } catch (error) {
      console.error("Error fetching backlinks:", error);
    } finally {
      setIsLoadingBacklinks(false);
    }
  };

  const saveNote = async (showNotification = false) => {
    if (!id || !hasChangesRef.current) return;

    setIsSaving(true);
    try {
      const currentTitle = titleRef.current;
      const currentContent = contentRef.current;
      
      // First, update the note
      const response = await updateNote(id, { title: currentTitle, content: currentContent });
      setLastSaved(new Date());
      hasChangesRef.current = false;
      
      // Then, update links if user is available
      if (user?.id) {
        try {
          await updateLinks(id, currentContent, user.id);
          // Refresh backlinks after updating links
          fetchBacklinks(id);
        } catch (linkError) {
          console.error("Error updating links:", linkError);
          // Don't fail the save if link update fails
        }
      }
      
      if (showNotification) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save every 5 seconds
  useEffect(() => {
    if (!id || isLoading) return;

    autoSaveIntervalRef.current = setInterval(() => {
      if (hasChangesRef.current) {
        saveNote(false);
      }
    }, 5000);

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [id, isLoading]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle;
    hasChangesRef.current = true;
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    contentRef.current = newContent;
    hasChangesRef.current = true;
  };

  const handleManualSave = async () => {
    if (!id) return;

    setIsSaving(true);
    try {
      // First, update the note
      const response = await updateNote(id, { title, content });
      setLastSaved(new Date());
      hasChangesRef.current = false;
      titleRef.current = title;
      contentRef.current = content;
      
      // Then, update links if user is available
      if (user?.id) {
        try {
          await updateLinks(id, content, user.id);
          // Refresh backlinks after updating links
          fetchBacklinks(id);
        } catch (linkError) {
          console.error("Error updating links:", linkError);
          // Don't fail the save if link update fails
        }
      }
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Render content with clickable links
  const renderContentWithLinks = (text) => {
    if (!text) return "";
    const regex = /(\[\[([^\]]+)\]\])/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: text.substring(lastIndex, match.index)
        });
      }
      
      // Add the link
      parts.push({
        type: "link",
        content: match[1], // Full [[...]]
        title: match[2]    // Just the title
      });
      
      lastIndex = regex.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex)
      });
    }
    
    return parts;
  };
  
  const handleLinkClick = async (linkTitle) => {
    // Find note by title
    try {
      if (!user?.id) return;
      
      const response = await getNotes(user.id);
      const notes = response.notes || [];
      const targetNote = notes.find(note => 
        note.title.toLowerCase() === linkTitle.toLowerCase()
      );
      
      if (targetNote) {
        navigate(`/notes/${targetNote._id}`);
      } else {
        // Note doesn't exist yet - it will be created when links are updated
        // For now, navigate to dashboard where user can see it in the sidebar
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error navigating to linked note:", error);
    }
  };
  
  const handleBacklinkClick = (backlinkNoteId) => {
    navigate(`/notes/${backlinkNoteId}`);
  };
  
  const detectedLinks = extractNoteLinks(content);

  const formatLastSaved = () => {
    if (!lastSaved) return "";
    const now = new Date();
    const diff = Math.floor((now - lastSaved) / 1000);
    
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return lastSaved.toLocaleString();
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="note-editor-page">
        <div className="note-editor-loading">Loading note...</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="note-editor-page">
        <div className="note-editor-error">Note not found</div>
      </div>
    );
  }

  return (
    <div className="note-editor-page">
      <div className="background-noise" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <div className="note-editor-container">
        <div className="note-editor-header">
          <button className="ghost-btn back-btn" onClick={handleBack}>
            ← Back to Dashboard
          </button>
          <div className="note-editor-actions">
            <div className="save-status">
              {isSaving ? (
                <span className="saving-indicator">Saving...</span>
              ) : lastSaved ? (
                <span className="last-saved">Last saved: {formatLastSaved()}</span>
              ) : null}
            </div>
            <button
              className="primary-btn save-btn"
              onClick={handleManualSave}
              disabled={isSaving || !hasChangesRef.current}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="note-editor-content">
          <input
            type="text"
            className="note-title-input"
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled Note"
          />
          
          {/* Link detection indicator */}
          {detectedLinks.length > 0 && (
            <div className="detected-links-indicator">
              <span className="link-icon">🔗</span>
              <span>{detectedLinks.length} link{detectedLinks.length !== 1 ? 's' : ''} detected</span>
            </div>
          )}
          
          <textarea
            className="note-content-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your note here... Use [[Note Title]] to create links."
          />
          
          {/* Content preview with clickable links */}
          {content && (
            <div className="note-content-preview">
              <div className="preview-label">Preview (links are clickable):</div>
              <div className="preview-content">
                {renderContentWithLinks(content).map((part, index) => {
                  if (part.type === "link") {
                    return (
                      <span
                        key={index}
                        className="note-link"
                        onClick={() => handleLinkClick(part.title)}
                        title={`Click to navigate to "${part.title}"`}
                      >
                        {part.content}
                      </span>
                    );
                  }
                  return <span key={index}>{part.content}</span>;
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Backlinks Section */}
        <div className="backlinks-section">
          <h3 className="backlinks-heading">Linked References</h3>
          {isLoadingBacklinks ? (
            <div className="backlinks-loading">Loading backlinks...</div>
          ) : backlinks.length === 0 ? (
            <div className="backlinks-empty">
              No backlinks yet — start linking notes using [[Note Name]]
            </div>
          ) : (
            <div className="backlinks-list">
              {backlinks.map((backlink) => (
                <div
                  key={backlink._id}
                  className="backlink-card"
                  onClick={() => handleBacklinkClick(backlink._id)}
                >
                  <div className="backlink-title">{backlink.title}</div>
                  <div className="backlink-snippet">
                    {backlink.content ? 
                      (backlink.content.length > 50 
                        ? backlink.content.substring(0, 50) + "..." 
                        : backlink.content)
                      : "No content"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <div className="toast-notification">
          Saved!
        </div>
      )}
    </div>
  );
}

