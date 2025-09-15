export async function saveMetadata(trackId: string, chatId: string, metadata: any) {
  const res = await fetch("/api/saveMetadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackId, chatId, metadata }),
  });

  if (!res.ok) {
    throw new Error("Ошибка сохранения метаданных");
  }

  return res.json();
}
