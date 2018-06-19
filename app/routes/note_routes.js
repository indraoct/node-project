module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // You'll create your note here.
        res.send('Hello')
    });

    app.get('/testapi', (req,res)=>{
        var response = {} // empty Object
        var status = 1;
        var message = "success"

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
