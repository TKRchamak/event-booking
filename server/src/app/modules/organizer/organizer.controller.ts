import { checkPassword, encryptPassword } from './../../utils/password';
import { NextFunction, Response, Request } from "express";
import { createOrganizerToDB, getOrganizerByEmailFromDB, getOrganizerFromDB, removeOrganizerFromDB, updateOrganizerFromDB, updateOrganizerStateFromDB } from "./organizer.service";
import { getAuthToken } from '../../utils/authentication';

// add Organizer
export const registerOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const isUser = await getOrganizerByEmailFromDB(email);
        if (isUser) {
            return res.status(302).json({
                status: "success",
                data: "Email Already Exist"
            })
        }

        let encPassword = await encryptPassword(password);
        req.body.password = encPassword;
        const organizerData = await createOrganizerToDB(req.body);
        const token = getAuthToken(organizerData._id, organizerData.role);

        return res.status(200).json({
            status: "success",
            token: token,
            data: organizerData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

export const loginOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("null did not taken");

        const organizerData = await getOrganizerByEmailFromDB(email);
        if (!organizerData) throw new Error("email not exist");

        let isVerified = await checkPassword(password, organizerData.password);

        if (!isVerified) {
            return res.status(500).json({
                status: "error",
                error: "Authentication Error"
            })
        }
        const token = getAuthToken(organizerData._id, organizerData.role)
        return res.status(200).json({
            status: "success",
            token: token,
            data: organizerData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

export const getAllOrganizer = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        if (role !== "admin") {
            return res.status(500).json({
                status: "error",
                error: "You are not admin"
            })
        }

        const allOrganizer = await getOrganizerFromDB();
        return res.status(200).json({
            status: "success",
            data: allOrganizer
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//get Organizer by token
export const getOrganizerByIdToken = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        const Organizer = await getOrganizerFromDB(userId);
        return res.status(200).json({
            status: "success",
            data: Organizer
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

// update organization status by admin
export const updateOrganizerState = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        if (role === "admin") {
            const isUpdated = await updateOrganizerStateFromDB(req.body._id, req.body.status);
            return res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            throw new Error("Organizer not found for this id")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//edit Organizer by Organizer or Organizer list
export const updateOrganizerData = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.authUser;
        // console.log(userId, req.body);
        if (userId && role === "organizer") {
            const isUpdated = await updateOrganizerFromDB(userId, req.body);
            return res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            return res.status(500).json({
                status: "error",
                error: "Organizer not found for this id"
            })
        }

        // return res.status(500).json({
        //     status: "error",
        //     error: "Organizer not found for this id"
        // })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}

//remove Organizer by Organizer or Organizer list
export const removeOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const Organizer = await removeOrganizerFromDB(id);
            return res.status(200).json({
                status: "success",
                data: Organizer
            })
        } else {
            throw new Error("Organizer not found for this id")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            error
        })
    }
}