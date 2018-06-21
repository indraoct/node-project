var ObjectID = require('mongodb').ObjectID;
var CheckOjectID = require('valid-objectid');
var response = {};
var status = 0;
var message = "failed";
var data = [];

   exports.getAllJobs = function (db,req,res) {
       var query = { status: 1 };
       db.collection("jobs").find(query).toArray(function(err, result) {
           if (err) throw err;
            response["status"] = 1;
            response["message"] = "success";
            response["data"] = result;
            res.send(response);
       });
   }

   exports.getJob = function (db,req,res) {
       data = [];
       response["data"] = [];
       const id = req.params.id;
       if(CheckOjectID.isValid(id) == false){
           response["status"] = 0;
           response["message"] = "wrong id job";
           res.send(response);
       }else{
           const details = {'_id': ObjectID(id)};
           db.collection('jobs').findOne(details, (err, item) => {
               if (err) {
                   response["status"] = 0;
                   response["message"] = "error: An error has occurred'";
                   response["data"] = data;
                   res.send(response);
               } else {
                   data.push(item);
                   if (data.length > 0) {
                       response["message"] = "success";
                   } else {
                       response["message"] = "data Not found";
                   }
                   response["status"] = 1;
                   response["data"] = data;
                   res.send(response);
                }
               });
       }
   }
   
   exports.insertJob = function (db,req,res) {
       data = [];
       response["data"] = [];
       var description = req.body.description;
       var id_employer = req.body.id_employer;
       var status = req.body.status;
       if(CheckOjectID.isValid(id_employer) == false){
           response["status"] = 0;
           response["message"] = "wrong id employer";
           res.send(response);
       }else{
           const jobs = {
               description: description,
               id_employer: ObjectID(id_employer),
               status: status,
               created_date: new Date(),
               updated_date: ""
           };
           db.collection('jobs').insert(jobs, (err, result) => {
               if (err) {
                   response["status"] = 0;
                   response["message"] = "error: An error has occurred'";
                   response["data"] = data;
               } else {
                   response["status"] = 1;
                   response["message"] = "Success'";
                   response["data"] = result.ops[0];
               }
                   res.send(response);
           });
       }
     };


   exports.updateJobStatus = function (db,req,res){
       var id = req.params.id;
       var status = parseInt(req.body.status);
       if(CheckOjectID.isValid(id) == false){
           response["status"] = 0;
           response["message"] = "wrong id job!";
           res.send(response);
       }else {
           var query = {'_id': new ObjectID(id)};
           var values = {$set: {status: status, updated_date: new Date()}};


           db.collection("jobs").updateOne(query, values, (err, result) => {
               if (err) {
                   response["status"] = 0;
                   response["message"] = "error: An error has occurred'";
               } else {
                   response["status"] = 1;
                   response["message"] = "Success'";
                   response["data"] = result;
               }
                   res.send(response);
           });
       }
   }


