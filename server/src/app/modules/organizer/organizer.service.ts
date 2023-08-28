import { v4 as uuidv4 } from 'uuid';
import { IOrganizer } from './organizer.interface';
import Organizer from './organizer.model';

export const createOrganizerToDB = async (organizerData: IOrganizer): Promise<IOrganizer> => {
    try {
        let id = uuidv4();
        const organizer = new Organizer({ ...organizerData, id });
        await organizer.save();
        return organizer;
    } catch (err) {
        throw err;
    }
}


// all city or city by id
export const getOrganizerFromDB = async (organizerId: string = '000'): Promise<any> => {
    try {
        if (organizerId === "000") {
            const organizer = await Organizer.find();
            return organizer;
        } else {
            const organizer = await Organizer.findOne({ _id: organizerId });
            return organizer;
        }
    } catch (err) {
        throw err;
    }
}

// edit city data by id
export const updateOrganizerFromDB = async (organizerId: string, organizerData: IOrganizer): Promise<string> => {
    try {
        if (!organizerId) {
            throw new Error("Organizer Not Found");
        } else {
            const organizer = await Organizer.updateOne({ _id: organizerId }, { $set: organizerData }, { upsert: true })
            if (organizer.acknowledged) {
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
export const removeOrganizerFromDB = async (organizerId: string): Promise<string> => {
    try {
        if (!organizerId) {
            throw new Error("Organizer Not Found");
        } else {
            const resData = await Organizer.deleteOne({ _id: organizerId });
            if (resData.acknowledged) {
                return "Organizer Remove From List"
            } else {
                throw resData;
            }
        }
    } catch (err) {
        throw err;
    }
}