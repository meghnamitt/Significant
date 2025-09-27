import React from "react";

const Template = ({ 
  title = "Default Title", 
  children, 
  onAction, 
  actionLabel = "Click Me" 
}) => {
  return (
    <div className="template-card" style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <div style={styles.content}>{children}</div>
      {onAction && (
        <button onClick={onAction} style={styles.button}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// simple inline styles (you could move this to App.css if you want)
const styles = {
  card: {
    maxWidth: "400px",
    margin: "1rem auto",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  content: {
    marginBottom: "1rem",
    color: "#444",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    background: "#646cff",
    color: "white",
    cursor: "pointer",
  },
};

export default Template;
