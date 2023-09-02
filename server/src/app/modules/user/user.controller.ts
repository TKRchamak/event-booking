import { NextFunction, Request, Response } from "express";
import { addTicketInDB, createUserToDB, getUserByEmailFromDB, getUserByIdFromDB, updateUserByIdFromDB } from "./user.service";
import { encryptPassword, checkPassword } from "../../utils/password";
import { getAuthToken } from "../../utils/authentication";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = req.body;

        if (role) {
            return res.status(500).json({
                status: "error",
                error: "Your not not authorized"
            })
        }

        const alreadyHave = await getUserByEmailFromDB(email);
        if (alreadyHave) {
            return res.status(302).json({
                status: "success",
                data: "Email Already Exist"
            })
        }

        let encPassword = await encryptPassword(password);
        req.body.password = encPassword;
        const userData = await createUserToDB(req.body);
        const token = getAuthToken(userData._id, userData.role);

        return res.status(200).json({
            status: "success",
            token: token,
            data: userData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email || !password) throw new Error("null did not taken");

        const userData = await getUserByEmailFromDB(email);
        if (!userData) throw new Error("email not exist");

        let isVerified = await checkPassword(password, userData.password);
        // console.log(userData, isVerified);

        if (!isVerified) {
            return res.status(301).json({
                status: "error",
                error: "Authentication Error"
            })
        }
        const token = getAuthToken(userData._id, userData.role)
        return res.status(200).json({
            status: "success",
            token: token,
            data: userData
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

export const getUserByToken = async (req: Request | any, res: Response, next: NextFunction) => {
    // const { id } = req.params;
    const { userId, role } = req.authUser;
    const user = await getUserByIdFromDB(userId);
    return res.status(200).json({
        status: 'success',
        data: user
    })
}

export const updateUserByToken = async (req: Request | any, res: Response, next: NextFunction) => {
    const { userId, role } = req.authUser;
    const user = await updateUserByIdFromDB(userId, req.body);

    return res.status(200).json({
        status: 'success',
        data: user
    })
}

// export const buyTicket = async (req: Request | any, res: Response, next: NextFunction) => {
//     // const { id } = req.params;

//     const { userId, role } = req.authUser;
//     // console.log(req.authUser, req.body.ticket_id);
//     const allUsers = await addTicketInDB(userId, req.body.ticket_id);
//     // console.log("user controller", allUsers);
//     return res.status(200).json({
//         status: 'success',
//         data: allUsers
//     })
// }


// export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const allUsers = await getUsersFromDB();
//     // console.log("user controller", allUsers);
//     return res.status(200).json({
//         status: 'success',
//         data: allUsers
//     })
// }

// export const getAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const user = await getAdminFromDB();

//     return res.status(200).json({
//         status: 'success',
//         data: user
//     })
// }

