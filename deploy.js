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

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('attempting to deploy from account', accounts[0])


    const result = await new web3.eth.Contract(contracts.Donation.Donation.abi)
        .deploy({
            data: contracts.Donation.Donation.evm.bytecode.object.toString(),
            arguments: [accounts[1], '0234234234']
        })
        .send({from: accounts[0], gas: 10000000, gasPrice: 100000000000})

    console.log('contract deploy to', result.options.address)
};

deploy().then(() => {
    console.log('deployed successfully')
});