"use client";

export default function Error({ error, reset }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
        color: "#1f2937",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#ef4444" }}>
        🐾 Oops! Có lỗi xảy ra
      </h1>
      <p style={{ marginTop: "1rem", color: "#6b7280" }}>
        {error?.message || "Đã có lỗi không xác định trong hệ thống"}
      </p>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "2rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
