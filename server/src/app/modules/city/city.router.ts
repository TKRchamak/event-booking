import express from "express";
import { addCity, getCity, removeCity, updateCityData } from "./city.controller";
import { verifyAuthToken } from "../../utils/authentication";
const router = express.Router();

/*
    add city
    city list
    city by id
    update city data
    remove city
*/

router.get("/", getCity);
router.get("/:id", getCity);
router.post("/", addCity);
router.put("/:id", updateCityData);
// router.delete("/:id", removeCity);

export default router;