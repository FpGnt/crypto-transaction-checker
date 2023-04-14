var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test"
});
 

function Insert_tx(ownerAddress,address,amount,CHAIN,txHash,nonce,ERROR){
connection.query(`INSERT INTO test.transactions (ownerAddress,address,amount,CHAIN,txHash,nonce,STATUS,ERROR,atempts,date) VALUES ('${ownerAddress}','${address}','${amount}','${CHAIN}','${txHash}','${nonce}','NEW','${ERROR}','0',NOW())`, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  connection.end();
});
}

function update_tx(){
    connection.query(`UPDATE test.transactions SET STATUS = 'FAILED' WHERE id =4;`, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
    });
    }

    function select_tx(){
        connection.query(`SELECT * FROM test.transactions AS s WHERE status IN ('NEW','PENDING')`, function (error, results, fields) {
          if (error) throw error;
          console.log(results);
        });
        }

        select_tx()


module.exports = { Insert_tx }
module.exports = { select_tx }