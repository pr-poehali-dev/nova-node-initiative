import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VIDEOS_URL = "https://functions.poehali.dev/ebe3abe9-32b8-4ff7-b132-572f5760d937";

interface Video {
  id: number;
  title: string;
  description: string;
  youtube_id: string;
  sort_order: number;
}

export default function Videos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [active, setActive] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!token) { navigate("/auth"); return; }

    fetch(VIDEOS_URL, {
      headers: { "Authorization": token },
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { navigate("/auth"); return; }
        setVideos(data.videos);
        if (data.videos.length > 0) setActive(data.videos[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 uppercase tracking-widest text-sm">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-white text-sm uppercase tracking-widest">Глас Небесный</a>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400 text-sm">{userName}</span>
          <button onClick={logout} className="text-neutral-500 text-sm hover:text-white transition-colors uppercase tracking-wide">
            Выйти
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-neutral-800 overflow-y-auto hidden md:block">
          <p className="text-neutral-500 text-xs uppercase tracking-widest px-6 py-4">Видеоуроки</p>
          {videos.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className={`w-full text-left px-6 py-4 border-b border-neutral-800 transition-colors ${
                active?.id === v.id ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <p className="text-xs text-neutral-600 mb-1">Урок {i + 1}</p>
              <p className="text-sm leading-snug">{v.title}</p>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {active ? (
            <div className="max-w-3xl">
              <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">
                Урок {videos.findIndex(v => v.id === active.id) + 1} из {videos.length}
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">{active.title}</h1>

              <div className="aspect-video w-full mb-6 bg-neutral-900">
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtube_id}`}
                  title={active.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {active.description && (
                <p className="text-neutral-400 leading-relaxed">{active.description}</p>
              )}

              <div className="flex gap-4 mt-8 md:hidden">
                {videos.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActive(v)}
                    className={`text-xs px-3 py-2 border transition-colors ${
                      active?.id === v.id
                        ? "border-white text-white"
                        : "border-neutral-700 text-neutral-500 hover:border-neutral-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-neutral-500">Уроки не найдены</p>
          )}
        </main>
      </div>
    </div>
  );
}
