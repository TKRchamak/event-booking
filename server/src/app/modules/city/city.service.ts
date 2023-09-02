import { v4 as uuidv4 } from 'uuid';
import { ICity } from './city.interface';
import City from './city.model';

// add city in db
export const addCityToDB = async (cityData: ICity): Promise<ICity> => {
    try {
        let id = uuidv4();
        console.log({ ...cityData, ...{ id: id } });
        const city = new City({ ...cityData, ...{ id: id } });
        await city.save();
        return city;
    } catch (err) {
        throw err;
    }
}

// all city or city by id
export const getCityFromDB = async (cityId: string = '000'): Promise<any> => {
    try {
        if (cityId === "000") {
            const cityList = await City.find();
            return cityList;
        } else {
            const cityList = await City.findOne({ _id: cityId });
            return cityList;
        }
    } catch (err) {
        throw err;
    }
}

// edit city data by id
export const updateCityFromDB = async (cityId: string, cityData: ICity): Promise<string> => {
    try {
        if (!cityId) {
            throw new Error("City Not Found");
        } else {
            // const cityList = await City.findOne({ _id: cityId });
            const cityList = await City.updateOne({ _id: cityId }, { $set: cityData }, { upsert: true })
            if (cityList.acknowledged) {
                return "Data Update successfully";
            } else {
                throw new Error("Not Update at this time");
            }
        }
    } catch (err) {
        throw err;
    }
}

// remove city data by id
export const removeCityFromDB = async (cityId: string): Promise<string> => {
    try {
        if (!cityId) {
            throw new Error("City Not Found");
        } else {
            const resData = await City.deleteOne({ _id: cityId });
            if (resData.acknowledged) {
                return "City Remove From List"
            } else {
                throw resData;
            }
        }
    } catch (err) {
        throw err;
    }
}