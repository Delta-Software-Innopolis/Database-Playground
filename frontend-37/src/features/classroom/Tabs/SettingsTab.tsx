import constuctionImg from "@/assets/construction.svg";

export function SettingsTab() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={constuctionImg} alt="Under constuction" />
    </div>
  );
}
