"use client";
import { Toaster } from "react-hot-toast";

export default function MyToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: "0px",
          width: "420px",
          padding: "10px 20px",
          fontSize: "15px",
          fontWeight: "500",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          border: "1px solid #ddd",
          display: "inline-flex", 
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "4px", 
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          background: "#fff",
        },
        success: {
          style: {
            background: "#e8f5e9",
            color: "#256029",
            display: "inline-flex", 
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "4px",
            textAlign: "left",
            fontFamily: "var(--font-sans)",
            fontWeight: "bold"
          },
          iconTheme: {
            primary: "#2e7d32",
            secondary: "#e8f5e9",
          },
        },
        error: {
          style: {
            background: "#ffebee",
            color: "#b71c1c",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "4px",
            textAlign: "left",
            fontFamily: "var(--font-sans)",
            fontWeight: "bold"
          },
        },
      }}
    />
  );
}
