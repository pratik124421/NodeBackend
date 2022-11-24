import {hashSync}  from "bcrypt"
import  mongoose,{Schema,Document} from "mongoose"
import { Collection } from "../common/utils/enum";

export interface User extends Document{
    Username:string;
    Password:string
}

export class UserModel{
    
    private static instance: UserModel = null;
    
    public static getInstance(): UserModel {
        if (UserModel.instance == null) {
            UserModel.instance = new UserModel();
        }
        return UserModel.instance;
    }

    public static GetModal(){
        const UserSchema : Schema = new Schema({
            Username: {
                type: String,
                required:true,
                unique:true,
                validate(value) {
                    if (value == "") {
                        throw new Error("email must be greater then 0")
                    }
                }
            },
            Password: {
                type: String,
                required:true,
                validate(value) {
                    if (value < 0) {
                        throw new Error("age must be greater then 0")
                    }
                },
            },
        })

        UserSchema.pre("save", async function (next) {
            const user = this
            if (user.isModified('Password')) {
                const hashPass = hashSync(user.Password, 10)
                user.Password = hashPass
                next()   
                } else {
                  return next()
            }
        })


        UserSchema.methods.toJSON = function () {
            const user = this
            const userObject = user.toObject()
        
            delete userObject.Password        
            return userObject
        }

        return  mongoose.model<User>(Collection.UsersCollection, UserSchema)
    }

    public generateUserPayload(UserObj:User){
        let payload = {}
        
        payload["Username"]=UserObj.Username
        // payload["Password"]=
    
    }
}


// const hashstring = genSaltSync(10)
//         console.log("hashhh...string...",hashstring)

//         const bcryptPass = hashSync(data["password"],hashstring)

//         console.log("bcrypt...pass...",bcryptPass)