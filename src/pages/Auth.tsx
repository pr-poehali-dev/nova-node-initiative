import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_URL = "https://functions.poehali.dev/576aa05d-c577-48cf-ba78-45e084d75230";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const body: Record<string, string> = { action: mode, email, password };
    if (mode === "register") body.name = name;

    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Ошибка");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.name);
    navigate("/videos");
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-neutral-400 text-sm uppercase tracking-widest mb-3">Глас Небесный</p>
          <h1 className="text-white text-3xl font-bold">
            {mode === "login" ? "Войти в кабинет" : "Создать аккаунт"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <div>
              <label className="text-neutral-400 text-xs uppercase tracking-wide block mb-2">Имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
          )}
          <div>
            <label className="text-neutral-400 text-xs uppercase tracking-wide block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-neutral-400 text-xs uppercase tracking-wide block mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-neutral-900 py-3 uppercase text-sm tracking-wide font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-sm mt-6">
          {mode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="text-white underline hover:no-underline"
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>

        <p className="text-center mt-6">
          <a href="/" className="text-neutral-600 text-sm hover:text-neutral-400 transition-colors">
            ← На главную
          </a>
        </p>
      </div>
    </div>
  );
}
