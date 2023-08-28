import { NextFunction, Response, Request } from "express";
import { addCityToDB, getCityFromDB, removeCityFromDB, updateCityFromDB } from "./city.service";


// add city
export const addCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const city = await addCityToDB(req.body);
        res.status(200).json({
            status: "success",
            data: city
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

//get city by id or city list
export const getCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const city = await getCityFromDB(id);
            res.status(200).json({
                status: "success",
                data: city
            })
        } else {
            const city = await getCityFromDB();
            res.status(200).json({
                status: "success",
                data: city
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}


//edit city by city or city list
export const updateCityData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const isUpdated = await updateCityFromDB(id, req.body);
            res.status(200).json({
                status: "success",
                data: isUpdated
            })
        } else {
            throw new Error("City not found for this id")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}

//remove city by city or city list
export const removeCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (id) {
            const city = await removeCityFromDB(id);
            res.status(200).json({
                status: "success",
                data: city
            })
        } else {
            throw new Error("City not found for this id")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error
        })
    }
}