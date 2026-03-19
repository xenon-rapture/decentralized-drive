# 🌐 Decentralized Drive (Web3 File Storage)

**Live Demo:** [Click Here to view the Live DApp](https://<YOUR_VERCEL_LINK>.vercel.app/)

A full-stack Web3 application that allows users to securely upload, store, and manage files on the decentralized web. This project leverages IPFS for immutable file storage and Ethereum smart contracts for strict cryptographic access control.

## ✨ Key Features
* **Decentralized Storage:** Files are pinned to IPFS via Pinata, ensuring they cannot be arbitrarily deleted or altered.
* **Smart Contract Access Control:** Only the owner and explicitly authorized wallet addresses can fetch and view the uploaded files.
* **Access Management:** Users can dynamically grant or revoke file access to other Ethereum wallets.
* **Wallet Integration:** Seamlessly connects with MetaMask or Rabby Wallet for authentication and transaction signing.

## 🛠️ Tech Stack
* **Frontend:** React.js, CSS
* **Web3 Connectivity:** Ethers.js (v6)
* **Smart Contracts:** Solidity (v0.8.28)
* **Development Environment:** Hardhat (v3)
* **Storage:** IPFS (via Pinata API)
* **Deployment:** Sepolia Testnet (Blockchain) & Vercel (Frontend)

## 🚀 Getting Started (Run Locally)

If you would like to run this project on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/decentralized-drive.git
cd decentralized-drive
```

### 2. Install Dependencies
Install the required packages for both the backend (Hardhat) and frontend (React).
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

### 3. Set Up Environment Variables
You will need to create two separate `.env` files.

**Backend `.env` (in the root directory):**
```text
SEPOLIA_RPC_URL="your_alchemy_or_public_rpc_url"
SEPOLIA_PRIVATE_KEY="your_wallet_private_key"
```

**Frontend `.env` (inside the `/client` directory):**
```text
REACT_APP_PINATA_JWT="your_pinata_jwt_token"
```

### 4. Deploy the Smart Contract
Compile and deploy the Solidity contract to your preferred network (e.g., localhost or Sepolia).
```bash
# Return to root directory
cd ..
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```
*Note: Copy the deployed contract address and update the `contractAddress` variable in `client/src/App.js`.*

### 5. Start the React Frontend
```bash
cd client
npm start
```
The application will launch at `http://localhost:3000`.

## 📜 Smart Contract Overview
The `Upload.sol` contract manages a mapping of addresses to an array of IPFS hashes. It includes built-in `require` statements to ensure that when a user requests an image array, the caller is either the owner of those files or an address that has been explicitly granted permission via the `allow` function.