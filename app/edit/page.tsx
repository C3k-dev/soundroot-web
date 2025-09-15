"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MetadataForm from "@/components/MetadataForm";

export const dynamic = "force-dynamic";

export default function EditPage() {
  const params = useSearchParams(); // может быть null
  const [trackId, setTrackId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    if (!params) return; // если ещё нет params, ничего не делаем
    setTrackId(params.get("track_id"));
    setChatId(params.get("chat_id"));
  }, [params]);

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
