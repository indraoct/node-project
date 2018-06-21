var ObjectID = require('mongodb').ObjectID;
var CheckOjectID = require('valid-objectid');
var response = {};
var status = 0;
var message = "failed";
var data = [];

    //User Init freelance job {status : 0 | initial}
    exports.initFreelanceJob = function(db,req,res) {
        response["status"] = 0;
        response["data"] = [];
        var email = req.body.email;
        var token = req.header("token");
        var id_job = req.body.id_job;

        if (email == undefined || email == "") {
            response["message"] = "email can not be empty";
            res.send(response);
        } else if (token == undefined || token == "") {
            response["message"] = "user token can not be empty";
            res.send(response);
        } else if (id_job == undefined || id_job == "") {
            response["message"] = "id job can not be empty";
            res.send(response);
        }else if(CheckOjectID.isValid(id_job)){
            response["message"] = "id job is not exist";
            res.send(response);
        }else{

            isAuthorize(db,email,token,function(result){
                if(result == false){
                    response["message"] = "you are not authorized or token has been expired!";
                    res.send(response);
                }else{
                    isJobExist(db,id_job,function(result_job){
                        if(result_job == false){
                            response["message"] = "job is not exist!";
                            res.send(response);
                        }else{
                            isUserAlreadyInitJob(db,email,id_job,function(result_already){
                                if(result_already == true){
                                    response["message"] = "you already init this job!";
                                    res.send(response);
                                }else{

                                    const freelancer_job = {
                                        email_freelancer: email,
                                        id_job: ObjectID(id_job),
                                        status:0,
                                        created_date:new Date(),
                                        updated_date:"",
                                        created_by:email,
                                        updated_by:""
                                    };

                                    db.collection('freelancer_jobs').insert(freelancer_job, (err, result) => {
                                        if(err){
                                            response["status"] = 0;
                                            response["message"] = "error: An error has occurred'";
                                            res.send(response);
                                        }else{
                                            response["status"] = 1;
                                            response["message"] = "Success'";
                                            response["data"] = result.ops[0];
                                            res.send(response);
                                        }
                                        });
                                }

                            });
                        }
                    });
                }
            });

        }
    }


    //user submit job {status : 1| submit}
    exports.submitFreelanceJob = function(db,req,res){
        response["status"] = 0;
        var email = req.body.email;
        var token = req.header("token");
        var id_job = req.body.id_job;

        if(email == undefined || email == ""){
            response["message"] = "email can not be empty";
            res.send(response);
        }else if (token == undefined || token == ""){
            response["message"] = "user token can not be empty";
            res.send(response);
        }else if(id_job == undefined || id_job == ""){
            response["message"] = "id job can not be empty";
            res.send(response);
        }else if(CheckOjectID.isValid(id_job) == false) {
            response["message"] = "id job is not exist";
            res.send(response);
        }else{
            isAuthorize(db,email,token,function(result){
                if(result == false){
                    response["message"] = "you are not authorized or token has been expired!";
                    res.send(response);
                }else{
                    isJobExist(db,id_job,function(result_job) {
                        if(result_job == false){
                            response["message"] = "job is not exist!";
                            res.send(response);
                        }else {
                            isUserAlreadyInitJob(db,email,id_job,function(result_already){
                                if(result_already == false){
                                    response["message"] = "you must init the job first!";
                                    res.send(response);
                                }else{

                                    var query = {email_freelancer:email,id_job:ObjectID(id_job)};
                                    var values = { $set: { status: 1,updated_date:new Date(),updated_by:email}};

                                    db.collection("freelancer_jobs").updateOne(query, values, (err, result) => {
                                        if (err) {
                                            response["status"] = 0;
                                            response["message"] = "error: An error has occurred'";
                                        } else {
                                            updateUserPointJobSubmit(db,email,function(result_points){
                                                if(result_points != false){
                                                    console.log("success update points");
                                                }
                                            });
                                            response["status"] = 1;
                                            response["message"] = "Success'";
                                        }
                                            res.send(response);
                                        });
                                }
                            });
                        }
                    });
                }

            });
        }

    }


    function isJobExist(db,id_job,callback){
        const details = {"_id":ObjectID(id_job),status:1};
        db.collection('jobs').findOne(details, (err, item) => {
            if (err) {
                callback(false);
            } else {
                if(item == null) {
                    callback(false);
                }else{
                    callback(true);
                }
            }
            });

    }

    function isAuthorize(db,email,token,callback){
        const details = { email:email,'token':token};
        db.collection('freelancers').findOne(details, (err, item) => {
            if (err) {
                callback(false);
            } else {
                if(item == null) {
            callback(false);
                }else{
                    callback(true);
                }
            }
            });
    }

    function isUserAlreadyInitJob(db,email,id_job,callback){
        const details = { email_freelancer:email,id_job:ObjectID(id_job),status:0};
        db.collection('freelancer_jobs').findOne(details, (err, item) => {
            if (err) {
                callback(false);
            } else {
                if(item == null) {
                    callback(false);
                }else{
                    callback(true);
                }
            }
            });
    }

    function updateUserPointJobSubmit(db,email,callback){
        const details = { email:email};
        db.collection('freelancers').findOne(details, (err, item) => {
            if (err) {
                callback(false);
            } else {
                if(item == null) {
                    callback(false);
                }else{
                    var points_after = parseInt(item.points) - 2;
                    var query = {email:email};
                    var values = { $set: { points: points_after}};

                    db.collection("freelancers").updateOne(query, values, (err, result) => {
                        if (err) {
                            callback(false);
                        } else {
                            callback(points_after);
                        }
                        });
                }
            }
            });
    }

