"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        // Enforce top scroll on every route change instantly to prevent 
        // the Next.js App Router bug where bottom-clicked links retain scroll position.
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}
