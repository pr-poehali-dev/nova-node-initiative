CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO videos (title, description, youtube_id, sort_order) VALUES
  ('Введение в церковное пение', 'Основы и история православного песнопения', 'dQw4w9WgXcQ', 1),
  ('Постановка голоса', 'Дыхание, резонаторы и правильная артикуляция', 'dQw4w9WgXcQ', 2),
  ('Знаменный распев', 'Древнерусская система нотации и основные гласы', 'dQw4w9WgXcQ', 3),
  ('Осмогласие', 'Система восьми церковных гласов', 'dQw4w9WgXcQ', 4);
