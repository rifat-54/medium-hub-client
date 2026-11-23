import Navbar from "@/components/common/layout/navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
      {children}
    </>
  );
}