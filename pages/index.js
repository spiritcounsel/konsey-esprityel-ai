import { useRef, useState } from "react";
        ) : null}
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
    background: "#f5f7fb",
    padding: 24,
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "white",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    margin: 0,
    fontSize: 34,
    color: "#0f172a",
  },
  subtitle: {
    color: "#475569",
    marginTop: 8,
    lineHeight: 1.5,
  },
  button: {
    width: "100%",
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: "18px 20px",
    fontSize: 24,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 18,
  },
  status: {
    marginTop: 16,
    color: "#334155",
    textAlign: "center",
  },
  box: {
    marginTop: 18,
    background: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    color: "#0f172a",
  },
};
