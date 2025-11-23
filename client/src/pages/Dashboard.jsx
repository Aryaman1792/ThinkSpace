import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotesSidebar from "../components/NotesSidebar.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const creatorName = user?.name ? `${user.name.split(" ")[0]}` : "Creator";

  const [reflectionText, setReflectionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [reflections, setReflections] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000" });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const reflectionDate = new Date(timestamp);
    const diffTime = now - reflectionDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return reflectionDate.toLocaleDateString();
    }
  };

  const fetchReflections = async () => {
    if (!user?.id) return;
    
    try {
      const response = await api.get(`/api/reflection/${user.id}`);
      setReflections(response.data.reflections || []);
    } catch (error) {
      console.error("Error fetching reflections:", error);
    }
  };

  useEffect(() => {
    fetchReflections();
  }, []);

  const handleSaveReflection = async () => {
    if (!reflectionText.trim()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      await api.post("/api/reflection", {
        userId: user?.id,
        text: reflectionText
      });

      setSuccessMessage("Reflection saved!");
      setReflectionText("");
      // Refresh the reflections list
      await fetchReflections();
    } catch (error) {
      console.error("Error saving reflection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sparkIdeas = ["Shadow Garden installation", "City hum soundscape", "Analog glitch poster pack"];

  const rituals = [
    { title: "Morning brain-dump", detail: "12 fresh fragments" },
    { title: "Palette curator", detail: "6 colors shortlisted" },
    { title: "Collaboration thread", detail: "3 replies waiting" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-page">
      <div className="background-noise" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="dash-header">
        <div>
          <p className="dash-pill">ThinkSpace Dashboard</p>
          <h1>Welcome back, {creatorName}</h1>
          <p>Today feels like a good day to capture bold thoughts and tiny sparks alike.</p>
        </div>
        <div className="dash-actions">
          <button className="ghost-btn" type="button" onClick={handleLogout}>
            Log out
          </button>
          <button className="primary-btn" type="button">
            New idea
          </button>
        </div>
      </header>

      <main className="dashboard-main-layout">
        <div className="dashboard-left">
          <NotesSidebar 
            userId={user?.id} 
            activeNoteId={activeNoteId}
            onNoteSelect={setActiveNoteId}
          />
        </div>

        <div className="dashboard-right">
          <div className="dashboard-grid">
            <section className="dash-card hero">
              <div>
                <h2>Current flow</h2>
                <p>Your thoughts are syncing in real time across every surface.</p>
                <div className="hero-stats">
                  <div>
                    <span>07</span>
                    <p>concepts brewing</p>
                  </div>
                  <div>
                    <span>3m</span>
                    <p>avg. focus bursts</p>
                  </div>
                  <div>
                    <span>14</span>
                    <p>feedback loops</p>
                  </div>
                </div>
              </div>
              <div className="orbital">
                <span />
                <span />
                <span />
              </div>
            </section>

            <section className="dash-card stack">
              <h3>Idea sparks</h3>
              <ul>
                {sparkIdeas.map((idea) => (
                  <li key={idea}>
                    <p>{idea}</p>
                    <button className="ghost-btn" type="button">
                      Expand
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="dash-card stack">
              <h3>Today&apos;s rituals</h3>
              <ul>
                {rituals.map((ritual) => (
                  <li key={ritual.title}>
                    <div>
                      <p>{ritual.title}</p>
                      <span>{ritual.detail}</span>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span />
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section className="dash-card journal">
              <h3>Mini journal</h3>
              <p>Drop a sentence or two about what you want to explore next.</p>
              <textarea 
                placeholder="Today I want to explore..." 
                rows={4}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
              />
              {successMessage && (
                <p style={{ color: "green", marginTop: "10px", marginBottom: "10px" }}>
                  {successMessage}
                </p>
              )}
              <button 
                className="secondary-btn" 
                type="button"
                onClick={handleSaveReflection}
                disabled={isLoading || !reflectionText.trim()}
              >
                {isLoading ? "Saving..." : "Save reflection"}
              </button>
              
              {reflections.length > 0 && (
                <div className="reflections-list">
                  <h4>Previous reflections</h4>
                  <div className="reflections-container">
                    {reflections.map((reflection) => (
                      <div key={reflection._id} className="reflection-card">
                        <div className="reflection-timestamp">
                          {formatTimestamp(reflection.timestamp)}
                        </div>
                        <div className="reflection-text">
                          {reflection.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}


