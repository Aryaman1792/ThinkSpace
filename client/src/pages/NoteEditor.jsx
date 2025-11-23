import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../utils/noteAPI";

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
  const autoSaveIntervalRef = useRef(null);
  const hasChangesRef = useRef(false);
  const titleRef = useRef("");
  const contentRef = useRef("");

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
      } catch (error) {
        console.error("Error fetching note:", error);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const saveNote = async (showNotification = false) => {
    if (!id || !hasChangesRef.current) return;

    setIsSaving(true);
    try {
      const currentTitle = titleRef.current;
      const currentContent = contentRef.current;
      const response = await updateNote(id, { title: currentTitle, content: currentContent });
      setLastSaved(new Date());
      hasChangesRef.current = false;
      
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
      const response = await updateNote(id, { title, content });
      setLastSaved(new Date());
      hasChangesRef.current = false;
      titleRef.current = title;
      contentRef.current = content;
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
          <textarea
            className="note-content-textarea"
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your note here..."
          />
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

