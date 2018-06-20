module.exports = function(app, db) {

    app.get('/getalljobs',(req,res)=>{

        db.collection("jobs").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });

    })
}