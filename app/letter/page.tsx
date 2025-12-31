"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";

export default function LetterPage() {
  const [opened, setOpened] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState<string>("");

  const message = useMemo(
    () => ({
      title: "Haiiiiii val,",
      body: [
        "Akuu cuman mau bilang terimakasih sudah menjadi bagian sekaligus hadiah terindah bagi ku di tahun ini. Terima kasih atas perhatian, kesabaran, effort, kasih sayang yang kamu berikan, dan masih banyak lagiii tapi sekali lagi aku mau bilang terimakasih itu semua sangat berarti bagi kuuu, aku juga mau minta maaf kalo dari awal kita kenal hingga sekarang aku ada salah atau bikin kamu ga nyaman. Untuk kedepannya harapan ku kita bisa terus bersama bahkan untuk tahun-tahun yang selanjutnya dan aku harap kita bisa saling belajar dan tumbuh bersama melalui rintangan-rintangan yang bakal kita hadapi kedepannya semoga kita bisa melewati semua ituu aminnnn",
        "aku beruntung bisa kenal kamuuuu",
        "",
        "loveee youuuu, sayanggg kuuuu ❤️❤️❤️❤️❤️",
        "",
        "— dari seseorang yang peduli",
      ].join("\n"),
    }),
    []
  );

  async function copyText(text: string) {
    try {
      setCopiedMsg("");

      // Modern Clipboard API (biasanya butuh HTTPS / localhost)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedMsg("Tersalin");
        setTimeout(() => setCopiedMsg(""), 1500);
        return;
      }

      // Fallback untuk HTTP / beberapa browser mobile
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();

      const ok = document.execCommand("copy");
      document.body.removeChild(ta);

      setCopiedMsg(ok ? "Tersalin ✅" : "Gagal menyalin ❌");
      setTimeout(() => setCopiedMsg(""), 1500);
    } catch {
      setCopiedMsg("Gagal menyalin ❌");
      setTimeout(() => setCopiedMsg(""), 1500);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "start center",
        padding: 24,
        paddingTop: 100,
        paddingBottom: 100,
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(255,120,170,.20), transparent 55%), radial-gradient(900px 500px at 90% 30%, rgba(120,190,255,.22), transparent 52%), #0b0f17",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center", width: "min(880px, 100%)" }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 18, opacity: 0.9 }}
        />

        <motion.div
          animate={{ scale: opened ? 0.92 : 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          style={{ display: "grid", placeItems: "center" }}
        >
          <Envelope opened={opened} onOpen={() => setOpened(true)} />
        </motion.div>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45 }}
              style={{
                margin: "34px auto 0",
                width: "min(720px, 100%)",
                borderRadius: 22,
                padding: 22,
                background: "rgba(255,255,255,.07)",
                border: "1px solid rgba(255,255,255,.16)",
                backdropFilter: "blur(10px)",
                textAlign: "left",
              }}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 }}
                style={{ margin: 0, fontSize: 28 }}
              >
                {message.title}
              </motion.h1>

              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14 }}
                style={{
                  marginTop: 14,
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  lineHeight: 1.75,
                  fontSize: 16,
                  opacity: 0.92,
                }}
              >
                {message.body}
              </motion.pre>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginTop: 16,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setOpened(false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,.18)",
                    background: "rgba(255,255,255,.06)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>

                <button
                  onClick={() => copyText(message.body)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,.18)",
                    background: "rgba(255,255,255,.06)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Salin isi surat
                </button>

                {copiedMsg && (
                  <span style={{ opacity: 0.85, fontSize: 14 }}>{copiedMsg}</span>
                )}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
