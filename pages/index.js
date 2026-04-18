import { useState, useEffect } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard Shortcut: Cmd/Ctrl + Enter to send
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        handleConsultation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput]);

  const handleConsultation = async () => {
    if (!userInput || isLoading) return;
    setIsLoading(true);
    
    // Simulating the spiritual AI logic
    setTimeout(() => {
      setResponse(
        "Nan mitan boulvès, gen yon kote andedan ou kote Bondye toujou mete lapè. Rete trankil, respire, epi kite limyè a gide kè ou. ✨"
      );
      setIsLoading(false);
    }, 2200);
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@300;400;600&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          background: #faf9f6;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* The 100/10 Premium Button Animation */
        .premium-button {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .premium-button:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 15px 30px rgba(107, 95, 167, 0.3) !important;
          filter: brightness(1.1);
        }
        .premium-button:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }

        /* Subtle Pattern for Haitian Identity */
        .haitian-pattern {
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233f385e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Decorative Elements */}
      <div className="haitian-pattern" style={styles.patternOverlay} />
      <div style={styles.auraTopLeft} />
      <div style={styles.auraBottomRight} />
      <div style={styles.auraCenter} />

      <main style={styles.content}>
        <header style={styles.header}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            SANKTYÈ ESPIRITYÈL • POU AYITI
          </div>

          <h1 style={styles.title}>
            KONSEY <span style={styles.titleAccent}>ESPIRITYÈL</span>
          </h1>

          <p style={styles.subtitle}>
            Yon espas prive kote entèlijans rankontre lafwa. 
            Resevwa pawòl ki pote kalm ak direksyon nan moman difisil yo.
          </p>
        </header>

        <div style={styles.card}>
          <div style={styles.inputHeader}>
            <span style={styles.label}>Kisa k ap pase nan lespri w?</span>
            <span style={styles.shortcutHint}>Press ⌘ + Enter</span>
          </div>

          <textarea
            style={styles.textArea}
            placeholder="Mwen la pou m koute w..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <button
            className="premium-button"
            style={{
              ...styles.button,
              opacity: isLoading || !userInput ? 0.6 : 1,
              cursor: isLoading || !userInput ? "not-allowed" : "pointer",
            }}
            onClick={handleConsultation}
            disabled={isLoading || !userInput}
          >
            {isLoading ? "MAP KOUTE..." : "CHÈCHE LAPÈ"}
          </button>

          <div style={styles.responseArea}>
            {response ? (
              <div style={styles.responseBox}>
                <div style={styles.responseLabel}>
                  <span style={styles.sparkle}>✦</span> REPONS POU OU
                </div>
                <p style={styles.responseText}>{response}</p>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <p>Repons ou ap parèt isit la avèk dousè ak sajès.</p>
              </div>
            )}
          </div>
        </div>

        <footer style={styles.footer}>
          <div style={styles.footerLine} />
          <p style={styles.footerText}>LAFWA • LAPÈ • SAJÈS</p>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  patternOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  auraTopLeft: {
    position: "absolute",
    top: "-5%",
    left: "-5%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(138,127,207,0.15) 0%, transparent 70%)",
    filter: "blur(40px)",
    zIndex: 1,
  },
  auraBottomRight: {
    position: "absolute",
    bottom: "-5%",
    right: "-5%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(198,168,94,0.12) 0%, transparent 70%)",
    filter: "blur(40px)",
    zIndex: 1,
  },
  auraCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "800px",
    height: "600px",
    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "720px",
    animation: "fadeInScale 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "100px",
    background: "white",
    border: "1px solid rgba(198,168,94,0.3)",
    color: "#8b6f2d",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "2px",
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    background: "#c6a85e",
    borderRadius: "50%",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(48px, 8vw, 84px)",
    color: "#2D264B",
    margin: "0 0 20px 0",
    fontWeight: "700",
    lineHeight: 0.95,
    letterSpacing: "-2px",
  },
  titleAccent: {
    color: "#7c70b8",
    fontStyle: "italic",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: "19px",
    color: "#666277",
    lineHeight: 1.6,
    marginBottom: "48px",
    fontWeight: "300",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    padding: "32px",
    border: "1px solid rgba(133,120,195,0.15)",
    boxShadow: "0 30px 60px rgba(61,49,103,0.1)",
  },
  inputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#564f73",
  },
  shortcutHint: {
    fontSize: "11px",
    color: "#aaa",
    fontWeight: "400",
  },
  textArea: {
    width: "100%",
    minHeight: "160px",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid #e6e0f4",
    background: "white",
    fontSize: "18px",
    fontFamily: "inherit",
    outline: "none",
    resize: "none",
    color: "#353246",
    transition: "border-color 0.3s ease",
    marginBottom: "24px",
  },
  button: {
    width: "100%",
    padding: "18px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg, #8a7fcf 0%, #6b5fa7 100%)",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "2px",
    boxShadow: "0 10px 25px rgba(107, 95, 167, 0.2)",
  },
  responseArea: {
    marginTop: "24px",
  },
  responseBox: {
    background: "linear-gradient(to bottom, #fdfdff, #f7f3ff)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid #eee9f8",
    borderLeft: "5px solid #c6a85e",
    animation: "fadeInScale 0.6s ease-out",
  },
  responseLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#c6a85e",
    letterSpacing: "1.5px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  responseText: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#3f385e",
    margin: 0,
  },
  emptyState: {
    padding: "20px",
    textAlign: "center",
    color: "#b0aac2",
    fontSize: "15px",
    fontStyle: "italic",
    border: "1px dashed #dcd6f0",
    borderRadius: "18px",
  },
  footer: {
    marginTop: "50px",
    textAlign: "center",
  },
  footerLine: {
    width: "40px",
    height: "2px",
    background: "#c6a85e",
    margin: "0 auto 16px auto",
    opacity: 0.4,
  },
  footerText: {
    fontSize: "12px",
    letterSpacing: "5px",
    color: "#9b9169",
    fontWeight: "600",
  }
};
