pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Donnation
 * @dev Store & retreive value in a variable
 */
contract Donnation {


    address public donneur;
    address  public receveur;
    address payable public vendeur;
    string public product;
    uint256 public quantite;
    uint256 public productPrice;
    bool public confirmation;
    bool public depositDone;



    constructor(address initReceveur, address initDonneur, address payable initVendeur, uint256 initProductPrice, uint256 initQuantite, string memory initRroduct) public {
        // verifier si c'est l'adresse de l'admin
        require(
            msg.sender == 0x3e50A8329f11182C51dcE651fAd31Fb5EFF4d3da,
            "seul un admin peut initialiser le contract"
        );
        donneur = initDonneur;

        receveur = initReceveur;

        vendeur = initVendeur;

        product = initRroduct;

        quantite = initQuantite;

        productPrice = initProductPrice;

        confirmation = false;

        depositDone = false;


    }


    function donnationDone() public {
        require(
            depositDone == true,
            "le donnateur a pas encore emis la donnation ."
        );
        require(
            msg.sender == receveur,
            "Only receveur can give success Donnation."
        );


        bool resultTrans = vendeur.send(productPrice * quantite);

        if (resultTrans) {
            confirmation = true;
        }

    }


    // le montant que le donnateur devra mettre lor
    function deposit() external payable {
        require(msg.sender == donneur, "seul le donnateur peut invoque cette fonction");
        require(msg.value == (productPrice * quantite), "le montant est insufisant pour la donnation");

        // nothing else to do!
        depositDone = true;
    }


    // recuperer la valeur de l'argent qui est dans le smart contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }



    // function transfer don't use it .
    function transferEther() external returns (bool){
        require(
            msg.sender == receveur,
            "Only receveur can give success Donnation."
        );

        require(confirmation == true, "vous n'avez pas encore choisis de vendeur");


        bool resultTrans = vendeur.send(productPrice);
        return resultTrans;
    }

}