// import { v4 as uuidv4 } from 'uuid';
import { addEventInOrganizerDB } from '../organizer/organizer.service';
import { IEvent } from './event.interface';
import Event from './event.model';

// add event in db
export const addEventToDB = async (eventData: IEvent): Promise<IEvent> => {
    try {
        console.log(eventData);
        const event = new Event(eventData);
        await event.save();
        await addEventInOrganizerDB(event.organizer, event._id);
        return event;
    } catch (err) {
        throw err;
    }
}

export const addReviewToEventToDB = async (eventId: string, reviewData: IEvent): Promise<string> => {
    try {
        const event = await Event.updateOne({ _id: eventId }, { $push: { reviews: reviewData } }, { upsert: true })
        if (event.acknowledged) {
            return "Review Added successfully";
        } else {
            throw new Error("Not Update at this time");
        }
    } catch (err) {
        throw err;
    }
}

// all event or event by id
export const getEventFromDB = async (eventId: string = '000'): Promise<any> => {
    try {
        if (eventId === "000") {
            const event = await Event.find();
            return event;
        } else {
            const event = await Event.findOne({ _id: eventId });
            return event;
        }
    } catch (err) {
        throw err;
    }
}

//organizer event List
export const getEventListByIdList = async (userId: string): Promise<IEvent[]> => {
    try {
        const eventList = await Event.find({ organizer: userId });
        return eventList;
    } catch (err) {
        throw err;
    }
}

// edit event_type data by id
export const updateEventFromDB = async (eventId: string, eventData: IEvent): Promise<string> => {
    try {
        if (!eventId) {
            throw new Error("This Event Not Found");
        } else {
            const event = await Event.updateOne({ _id: eventId }, { $set: eventData }, { upsert: true })
            if (event.acknowledged) {
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
export const removeEventFromDB = async (cityId: string): Promise<string> => {
    try {
        if (!cityId) {
            throw new Error("City Not Found");
        } else {
            const resData = await Event.deleteOne({ _id: cityId });
            if (resData.acknowledged) {
                return "This Event Remove From List"
            } else {
                throw resData;
            }
        }
    } catch (err) {
        throw err;
    }
}