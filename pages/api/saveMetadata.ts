import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import * as NodeID3 from "node-id3";
import type { Tags } from "node-id3";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { trackId, chatId, metadata, coverBase64 } = req.body as {
      trackId: string;
      chatId: string;
      metadata: Tags;
      coverBase64?: string;
    };

    const tracksDir = path.join(process.cwd(), "tracks");
    const filePath = path.join(tracksDir, `${trackId}.mp3`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Файл не найден" });
    }

    // Если есть cover, конвертим base64 в Buffer
    if (coverBase64) {
      const buffer = Buffer.from(coverBase64, "base64");
      metadata.image = {
        mime: "image/jpeg",
        type: { id: 3, name: "front cover" },
        description: "Cover",
        imageBuffer: buffer,
      };
    }

    // Обновляем ID3
    NodeID3.update(metadata, filePath);

    // Отправка файла обратно в Telegram
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("caption", "🎵 Ваш обновленный трек");
    form.append("audio", fs.createReadStream(filePath), path.basename(filePath));

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendAudio`, form, {
      headers: form.getHeaders(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при сохранении метаданных" });
  }
}
