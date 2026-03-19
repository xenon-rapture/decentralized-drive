import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address-display").value;
    
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access or address is invalid");
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      
      const images = str_array.map((item, i) => {
        // Extract a short version of the IPFS CID (Hash) to show the user
        const cid = item.split("/ipfs/")[1]?.substring(0, 10) + "...";

        return (
          <div key={i} className="file-card">
            <a href={item} target="_blank" rel="noreferrer">
              <img
                src={item}
                alt="Blockchain Data"
                className="image-thumbnail"
              ></img>
            </a>
            <div className="file-info">
              <span className="file-cid">CID: {cid}</span>
              <a href={item} target="_blank" rel="noreferrer" className="download-btn">
                View / Download
              </a>
            </div>
          </div>
        );
      });
      setData(images);
    } else {
      alert("No images to display for this account");
    }
  };

  return (
    <div className="display-container">
      {/* The Grid where the cards will appear */}
      <div className="image-grid">{data}</div>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Enter Address to see shared files"
          className="address address-display"
        ></input>
        <button className="button" onClick={getdata}>
          Get My Files
        </button>
      </div>
    </div>
  );
};

export default Display;