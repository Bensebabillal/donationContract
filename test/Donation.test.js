const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider())
const {contracts} = require('../compile')

let accounts;
let donation;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();


    donation = await new web3.eth.Contract(contracts.Donation.Donation.abi)
        .deploy({
            data: contracts.Donation.Donation.evm.bytecode.object.toString(),
            arguments: [accounts[1], '0234234234']
        })
        .send({from: accounts[0], gas: 1000000})

})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(donation
        assert.ok(donation.options.address)
    })

    it('has a default product', async () => {
        const product = await donation.methods.product().call();
        assert.strictEqual(product, '0234234234')
    })
})