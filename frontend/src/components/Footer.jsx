export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "28px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <strong>RSU PKU Muhammadiyah Sragen</strong>
            <div style={{ fontSize: "13px", marginTop: "8px" }}>
              Jl. Contoh No.1, Sragen • (+62) 123-4567
            </div>
          </div>

          <div>
            <div style={{ fontSize: "13px" }}>Kontak</div>
            <div style={{ fontSize: "13px", marginTop: "8px" }}>
              Email: info@rssragen.id
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "13px",
          }}
        >
          © {new Date().getFullYear()} RSU PKU Muhammadiyah Sragen
        </div>
      </div>
    </footer>
  );
}