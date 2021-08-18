const express = require('express');
const app = express();
const bd = require('body-parser');
const mysql = require('mysql');

app.use(express.json());

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : "",
    database : 'iyin'

})
//    ******* GET REQUEST TO DB ******
app.get('/' , (req,res) =>{
    pool.getConnection((err, connection) => {
        if (err) throw err 
        
        connection.query('SELECT * FROM school', (error, data) => {
               connection.release()
            if (error) throw error 
            res.send(data)
            console.log(`Data has been sent from the school table`) ;


        }) 
    }) ;




//    ******* DELETE REQUEST  TO DB ******* 
    app.delete('/:id' , (req, res) =>{
        pool.getConnection((err , connection) => {
            if (err) throw err ;

            connection.query(`DELETE FROM school WHERE id = ${req.params.id}` , (error , data) => {
                connection.release() ;
                if (error) {throw error} 

                res.send(data);
            }) ;
        })
    })


    // res.send('Do you see a response on the console..')
}) ;
// ***** POST REQUEST TO DB ******
        app.post('/:id/:no' , (req,res) =>{
            pool.getConnection((err , connection) =>{
                if (err) throw err ;

                connection.query(`INSERT INTO school (id ,phone_number) VALUES (${req.params.id},${req.params.no}) `,(error,data) =>{

                    connection.release();
                    if(error) throw error;

                    res.send(data) ;

                })
            })
        })



const port = process.env.PORT || 5000 ;
app.listen(port, () => {console.log(`listening on port ${port}.........`)});