import NavigationMenu from "@/components/admin/navigation-menu";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex overflow-hidden h-screen bg-[#F5F6FA]">
      {/* side bar */}
      <div className="hidden lg:block basis-[312px] px-9 bg-[#FFF] border-e border-black/20 overflow-auto">
        <NavigationMenu />
      </div>
      <main className="basis-full w-full py-4 lg:py-5 px-[24px] overflow-auto h-full">
        {children}
      </main>
    </div>
  );
}

export default Layout;
