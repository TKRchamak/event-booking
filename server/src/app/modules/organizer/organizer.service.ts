import { v4 as uuidv4 } from 'uuid';
import { IOrganizer } from './organizer.interface';
import Organizer from './organizer.model';

export const createOrganizerToDB = async (organizerData: IOrganizer): Promise<IOrganizer> => {
    try {
        const organizer = new Organizer(organizerData);
        await organizer.save();
        return organizer;
    } catch (err) {
        throw err;
    }
}

export const getOrganizerByEmailFromDB = async (payload: string): Promise<IOrganizer> => {
    try {
        const organizer = await Organizer.findOne({ email: payload });
        return organizer as IOrganizer;
    } catch (err) {
        throw err;
    }
}

// all organizer or single organizer
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
export const updateOrganizerFromDB = async (organizerId: string, organizerData: IOrganizer): Promise<IOrganizer> => {
    try {
        if (!organizerId) {
            throw new Error("Organizer Not Found");
        } else {
            // const organizer = await Organizer.updateOne(, { $set: organizerData }, { upsert: true })
            const organizer = await Organizer.findOneAndUpdate(
                { _id: organizerId },
                { $set: organizerData },
                {
                    new: true,
                    upsert: true,
                    rawResult: true
                }
            );

            if (organizer.ok) {
                return organizer.value as IOrganizer;
            } else {
                throw new Error("Not Update at this time");
            }
        }
    } catch (err) {
        throw err;
    }
}

export const updateOrganizerStateFromDB = async (organizerId: string, status: string): Promise<string> => {
    try {
        if (!organizerId) {
            throw new Error("Organizer Not Found");
        } else {
            const organizer = await Organizer.updateOne({ _id: organizerId }, { $set: { status: status } }, { upsert: true })
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

export const addEventInOrganizerDB = async (organizerId: string, eventId: string): Promise<any> => {
    try {
        if (!organizerId) {
            throw new Error("Organizer Not Found");
        } else {
            const resData = await Organizer.findOneAndUpdate(
                { _id: organizerId },
                {
                    $addToSet: {
                        event_list: { $each: [eventId] }
                    }
                }
            );
            return resData;
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

