const monk = require('monk');
require('dotenv').config()
const db = monk(process.env.MONGO_URI);

db.then(() =>{
    console.log("Connection Success");
  }).catch((e)=>{
    console.error("Error! ",e);
  });

module.exports = db;