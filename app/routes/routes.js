const jobsController = require('../controllers/jobsController');
const usersController = require('../controllers/usersController');
const freelanceJobController = require('../controllers/freelanceJobController');
module.exports = function(app, db) {

    app.get('/getalljobs',(req,res)=>{
        jobsController.getAllJobs(db,req,res);
    })

    app.get('/getjob/:id',(req,res)=>{
        jobsController.getJob(db,req,res);
    })

    app.post('/insertjob',(req,res)=>{
        jobsController.insertJob(db,req,res);
    })

    app.put('/updatejobstatus/:id',(req,res)=>{
        jobsController.updateJobStatus(db,req,res);
    })

    app.post('/userregister',(req,res)=>{
        usersController.userRegister(db,req,res);
    })

    app.post('/userlogin',(req,res)=>{
        usersController.userLogin(db,req,res);
    })

    app.post('/initjob',(req,res)=>{
        freelanceJobController.initFreelanceJob(db,req,res);
    })

    app.post('/submitjob',(req,res)=>{
        freelanceJobController.submitFreelanceJob(db,req,res);
    })

    app.post('/completedjob',(req,res)=>{
        freelanceJobController.completedFreelanceJob(db,req,res);
    })

}