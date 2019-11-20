const mysql = require("mysql");
var express = require("express");
//var Joi =require("joi");
var emprouter =  express();
const connection = mysql.createConnection({
    host     : '192.168.43.147',
    user     : 'root',
    password : 'Manager@123',
    database : 'mydb',
    port: 3307
  });
var myData =[];
connection.connect();
// function validate(bodyContent)
// {
//     const schema = {
//         "Name": Joi.string().length(6).required(),
//         "No": Joi.number().required(),
//         "Address": Joi.required()
//         };
//    return Joi.validate(bodyContent , schema);
// }
emprouter.post("/",function(request, response){
//     let resultOfValidation= null;//validate(request.body);
//     //console.log(resultOfValidation);
//     if(resultOfValidation.error==null)
// {
    let bid = parseInt(request.body.bus_id);
    let btype= request.body.bus_typ;
    let bnumber = request.body.bus_no; 
    let bseat=request.body.seat; 
    let query = `insert into bus_info values(${bid}, '${btype}', ${bnumber},${bseat})`;
    console.log(query);
    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
//}
// else{
//     response.contentType("application/json");
//     response.send(JSON.stringify(resultOfValidation));
// }       
});
// emprouter.put("/:no",function(request, response){
//     let eno = parseInt(request.params.no);
//     let ename = request.body.name;
//     let eddress = request.body.address;  
//     let query = `update emp set name= '${ename}',address= '${eddress}' where no=${eno}`;
//     console.log(query);
//     connection.query(query, function(err, result){
//         if(err==null)
//         {
//            response.contentType("application/json");
//            response.send(JSON.stringify(result));
//         }
//         else
//         {   
//            response.contentType("application/json");
//            response.send(err); 
//         }
//     });
// });
emprouter.delete("/:No",function(request, response){
    let bid= parseInt(request.params.No);
    let query = `delete from bus_info where bus_id=${bid}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
        
});
emprouter.get("/", function(request, response){
    connection.query("select * from bus_info", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});
emprouter.get("/:No", function(request, response){
    console.log("You searched for " + request.params.No);
    // var empSearched= myData[parseInt(request.params.No) - 1];
    // response.contentType("application/json");
    // response.send(empSearched);
    let eno = parseInt(request.params.No);
    connection.query(`select * from bus_info where bus_id=${eno}`, function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
});
});
module.exports = emprouter;
