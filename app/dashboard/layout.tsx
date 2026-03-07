
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";


export default function DashboardLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
