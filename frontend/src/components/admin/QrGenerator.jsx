import QRCode from 'qrcode.react';


export default function QrGenerator({ url, size=180 }){
return <QRCode value={url} size={size} />;
}