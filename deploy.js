const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {contracts} = require('./compile');

const provider = new HDWalletProvider(
    'never fly bargain aim pumpkin alarm visit throw neither range wonder ordinary',
    "https://rinkeby.infura.io/v3/6ef61b3313b140038d704936db0868b5",
    0,
    10
)

const web3 = new Web3(provider);

async function scan(message) {
    process.stdout.write(message);
    return await new Promise(function (resolve, reject) {
        process.stdin.resume();
        process.stdin.once("data", function (data) {
            process.stdin.pause();
            resolve(data.toString().trim());
        });
    });
}

async function getGasPrice(web3) {
    while (true) {
        const nodeGasPrice = await web3.eth.getGasPrice();
        const userGasPrice = await scan(`Enter gas-price or leave empty to use ${nodeGasPrice}: `);
        if (/^\d+$/.test(userGasPrice))
            return userGasPrice;
        if (userGasPrice == "")
            return nodeGasPrice;
        console.log("Illegal gas-price");
    }
}

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('attempting to deploy from account', accounts[0])


    const result = await new web3.eth.Contract(contracts.Donation.Donation.abi)
        .deploy({
            data: contracts.Donation.Donation.evm.bytecode.object.toString(),
            arguments: [accounts[1], '0234234234']
        })
        .send({from: accounts[0], gas: 1500000, gasPrice: await getGasPrice(web3),})

    console.log('contract deploy to', result.options.address)
};

deploy().then(() => {
    console.log('deployed successfully')
});