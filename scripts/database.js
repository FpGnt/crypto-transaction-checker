var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test"
});
 

function Insert_tx(ownerAddress,address,amount,CHAIN,txHash,nonce,ERROR){
connection.query(`INSERT INTO test.transactions (ownerAddress,address,amount,CHAIN,txHash,nonce,STATUS,ERROR,date) VALUES ('${ownerAddress}','${address}','${amount}','${CHAIN}','${txHash}','${nonce}','NEW','${ERROR}',NOW())`, function (error, results, fields) {
  if (error) throw error;

});
}

function update_tx(state, txHash){
    connection.query(`UPDATE test.transactions SET STATUS = '${state}' WHERE txHash = '${txHash}';`, function (error, results, fields) {
      if (error) throw error;
      
    });
    }

    function select_txs(){
      return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM test.transactions AS s WHERE status IN ('NEW','PENDING')`, function (error, results, fields) {  
          resolve(results)
        });
        
      });
        }


module.exports = { Insert_tx, update_tx, select_txs }
