"use client";

import { useSearchParams } from "next/navigation";
import MetadataForm from "@/components/MetadataForm";

export default function EditPage() {
  const params = useSearchParams();

  if (!params) {
    return <p>❌ Ошибка: отсутствуют параметры URL</p>;
  }

  const trackId = params.get("track_id");
  const chatId = params.get("chat_id");

  if (!trackId || !chatId) {
    return <p>❌ Ошибка: track_id или chat_id не переданы</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Редактирование трека</h1>
      <MetadataForm trackId={trackId} chatId={chatId} />
    </main>
  );
}
