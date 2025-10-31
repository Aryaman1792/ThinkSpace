import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} className="w-full border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full border p-2 rounded" />
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded disabled:opacity-60">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm">
          Already have an account? <a href="/login" className="text-blue-600">Log in</a>
        </p>
      </form>
    </div>
  );
}


