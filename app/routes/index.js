const testRoutes = require('./test_routes');
const Routes = require('./routes')
module.exports = function(app, db) {

    testRoutes(app, db); //just for test
    Routes(app, db); // real application

};