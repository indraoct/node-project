var ObjectID = require('mongodb').ObjectID;
var response = {};
var status = 0;
var message = "failed";
var data = [];

   exports.getAllJobs = function (db,req,res) {
       db.collection("jobs").find({}).toArray(function(err, result) {
           if (err) throw err;
            response["status"] = 1;
            response["message"] = "success";
            response["data"] = result;
            res.send(response);
       });
   }

   exports.getJob = function (db,req,res) {
       const id = req.params.id;
       const details = { '_id':ObjectID(id)};
       db.collection('jobs').findOne(details, (err, item) => {
           if (err) {
               res.send({'error':'An error has occurred'});
           } else {
               data.push(item);
               response["status"] = 1;
               response["message"] = "success";
               response["data"] = data;
               res.send(response);
       }
       });
   }


