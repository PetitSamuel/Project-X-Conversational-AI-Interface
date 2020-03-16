import mongoose from 'mongoose';

export function Course() {
    console.log("course");
    this.id = '';
    this.name = '';
};

/*
module.exports = {
    connectDb : () => {
        let dbURL = process.env.MONGO_CONNECTION_STRING;
    
        mongoose.connection.on('connected', function(){
            console.log("Mongoose default connection is open to ", dbURL);
        });
    
        mongoose.connection.on('error', function(err){
            console.log("Mongoose default connection has occured "+err+" error");
        });
    
        mongoose.connection.on('disconnected', function(){
            console.log("Mongoose default connection is disconnected");
        });
    
        return mongoose.connect(dbURL);
    },
  }
*/
//const models = {};
//export default models;