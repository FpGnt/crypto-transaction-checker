const Web3 = require('web3')
const fs = require('fs');
const sleep = require('util').promisify(setTimeout)
var lib = require('./jsons/chain.json')
var db = require('./database.js');

db.select_txs().then(results => {
results.forEach(element => {
const found = lib.find(c => c.name === element.chain)
t()

async function t(){

  const web3 = new Web3(new Web3.providers.HttpProvider(found.chain))

    receipt = await web3.eth.getTransactionReceipt(element.txHash)


    if(receipt!==null){

            if(receipt.status===true){
                state='COMPLETED'
                db.update_tx(state,element.txHash)
            }

            if(receipt.status!==true){
                state='FAILED'
                db.update_tx(state,element.txHash)
            }

    }
    else{
        state='PENDING'
        db.update_tx(state,element.txHash)
    }
}
})
})
