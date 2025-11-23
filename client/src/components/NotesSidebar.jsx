import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, createNote } from "../utils/noteAPI";

export default function NotesSidebar({ userId, activeNoteId, onNoteSelect }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const response = await getNotes(userId);
      setNotes(response.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userId]);

  const handleNewNote = async () => {
    if (!userId) return;

    try {
      const response = await createNote({
        title: "Untitled Note",
        content: "",
        userId
      });
      
      const newNote = response.note;
      setNotes([newNote, ...notes]);
      
      // Navigate to the new note
      navigate(`/notes/${newNote._id}`);
      if (onNoteSelect) {
        onNoteSelect(newNote._id);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
    if (onNoteSelect) {
      onNoteSelect(noteId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="notes-sidebar">
      <div className="notes-sidebar-header">
        <h3>Notes</h3>
        <button className="primary-btn new-note-btn" onClick={handleNewNote}>
          + New Note
        </button>
      </div>

      {isLoading ? (
        <div className="notes-loading">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="notes-empty">
          <p>No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`note-item ${activeNoteId === note._id ? "active" : ""}`}
              onClick={() => handleNoteClick(note._id)}
            >
              <div className="note-item-title">{note.title || "Untitled"}</div>
              <div className="note-item-meta">
                {formatDate(note.updatedAt || note.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

