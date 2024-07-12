import Breadcrumb from "@/components/admin/Navbar/Breadcrumb";
import NavToogle from "@/components/admin/Navbar/NavToogle";
import TopNav from "@/components/admin/Navbar/TopNav";
import Indicator from "@/components/indicator/Indicator";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkLoading, UserButton } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
  <>
    <TooltipProvider>
      <div className=" relative flex min-h-screen w-full max-w-[1920px] left-1/2 -translate-x-1/2 flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* Top Nav */}
          <div className="w-7 h-7 flex justify-center items-center">
            <ClerkLoading>
              <Skeleton className="w-7 h-7 rounded-full"/>
            </ClerkLoading>
            <UserButton/>
          </div>
          <TopNav/>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* Bottom Nav */}
        </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <NavToogle/>
            <Breadcrumb/>
            {/* Div for search bar */}
            <div className="sm:hidden flex justify-center items-center ml-auto">
              <ClerkLoading>
                <Skeleton className="w-7 h-7 rounded-full"/>
              </ClerkLoading>
              <UserButton />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
    <Indicator/>
  </>
  );
}
