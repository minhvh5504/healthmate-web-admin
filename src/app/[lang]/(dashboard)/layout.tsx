import '@/app/globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layouts/dashboard-layout/sidebar';
import PageHeader from '@/components/layouts/dashboard-layout/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="antialiased">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-svh w-full flex-col bg-[#F1F5F9]">
          <PageHeader />
          <div className="w-full p-4">{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
}
