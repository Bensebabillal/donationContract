pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Donnation
 * @dev Store & retreive value in a variable
 */
contract Donation {


    address public donneur;
    address public receveur;
    address public vendeur;
    string public product;

    bool public confirmation;



    constructor(address initReceveur, string memory initRroduct) public {

        donneur = msg.sender;

        receveur = initReceveur;

        product = initRroduct;

        confirmation = false;


    }


    function donnationDone(address initVendeur) public {
        require(
            msg.sender == receveur,
            "Only receveur can give success Donnation."
        );
        vendeur = initVendeur;
        confirmation = true;

    }

}