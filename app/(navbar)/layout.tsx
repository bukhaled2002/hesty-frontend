import Footer from "@/components/footer";
import Header from "@/components/header/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="md:mt-[85px] sm:mt-[73px] mt-[54px]">{children}</main>
      <Footer />
    </>
  );
}
