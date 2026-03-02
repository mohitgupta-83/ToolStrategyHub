import "./admin.css";

export const metadata = {
    title: "Admin Dashboard | Builder Toolkit",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div id="admin-root">
            {children}
        </div>
    );
}
