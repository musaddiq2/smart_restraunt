import { QrCode } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode";






export default function QRPreview({ selectedTable }) {
  const qrRef = useRef();
  const canvasRef = useRef();
  const [theme, setTheme] = useState("default"); // 'default', 'rounded', 'dots', 'gradient'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [selectedTable]);

  useEffect(() => {
    if (!selectedTable) return;
    drawQRCode();
  }, [selectedTable, theme]);

  const downloadQR = async () => {
    const canvas = await html2canvas(qrRef.current, { scale: 3 });
    const link = document.createElement("a");
    link.download = `${selectedTable?.tableId || "table"}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printQR = async () => {
    const canvas = await html2canvas(qrRef.current, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save(`${selectedTable?.tableId || "table"}-qr.pdf`);
  };

  const drawQRCode = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const qrData = await QRCode.create(selectedTable.menuURL, { errorCorrectionLevel: "H" });

    const moduleCount = qrData.modules.size;
    const size = canvas.width / moduleCount;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        if (qrData.modules.get(r, c)) {
          let x = c * size;
          let y = r * size;

          if (theme === "dots") {
            ctx.fillStyle = "#e11d48"; // rose color
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 2, size / 2.5, 0, 2 * Math.PI);
            ctx.fill();
          } else if (theme === "gradient") {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "#f43f5e");
            gradient.addColorStop(1, "#ec4899");
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, size, size);
          } else if (theme === "rounded") {
            ctx.fillStyle = "#e11d48";
            const radius = size * 0.3;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + size - radius, y);
            ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
            ctx.lineTo(x + size, y + size - radius);
            ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
            ctx.lineTo(x + radius, y + size);
            ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.fill();
          } else {
            ctx.fillStyle = "#e11d48";
            ctx.fillRect(x, y, size, size);
          }
        }
      }
    }
  };

  return (
    <div
      ref={qrRef}
      className={`
        w-full md:w-96 h-fit p-6 bg-white rounded-2xl shadow-2xl border border-rose-200 flex flex-col items-center text-center
        ${mounted ? "animate-fadeInBounce" : "opacity-0"}
      `}
    >
      {selectedTable ? (
        <>
          {/* Title */}
          <div className="flex items-center gap-2 mb-3">
            <QrCode size={22} className="text-rose-500" />
            <h2 className="text-xl font-bold text-gray-700">
              Table {selectedTable.tableNumber}
            </h2>
          </div>

          {/* QR Canvas */}
          <canvas ref={canvasRef} width={220} height={220} />

          {/* Description */}
          <p className="text-gray-500 text-sm mt-4">Scan to open live menu</p>
          <p className="text-xs text-gray-500 mt-2 break-all">{selectedTable.menuURL}</p>

          {/* Theme selector */}
          <div className="flex gap-2 mt-4">
            {["default", "dots", "rounded", "gradient"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded-lg border ${
                  theme === t ? "bg-rose-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={downloadQR}
              className="bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-600 transition"
            >
              Download PNG
            </button>
            <button
              onClick={printQR}
              className="bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-600 transition"
            >
              Print PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Select a table to preview QR</p>
      )}
    </div>
  );
}

