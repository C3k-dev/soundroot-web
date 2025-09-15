// components/MetadataForm.tsx
"use client";

import { useState } from "react";
import { fetchAPI, ApiResponse, ApiRequestData } from "@/lib/api";

interface MetadataFormProps {
  trackId: string;
  chatId: string;
}

export default function MetadataForm({ trackId, chatId }: MetadataFormProps) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Конвертируем файл в Base64
    let coverBase64: string | undefined;
    if (coverFile) {
      coverBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(coverFile);
      });
      // Убираем префикс data:image/jpeg;base64,
      coverBase64 = coverBase64.split(",")[1];
    }

    const data: ApiRequestData = {
      trackId,
      chatId,
      metadata: {
        title,
        artist,
      },
      coverBase64,
    };

    const res: ApiResponse = await fetchAPI("saveMetadata", data);

    if (res.success) {
      setMessage("✅ Метаданные успешно сохранены!");
    } else {
      setMessage(`❌ Ошибка: ${res.error}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="text"
        placeholder="Название трека"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Исполнитель"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverFile(e.target.files ? e.target.files[0] : null)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Сохраняем..." : "Сохранить"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
