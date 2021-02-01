require('dotenv').config();
const app = require('./backend/app.js');
const bootstrap = require('./backend/services/bootstrap.service');
const sequelize = require("./backend/models/database")


const _PORT = process.env.PORT || 5000

app.listen(_PORT, async () => {
    await sequelize.sync({alter:true})
    await bootstrap.createBootstrap()
    console.log(`Express server is running on port ${_PORT}`);
});
