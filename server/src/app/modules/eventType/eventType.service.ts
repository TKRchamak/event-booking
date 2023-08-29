import { v4 as uuidv4 } from 'uuid';
import { IEvent_type } from './eventType.interface';
import Event_type from './eventType.model';


export const addEvent_typeToDB = async (event_typeData: IEvent_type): Promise<IEvent_type> => {
    try {
        let id = uuidv4();
        // console.log({ ...event_typeData, ...{ id: id } });
        const event_type = new Event_type({ ...event_typeData, ...{ id: id } });
        await event_type.save();
        return event_type;
    } catch (err) {
        throw err;
    }
}



export const getEvent_typeFromDB = async (event_typeId: string = '000'): Promise<any> => {
    try {
        if (event_typeId === "000") {
            const event_type = await Event_type.find();
            return event_type;
        } else {
            const event_type = await Event_type.findOne({ _id: event_typeId });
            return event_type;
        }
    } catch (err) {
        throw err;
    }
}


export const updateEvent_typeFromDB = async (event_typeId: string, event_typeData: IEvent_type): Promise<string> => {
    try {
        if (!event_typeId) {
            throw new Error("This Event Type Not Found");
        } else {
            const event_type = await Event_type.updateOne({ _id: event_typeId }, { $set: event_typeData }, { upsert: true })
            if (event_type.acknowledged) {
                return "Data Update successfully";
            } else {
                throw new Error("Not Update at this time");
            }
        }
    } catch (err) {
        throw err;
    }
}


export const removeEvent_typeFromDB = async (cityId: string): Promise<string> => {
    try {
        if (!cityId) {
            throw new Error("City Not Found");
        } else {
            const resData = await Event_type.deleteOne({ _id: cityId });
            if (resData.acknowledged) {
                return "This Event Type Remove From List"
            } else {
                throw resData;
            }
        }
    } catch (err) {
        throw err;
    }
}