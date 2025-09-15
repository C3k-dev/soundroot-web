"use client";

import { useState } from "react";
import { saveMetadata } from "@/lib/api";

interface Props {
  trackId: string;
  chatId: string;
}

export default function MetadataForm({ trackId, chatId }: Props) {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    genre: "",
    coverUrl: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await saveMetadata(trackId, chatId, form);

    setLoading(false);
    alert("✅ Метаданные сохранены и отправлены в Telegram!");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <input
        type="text"
        placeholder="Название"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Артист"
        value={form.artist}
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
      />
      <input
        type="text"
        placeholder="Альбом"
        value={form.album}
        onChange={(e) => setForm({ ...form, album: e.target.value })}
      />
      <input
        type="text"
        placeholder="Год"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <input
        type="text"
        placeholder="Жанр"
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL обложки"
        value={form.coverUrl}
        onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Сохраняем..." : "💾 Сохранить"}
      </button>
    </form>
  );
}
