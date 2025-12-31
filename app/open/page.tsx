"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OpenPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/letter?code=${encodeURIComponent(code)}`);
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h2>Masukkan Kode</h2>
      <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="contoh: RAHASIA123"
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: "10px 14px" }}>
          Buka
        </button>
      </form>
      <p style={{ opacity: 0.7, marginTop: 10 }}>
        (Kode ini bisa kamu bagikan ke orang yang kamu tuju.)
      </p>
    </main>
  );
}
