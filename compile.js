const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Donation.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8');
// console.log(source)

let input = {
    language: 'Solidity',
    sources: {
        'Donation': {content: source}
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

let test = solc.compile(JSON.stringify(input));
// console.log(hello);
module.exports = JSON.parse(test)