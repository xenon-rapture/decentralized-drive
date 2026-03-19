// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    // Struct to keep track of who has been granted access
    struct Access {
        address user;
        bool access;
    }

    // Maps a user's address to an array of their file hashes (IPFS strings)
    mapping(address => string[]) value;
    
    // Maps [Owner Address] -> [Viewer Address] -> [True/False]
    mapping(address => mapping(address => bool)) ownership;
    
    // Keeps a list of all addresses that an owner has shared with
    mapping(address => Access[]) accessList;
    
    // Helper to avoid adding the same person to the accessList multiple times
    mapping(address => mapping(address => bool)) previousData;

    // 1. Upload a new file hash
    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    // 2. Grant someone access to your files
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        
        if (previousData[msg.sender][user]) {
            // If they were added before, just find them and update their status to true
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            // If it's their first time getting access, add them to the list
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    // 3. Revoke someone's access
    function disallow(address user) external {
        ownership[msg.sender][user] = false;
        
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // 4. View files (Checks if you are owner OR have permission)
    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access to these files!"
        );
        return value[_user];
    }

    // 5. See everyone you have shared your files with
    function shareAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}