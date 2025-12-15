import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { ArrowLeft, Download } from "lucide-react";

export default function TableQR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.tables);

  // Find the table by ID
  const table = list.find((t) => t._id === id);

  // 🚀 Generate QR that contains menu info (NOT URL)
  const generateQRValue = () => {
    if (!table) return "";

    const menuItems = table.menuItems || [];

    return `
Restaurant: ${table.restaurantName}
Table: ${table.tableNumber}

Menu:
${menuItems.map((i) => `${i.name} - ₹${i.price}`).join("\n")}
    `.trim();
  };

  const qrValue = generateQRValue();

  // 🚀 Download QR as PNG
  const downloadQRCode = () => {
    const svg = document.getElementById("qr-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = png;
      link.download = `table-${table.tableNumber}-menu-qr.png`;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  // If table not found
  if (!table)
    return (
      <div className="p-6">
        <p className="text-center">Table not loaded. Go back to list.</p>
        <div className="text-center mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h2 className="text-xl font-semibold mb-2">
        Table {table.tableNumber} — QR
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        This QR contains menu details directly (offline readable).
      </p>

      <div className="flex flex-col items-center gap-4">
        {/* Vector QR for best quality */}
        <div id="qr-svg">
          <QRCode value={qrValue} size={220} />
        </div>

        <button
          onClick={downloadQRCode}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
        >
          <Download size={16} /> Download QR
        </button>
      </div>
    </div>
  );
}
