export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{padding: '28px 0', margin: '0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,alignItems:'start'}}>
          <div style={{textAlign:'left'}}>
            <strong>RS Sragen</strong>
            <div style={{fontSize:13, marginTop:8}}>Jl. Contoh No.1, Sragen • (+62) 123-4567</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:13}}>Kontak</div>
            <div style={{fontSize:13, marginTop:8}}>Email: info@rssragen.id</div>
          </div>
        </div>
        <div style={{textAlign:'center', marginTop:18, fontSize:13}}>© {new Date().getFullYear()} RS Sragen</div>
      </div>
    </footer>
  )
}
