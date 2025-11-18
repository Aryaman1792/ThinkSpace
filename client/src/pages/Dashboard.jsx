export default function Dashboard() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const creatorName = user?.name ? `${user.name.split(" ")[0]}` : "Creator";

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

      <main className="dashboard-grid">
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
          <textarea placeholder="Today I want to explore..." rows={4} />
          <button className="secondary-btn" type="button">
            Save reflection
          </button>
        </section>
      </main>
    </div>
  );
}


