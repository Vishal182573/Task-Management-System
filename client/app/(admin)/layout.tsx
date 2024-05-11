import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { UserContext } from '@/global/userContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
}
