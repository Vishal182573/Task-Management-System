import { MainHeader } from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>;
    </>
  );
}
