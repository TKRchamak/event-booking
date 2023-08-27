import { NextFunction, Request, Response } from "express";
import { createUserToDB, getAdminFromDB, getUserByIdFromDB, getUsersFromDB } from "./user.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

// export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const user = await getUserByIdFromDB(id);

//     res.status(200).json({
//         status: 'success',
//         data: user
//     })
// }



// export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const allUsers = await getUsersFromDB();
//     // console.log("user controller", allUsers);

//     res.status(200).json({
//         status: 'success',
//         data: allUsers
//     })
// }



// export const getAdminUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const user = await getAdminFromDB();

//     res.status(200).json({
//         status: 'success',
//         data: user
//     })
// }