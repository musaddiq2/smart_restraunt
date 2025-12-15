import QRCode from "qrcode";

/**
 * Generate a QR data URL for given payload (string).
 * returns Promise<string> (data:image/png;base64,...)
 */
export const generateQRCodeDataUrl = async (payload) => {
  // options: increase error correction or scale as needed
  const opts = { errorCorrectionLevel: "H", type: "image/png", margin: 1 };
  const dataUrl = await QRCode.toDataURL(String(payload), opts);
  return dataUrl;
};
