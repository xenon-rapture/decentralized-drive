import "./Display.css";

const Share = ({ contract }) => {
  // --- Grant Access Function ---
  const sharing = async () => {
    const address = document.querySelector(".address-share").value;
    if (!address) {
      alert("Please enter an address first!");
      return;
    }
    try {
      const transaction = await contract.allow(address);
      await transaction.wait();
      alert(`Success! Access GRANTED to ${address.substring(0, 6)}...`);
      document.querySelector(".address-share").value = ""; 
    } catch (error) {
      console.error("Sharing error:", error);
      alert("Failed to grant access.");
    }
  };

  // --- Revoke Access Function ---
  const revoking = async () => {
    const address = document.querySelector(".address-share").value;
    if (!address) {
      alert("Please enter an address first!");
      return;
    }
    try {
      const transaction = await contract.disallow(address);
      await transaction.wait();
      alert(`Success! Access REVOKED for ${address.substring(0, 6)}...`);
      document.querySelector(".address-share").value = ""; 
    } catch (error) {
      console.error("Revoking error:", error);
      alert("Failed to revoke access.");
    }
  };

  return (
    <div className="share-box">
      <h3 style={{ color: "#ffffff", fontSize: "1.2rem", marginTop: "30px", borderBottom: "none" }}>
        Manage Access
      </h3>
      <input
        type="text"
        className="address address-share"
        placeholder="Enter Wallet Address (0x...)"
      ></input>
      
      {/* We put the buttons side-by-side using a wrapper div */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
        <button className="button" onClick={sharing}>
          Grant Access
        </button>
        {/* The new Revoke Button in red */}
        <button className="button" onClick={revoking} style={{ backgroundColor: "#da3633" }}>
          Revoke Access
        </button>
      </div>
    </div>
  );
};

export default Share;