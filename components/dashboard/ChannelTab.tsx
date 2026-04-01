export default function ChannelTab() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 20px", gap: "8px",
    }}>
      <span style={{ fontSize: "28px" }}>📡</span>
      <p style={{ color: "#8899bb", fontSize: "13px", fontWeight: 600, margin: 0 }}>유입채널 데이터 준비 중</p>
      <p style={{ color: "#4a5a7a", fontSize: "12px", margin: 0 }}>BigQuery UTM 연동 후 활성화됩니다.</p>
    </div>
  );
}
