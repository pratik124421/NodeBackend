import {hashSync}  from "bcrypt"
import  mongoose,{Schema,Document} from "mongoose"
import { Collection } from "../common/utils/enum";

export interface Qr extends Document{
    Username:string;
    Password:string
}

export class QrModel{
    
    private static instance: QrModel = null;
    
    public static getInstance(): QrModel {
        if (QrModel.instance == null) {
            QrModel.instance = new QrModel();
        }
        return QrModel.instance;
    }

    public static GetModal(){
        const QrSchema : Schema = new Schema({
            Username: {
                type: String,
                required:true,
            },
            Password: {
                type: String,
                required:true
            }
        })

        
        return  mongoose.model<Qr>(Collection.QrCollection, QrSchema)
    }

}


// const hashstring = genSaltSync(10)
//         console.log("hashhh...string...",hashstring)

//         const bcryptPass = hashSync(data["password"],hashstring)

//         console.log("bcrypt...pass...",bcryptPass)