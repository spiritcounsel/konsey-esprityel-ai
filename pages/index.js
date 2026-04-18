import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConsultation = async () => {
    if (!userInput) return;
    setIsLoading(true);
    
    // Logic for your API call goes here
    setTimeout(() => {
      setResponse("Chèche lapè nan silans la, epi wa jwenn repons w ap chèche a.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>KONSEY ESPIRITYÈL</h1>
        
        <p style={styles.subtitle}>
          Yon eksperyans prive, yon gid sajès nan pla men w.
        </p>

        <div style={styles.inputContainer}>
          <textarea
            style={styles.textArea}
            placeholder="Ki sa ki nan lespri w jodi a..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        <button 
          style={{
            ...styles.button,
            letterSpacing: "2px",
            opacity: isLoading || !userInput ? 0.6 : 1
          }} 
          onClick={handleConsultation}
          disabled={isLoading || !userInput}
        >
          {isLoading ? "AP CHÈCHE..." : "PALE AVÈ M"}
        </button>

        {response && (
          <div style={styles.responseBox}>
            <p style={styles.responseText}>{response}</p>
          </div>
        )}

        <footer style={styles.footer}>
          Lafwa • Lapè • Sajès
        </footer>
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
    background: "linear-gradient(180deg, #fdfdfd 0%, #f4f7f9 100%)",
    padding: "20px",
    fontFamily: "'Times New Roman', serif", // Or a premium Google Font like 'Playfair Display'
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    letterSpacing: "4px",
    color: "#1a1a1a",
    fontWeight: "300",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "15px",
    color: "#888",
    fontStyle: "italic",
    marginBottom: "40px",
    fontWeight: "300",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  textArea: {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    fontSize: "16px",
    fontFamily: "serif",
    resize: "none",
    outline: "none",
    textAlign: "center",
    color: "#333",
    transition: "border-color 0.4s ease",
  },
  button: {
    background: "#1a1a1a", // Deep black/slate for luxury feel
    color: "white",
    border: "none",
    borderRadius: "2px", // Sharp edges often feel more "premium" than rounded ones
    padding: "16px 40px",
    fontSize: "12px",
    fontWeight: "400",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease",
  },
  responseBox: {
    marginTop: "40px",
    padding: "20px",
    borderTop: "1px solid #eee",
    animation: "fadeIn 1s ease-in",
  },
  responseText: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#444",
    fontStyle: "italic",
  },
  footer: {
    marginTop: "60px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#b89b2e",
    textTransform: "uppercase",
  },
};
