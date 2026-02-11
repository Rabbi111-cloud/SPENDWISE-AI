import "./globals.css";

export const metadata = {
  title: "SPENDWISE AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F19] text-white">
        {children}
      </body>
    </html>
  );
}
