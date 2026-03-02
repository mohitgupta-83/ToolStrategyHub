"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                backgroundColor: "var(--bg-tertiary)",
                zIndex: 50,
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "var(--accent-primary)",
                    boxShadow: "0 0 10px var(--accent-primary)",
                    transition: "width 0.1s ease",
                }}
            />
        </div>
    );
}
