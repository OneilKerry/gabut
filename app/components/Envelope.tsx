"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Envelope({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  const shine = useMemo(
    () => ({
      initial: { opacity: 0.0, x: -40 },
      animate: { opacity: [0, 0.6, 0], x: 60 },
      transition: { duration: 1.6, repeat: Infinity, repeatDelay: 0.8 },
    }),
    []
  );

  return (
    <button
      onClick={onOpen}
      disabled={opened}
      aria-label="Buka amplop"
      style={{
        border: "none",
        background: "transparent",
        cursor: opened ? "default" : "pointer",
        padding: 0,
        outline: "none",
      }}
    >
      <div
        style={{
          width: 320,
          height: 220,
          position: "relative",
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 22px 28px rgba(0,0,0,.22))",
        }}
      >
        {/* Body amplop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: "rgba(255,255,255,.10)",
            border: "1px solid rgba(255,255,255,.22)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          <motion.div
            {...shine}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 90,
              transform: "skewX(-18deg)",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)",
            }}
          />
        </div>

        {/* Kertas surat (muncul dari dalam) */}
        <motion.div
          initial={false}
          animate={{
            y: opened ? -86 : 22,
            opacity: opened ? 1 : 0.0,
            scale: opened ? 1 : 0.98,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          style={{
            position: "absolute",
            left: 26,
            right: 26,
            top: 16,
            height: 190,
            borderRadius: 16,
            background: "rgba(255,255,255,.92)",
            boxShadow: "0 14px 24px rgba(0,0,0,.18)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16, color: "#111" }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Suratmu</div>
            <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.6 }}>
              “Sedikit demi sedikit, kebahagiaan itu datang…”
            </div>
          </div>
        </motion.div>

        {/* Flap (penutup amplop) */}
        <motion.div
          initial={false}
          animate={{
            rotateX: opened ? 180 : 0,
            y: opened ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 120,
            transformOrigin: "top center",
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            background:
              "linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.08))",
            border: "1px solid rgba(255,255,255,.22)",
            borderBottom: "none",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Segel */}
        <motion.div
  initial={false}
  animate={{
    scale: opened ? 0 : 1,
    opacity: opened ? 0 : 1,
  }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  style={{
    position: "absolute",
    left: "50%",
    top: "50%",               // ✅ pusat vertikal
    transform: "translate(-50%, -100%)", // ✅ koreksi ukuran segel
    width: 54,
    height: 54,
    borderRadius: 999,
    background: "rgba(255,120,170,.95)",
    boxShadow: "0 12px 18px rgba(0,0,0,.20)",
    display: "grid",
    placeItems: "center",
    color: "white",
    fontWeight: 900,
    border: "2px solid rgba(255,255,255,.25)",
    zIndex: 3,
    pointerEvents: "none",
    fontSize: 20,
  }}
>
  ♥
</motion.div>


        {/* Lipatan bawah (segitiga) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 130,
            borderBottomLeftRadius: 22,
            borderBottomRightRadius: 22,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.22)",
            clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
          }}
        />
      </div>

      <div style={{ marginTop: 16, textAlign: "center", opacity: 0.8 }}>
        {opened ? "✨" : "Klik amplop untuk membuka"}
      </div>
    </button>
  );
}
