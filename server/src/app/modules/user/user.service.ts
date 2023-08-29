// database logic
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async (userData: IUser): Promise<IUser> => {
    try {
        // let id = uuidv4();
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
}

export const getUserByEmailFromDB = async (payload: string): Promise<IUser> => {
    try {
        // const user = await User.findOne({ id: payload }, { name: 1, contactNo: 1 }); // return only name and contact no
        const user = await User.findOne({ email: payload });
        return user as IUser;
    } catch (err) {
        throw err;
    }
}

export const getUserByIdFromDB = async (payload: string): Promise<IUser> => {
    try {
        // const user = await User.findOne({ id: payload }, { name: 1, contactNo: 1 }); // return only name and contact no
        const user = await User.findOne({ _id: payload });
        return user as IUser;
    } catch (err) {
        throw err;
    }
}

export const updateUserByIdFromDB = async (userId: string, userData: IUser): Promise<string> => {
    try {
        const user = await User.updateOne({ _id: userId }, { $set: userData }, { upsert: true }); // return only name and contact no
        if (user.acknowledged) {
            return "Data Update successfully";
        } else {
            throw new Error("Not Update at this time");
        }
    } catch (err) {
        throw err;
    }
}

export const addTicketInDB = async (payload: string, ticket_id: string): Promise<any> => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: payload },
            {
                $addToSet: {
                    ticket_list: { $each: [ticket_id] }
                }
            },
            // {
            //     new: true,
            //     upsert: true,
            //     rawResult: true
            // }
        );
        return user;
    } catch (err) {
        return err;
    }
}

export const removeTicketInDB = async (payload: string, ticket_id: string): Promise<any> => {
    try {
        const user = await User.updateOne(
            { _id: payload },
            {
                $pull: { ticket_list: ticket_id },
            }
        );
        return user;
    } catch (err) {
        return err;
    }
}

// export const getUsersFromDB = async (): Promise<IUser[]> => {
//     try {
//         // let users = await User.find().populate("Event");
//         let users = await User.find();
//         return users;
//     } catch (err) {
//         throw err;
//     }
// }

// export const getAdminFromDB = async () => {
//     try {
//         const user = await User.findOne({ id: payload }); // send all data
//         const admins = await User.getAdminUsers();
//         return admins;
//     } catch (err) {
//         // console.error(err);
//         return err;
//     }
// }