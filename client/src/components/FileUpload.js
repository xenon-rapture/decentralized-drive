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

        // 1. Upload to Pinata securely using the .env file!
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        // 2. Interact with MetaMask
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