import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { title: "Daily sparks", description: "Micro-prompts tuned to your interests keep curiosity alive." },
    { title: "Mood boards", description: "Drag visuals, palettes, and references into a living canvas." },
    { title: "Sync anywhere", description: "Your thoughts, sketches, and audio snippets travel with you." },
  ];

  return (
    <AuthLayout
      heading="Welcome back, creator"
      subheading="Pick up exactly where you left off. Ideas, reactions, and future plans are synced across every device."
      asideTitle="Re-enter flow mode"
      asideDescription="ThinkSpace adapts to your energy—whether you need calm note-taking or bold brainstorming."
      asideHighlights={highlights}
    >
      <form className="auth-form" onSubmit={onSubmit}>
        {error && <p className="form-error">{error}</p>}

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@studio.com" value={form.email} onChange={onChange} autoComplete="email" />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} autoComplete="current-password" />
        </div>

        <button disabled={loading} className="primary-btn" type="submit">
          {loading ? "Opening ThinkSpace..." : "Sign in"}
        </button>

        <p className="form-helper">
          New to ThinkSpace? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}


