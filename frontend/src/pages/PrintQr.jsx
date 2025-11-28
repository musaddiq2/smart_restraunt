export default function PrintQr({ location }){
const params = new URLSearchParams(location.search);
const qr = params.get('qr');
return (
<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
<div>
<img src={qr} alt="qr" style={{width:300}} />
<div style={{textAlign:'center'}}>Scan to open menu</div>
</div>
</div>
)
}