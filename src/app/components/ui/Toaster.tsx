import { Toaster } from "react-hot-toast";

export default function MyToaster() {
    return (

        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
            style: {
            background: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "12px 18px",
            fontSize: "15px",
            fontWeight: "500",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
            },
            success: {
            style: {
                background: "rgba(34, 197, 94, 0.15)", 
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#bbf7d0",
            },
            iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
            },
            },
            error: {
            style: {
                background: "rgba(239, 68, 68, 0.15)", 
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#fecaca",
            },
            iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
            },
            },
        }}
        />

    )
}