"use client";

export default function DownloadReport() {
  // Download PDF entirely in the browser
  const handleDownload = async () => {
    // Make sure the dashboard content is wrapped in this ID
    const input = document.getElementById("report-section");
    if (!input) return;

    // Wait a tiny bit for charts to render
    await new Promise((res) => setTimeout(res, 200));

    // Use html2canvas from CDN
    const canvas = await window.html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    // Use jsPDF from CDN
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("spendwise-report.pdf");
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-emerald-400 text-black rounded-lg font-semibold hover:scale-105 transition"
      >
        Download PDF Report
      </button>
    </div>
  );
}
