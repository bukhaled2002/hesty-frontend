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
      <main className="mt-[85px]">{children}</main>
      <Footer />
    </>
  );
}
