import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>Hai kira" ini apa yaa?</h1>
        <p style={{ opacity: 0.8, marginBottom: 20 }}>
          Penasaran???
        </p>
        <Link
          href="/letter"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,.18)",
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          Klik ini
        </Link>
      </div>
    </main>
  );
}
