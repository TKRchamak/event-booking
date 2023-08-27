// database logic
import { v4 as uuidv4 } from 'uuid';

import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async (userData: IUser): Promise<IUser> => {
    try {
        let id = uuidv4();
        const user = new User({ ...userData, id });
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
}

export const getUsersFromDB = async (): Promise<IUser[]> => {
    try {
        let users = await User.find();
        return users;
    } catch (err) {
        throw err;
    }
}

export const getUserByIdFromDB = async (payload: string): Promise<IUser | any> => {
    try {
        // const user = await User.findOne({ id: payload }); // send all data
        const user = await User.findOne({ id: payload }, { name: 1, contactNo: 1 }); // return only name and contact no
        return user;
    } catch (err) {
        // console.error(err); 
        return err;
    }
}

export const getAdminFromDB = async () => {
    try {
        // const user = await User.findOne({ id: payload }); // send all data
        // const admins = await User.getAdminUsers();
        // return admins;
    } catch (err) {
        // console.error(err); 
        return err;
    }
}