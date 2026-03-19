import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import "./App.css";
import Upload from "./Upload.json";
import Share from "./components/Share";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          // This works for both Rabby and MetaMask
          const provider = new ethers.BrowserProvider(window.ethereum);
          
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          // Update this with your actual deployed contract address from the terminal
          let contractAddress = "0xBD648bA8798cb5cFD6714b2f099Ee5163348a1Dd";

          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        alert("Please install a Web3 wallet like Rabby or MetaMask");
      }
    };
    loadProvider();
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <h1>Decentralized Drive</h1>
        <div className="account-box">
          {account ? `Connected: ${account.substring(0, 6)}...${account.substring(38)}` : "Not Connected"}
        </div>
      </div>

      <div className="main-content">
        <h3>Your Files</h3>
        
        {/* The component for uploading files */}
        <FileUpload account={account} contract={contract} />

        {/* --- NEW: The component for sharing access --- */}
        <Share contract={contract} />

        {/* A clean visual divider for the UI */}
        <hr style={{ width: "100%", border: "1px solid #30363d", margin: "30px 0" }} />

        {/* The component for viewing uploaded files */}
        <Display account={account} contract={contract} />

        <p className="placeholder-text">Contract is ready. Your files are stored on IPFS.</p>
      </div>
    </div>
  );
}

export default App;