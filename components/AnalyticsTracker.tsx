"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackView } from "@/lib/tracker";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            trackView(pathname);
        }
    }, [pathname]);

    return null;
}
