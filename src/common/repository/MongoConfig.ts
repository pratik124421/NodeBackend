import { MongoClient, Db } from 'mongodb';
import mongoose from "mongoose"
var util = require('util')

export class MongoConfig{
    private static primaryurl="mongodb://localhost:27017/DummyBaseApp";
    public static async DBConnection() {
        try{
            mongoose.connect(MongoConfig.primaryurl)
        }catch(error){
                console.log(`Fetching records failed!`)
                console.log(error)
                return error
            }            
        }
    }