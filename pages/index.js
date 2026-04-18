import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "hello" }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Konsey Espirityèl AI</h1>
        <p style={styles.subtitle}>
          Yon espas prive pou jwenn konsèy, lapriyè, ak ankourajman.
        </p>

        <button style={styles.button} onClick={sendMessage}>
          Pale avè m
        </button>

        <div style={styles.responseBox}>
          {response || "Repons ou ap parèt isit la..."}
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f7fb",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "560px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "36px 28px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    fontSize: "42px",
    marginBottom: "10px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "18px",
    color: "#475569",
    marginBottom: "28px",
    lineHeight: "1.5",
  },
  button: {
    background: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    padding: "16px 28px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "24px",
  },
  responseBox: {
    minHeight: "70px",
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "18px",
    color: "#0f172a",
    fontSize: "18px",
  },
};
