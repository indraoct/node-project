var ObjectID = require('mongodb').ObjectID;
var md5 = require('md5');
var response = {};
var status = 0;
var message = "failed";
var data = [];

    exports.userRegister = function(db,req,res) {
        response["status"] = 0;
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var password_confirm = req.body.password;

        if(name == undefined || name == ""){
            response["message"] = "name can not be empty";
            res.send(response);
        }else if(email == undefined || email == ""){
            response["message"] = "email can not be empty";
            res.send(response);
        }else if(password == undefined || password == "" || password_confirm == undefined || password_confirm == ""){
            response["message"] = "Password / Password Confirmation can not be empty";
            res.send(response);
        }else if(password != password_confirm){
            response["message"] = "password confirmation is not matched with thw password that you put before!";
            res.send(response);
        }else{
            isExistUserEmail(db,email, function(result) {
                if(result == true) {
                    response["status"] = 0;
                    response["message"] = "User is already exist";
                }else{
                    const freelancers = {
                        name: name,
                        email: email,
                        password: md5(password),
                        token: "",
                        points: 20
                    };

                    db.collection('freelancers').insert(freelancers, (err, result) => {
                        if(err){
                            response["status"] = 0;
                            response["message"] = "error: An error has occurred'";
                            response["data"] = data;
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
    }


    function isExistUserEmail(db,email,callback){
        const details = { 'email':email};
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