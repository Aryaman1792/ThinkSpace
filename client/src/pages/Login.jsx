import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full border p-2 rounded" />
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded disabled:opacity-60">
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="text-sm">
          New here? <a href="/register" className="text-blue-600">Create an account</a>
        </p>
      </form>
    </div>
  );
}


