import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // 1. Upload to Pinata
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5OTE4NjJiNi0xODVhLTRiZTMtOWZmZi02YWQ0Mjg4ZTFmZmIiLCJlbWFpbCI6Inhlbm9ucmFwdHVyZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmQyMGM0NDZmYjA1YTYzYzJiNWMiLCJzY29wZWRLZXlTZWNyZXQiOiI2MmIwMmJiZGZlZjhjMDY4YTBkMzQ2Y2UxMjlhYWQ1Njg5ZDc2YWNjNzlkNzhlZGU2MWZiYmUyMTZiODM4NjRjIiwiZXhwIjoxODA1MTA1NDk3fQ.yOSLH_ZaLhjpIzQbVRtYRCGepefek7mG5-zxfbnM2eo"; // Use your JWT key
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // 2. Interact with MetaMask
        // This line sends the transaction to your wallet for approval
        const tx = await contract.add(account, ImgHash);
        
        console.log("Transaction sent! Waiting for confirmation...");
        await tx.wait(); 

        alert("Successfully Uploaded to IPFS and Blockchain!");
        setFileName("No file selected");
        setFile(null);
      } catch (error) {
        console.error("Metamask Error:", error);
        alert("Error: " + (error.reason || error.message));
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    setFile(data);
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="file" 
          id="file-upload" 
          onChange={retrieveFile} 
          disabled={!account}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Confirm via MetaMask
        </button>
      </form>
    </div>
  );
};

export default FileUpload;