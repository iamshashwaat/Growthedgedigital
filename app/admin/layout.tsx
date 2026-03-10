"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Skip auth check for the login page itself
        if (pathname === "/admin/login") {
            setLoading(false);
            return;
        }

        const checkAuth = () => {
            const cookies = document.cookie.split(";");
            const isAuth = cookies.some((c) => c.trim().startsWith("admin_auth=true"));

            if (!isAuth) {
                router.push("/admin/login");
            } else {
                setAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#F5A623] border-t-transparent rounded-full" />
            </div>
        );
    }

    // If not on login page and not authenticated, show nothing while redirecting
    if (pathname !== "/admin/login" && !authenticated) {
        return null;
    }

    return <>{children}</>;
}
