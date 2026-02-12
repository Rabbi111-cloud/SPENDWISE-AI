// app/layout.js
import "../app/globals.css";

export const metadata = {
  title: "SPENDWISE AI",
  description: "Smart personal finance manager with AI insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* CDN for jsPDF and html2canvas */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      </head>
      <body className="bg-[#0B0F19] text-white">
        {children}
      </body>
    </html>
  );
}
