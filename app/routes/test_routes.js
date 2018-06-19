module.exports = function(app, db) {
    app.post('/testpost', (req, res) => {
        // You'll create your note here.
        var response = {}
        var status = 1;

        var message = "success";
        var data = [];
        var param = req.body.param;

        var datum = {param:param}
        data.push(datum)


        response["status"] = status;
        response["message"] = message;
        response["data"] = data;

        res.send(JSON.parse(JSON.stringify(response)))
    });

    app.get('/testapi', (req,res)=>{
        var response = {}
        var status = 1;
        var message = "success";

        var customer1 = {id:1,name:"Agus Sarwono",address:"Jogja"}
        var customer2 = {id:2,name:"Silvia",address:"Jakarta"}

        var data = []

        data.push(customer1);
        data.push(customer2);

        response["status"] = status;
        response["message"] = message;
        response["data"] = data;

        res.send(JSON.parse(JSON.stringify(response)))


    });


};
