var ObjectID = require('mongodb').ObjectID;

   exports.getAllJobs = function (db,req,res) {
       db.collection("jobs").find({}).toArray(function(err, result) {
           if (err) throw err;
            res.send(result);
       });
   }

   exports.getJob = function (db,req,res) {
       const id = req.params.id;
       const details = { '_id':ObjectID(id)};
       db.collection('jobs').findOne(details, (err, item) => {
           if (err) {
               res.send({'error':'An error has occurred'});
           } else {
               res.send(item);
       }
       });


   }

