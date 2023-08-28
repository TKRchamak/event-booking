import { NextFunction, Request, Response } from "express";
import { addTicketInDB, createUserToDB, getUserByIdFromDB, getUsersFromDB, updateUserByIdFromDB } from "./user.service";
import { encryptPassword } from "../../utils/password";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body;
        let encPassword = await encryptPassword(password);
        req.body.password = encPassword;
        const user = await createUserToDB(req.body);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await getUserByIdFromDB(id);

    console.log(user, id);

    res.status(200).json({
        status: 'success',
        data: user
    })
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await updateUserByIdFromDB(id, req.body);

    res.status(200).json({
        status: 'success',
        data: user
    })
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await getUsersFromDB();
    // console.log("user controller", allUsers);
    res.status(200).json({
        status: 'success',
        data: allUsers
    })
}


export const buyTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const allUsers = await addTicketInDB(id, req.body.ticket_id);
    // console.log("user controller", allUsers);
    res.status(200).json({
        status: 'success',
        data: allUsers
    })
}


// export const getAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const user = await getAdminFromDB();

//     res.status(200).json({
//         status: 'success',
//         data: user
//     })
// }

