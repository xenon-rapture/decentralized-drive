import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UploadModule = buildModule("UploadModule", (m) => {
  // Tell Ignition to deploy the "Upload" contract
  const upload = m.contract("Upload");

  return { upload };
});

export default UploadModule;