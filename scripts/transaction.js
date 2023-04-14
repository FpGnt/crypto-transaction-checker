const Web3 = require('web3')
var lib = require('./jsons/chain.json')
var db = require('./database.js')
const fs = require('fs');
require('dotenv').config()
table = 'address,amount,txhash,error'

const privateKey = process.env.SECRET_KEY;  
const ownerAddress = process.env.OWNER_ADDRESS

process.on('message', (msg) => {
    if (msg) {

        const found = lib.find(c => c.name === msg.chain)
console.log(msg.address, msg.amount, found.chain)

var web3 = new Web3(new Web3.providers.HttpProvider(`${found.chain}`))

array={}

async function nonce(){

    const nonce = await web3.eth.getTransactionCount(ownerAddress, 'pending');

    array['nonce'] = nonce
}

renamethefunction()

    async function renamethefunction() {
            
    const value = web3.utils.toHex(web3.utils.toBN(`${Math.floor(Number(msg.amount)*100000000)}`))  // 100000000 equal to 1
    const toAddress       = `${msg.address}`; 
    const contractAddress = '0x9bad6C75b5a4E72dF8147cc89d068cc848648e59'; 


                var contractABI =  [
                {
                "constant":false,
                "inputs":[
                    {"name":"_to","type":"address"},
                    {"name":"_value","type":"uint256"}
                ],
                "name":"transfer",
                "outputs":[
                    {"name":"success",
                    "type":"bool"}
                ],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
                }
                ]


                
    var contract = new web3.eth.Contract(contractABI,contractAddress, {from: ownerAddress} ); 

    var data = contract.methods.transfer(toAddress, value).encodeABI(); 
    

                res=[]

                async function gas(){
                    const gasPrice = await web3.eth.getGasPrice();
                    
                    res.push(gasPrice/10000)
                    }
                  await  gas()
                  await nonce()

                console.log('Gas: ' + res/100000 + ' Gwei')
    var rawTransaction = {"to": contractAddress, "gas": Number(res), "data": data, "nonce": array.nonce}; 

        web3.eth.accounts.signTransaction(rawTransaction, privateKey)
            .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, txHash) => {
                console.log(`txHash for `+  `: `, txHash)
                console.log('error:', err)
                console.log(ownerAddress+','+ msg.address +','+msg.amount+','+ msg.chain +','+ txHash +','+ array.nonce +','+'NEW'+','+ err +"\n")
                //insert in database 
                db.Insert_tx(ownerAddress,msg.address,msg.amount, msg.chain,txHash,array.nonce, err)

                array['nonce'] = array.nonce + 1
                
            }))


     }


    }

});

