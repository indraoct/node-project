const jobsController = require('../controllers/jobsController');
module.exports = function(app, db) {

    app.get('/getalljobs',(req,res)=>{
        jobsController.getAllJobs(db,req,res);
    })

    app.get('/getjob/:id',(req,res)=>{
        jobsController.getJob(db,req,res);
    })

    app.post('/insertjobs',(req,res)=>{

    })
}