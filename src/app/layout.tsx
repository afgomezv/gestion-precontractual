import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Container from "../components/ui/Container";
import Sidebar from "../components/ui/Sidebar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Distrito INDER",
  description:
    "Distrito INDER – Instituto de Deportes y Recreación de Medellín",
  keywords: "Inder, Deportes, Recreación, Medellín",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="ligth">
      <body>
        <Providers>
          <Sidebar />
          <Container>
            {children}
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
