import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/register", form);
      alert(data.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    { title: "Idea snapshots", description: "Capture sparks with mood boards, audio notes, and timelines." },
    { title: "Flow states", description: "Guided prompts and focus rituals nudge you past creative blocks." },
    { title: "Team pulses", description: "Share thought clouds and gather async reactions in one tap." },
  ];

  return (
    <AuthLayout
      heading="Create your ThinkSpace"
      subheading="Sign up to organize every idea, inspiration, and breakthrough in one playful workspace."
      asideTitle="Ideas thrive inside ThinkSpace"
      asideDescription="A calm canvas for brainstorming, mood boarding, and mapping out fresh concepts."
      asideHighlights={highlights}
    >
      <form className="auth-form" onSubmit={onSubmit}>
        {error && <p className="form-error">{error}</p>}

        <div className="input-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" placeholder="Ava Solis" value={form.name} onChange={onChange} autoComplete="name" />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@studio.com" value={form.email} onChange={onChange} autoComplete="email" />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} autoComplete="new-password" />
        </div>

        <button disabled={loading} className="primary-btn" type="submit">
          {loading ? "Crafting your space..." : "Create account"}
        </button>

        <p className="form-helper">
          Already part of ThinkSpace? <Link to="/login">Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}


