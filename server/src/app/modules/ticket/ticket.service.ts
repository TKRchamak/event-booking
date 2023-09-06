import { ITicket } from './ticket.interface';
import Ticket from './ticket.model';


export const createTicketToDB = async (ticketData: ITicket): Promise<ITicket> => {
    try {
        const ticket = new Ticket(ticketData);
        const resData = await ticket.save();
        const finalData = await resData.populate('event');
        return finalData;
    } catch (err) {
        throw err;
    }
}

export const getSingleTicket = async (ticketId: string): Promise<any> => {
    try {
        // ======================= with populate =======================
        const result = Ticket.find({ "_id": ticketId })
            .populate('user') // Populate the 'user_id' field with data from the "User" collection
            .populate('event') // Populate the 'event_id' field with data from the "Event" collection
            .exec();

        // ======================= with aggregate lookup  =======================
        // const result = await Ticket.aggregate([
        //     {
        //         $match: {
        //             _id: new mongoose.Types.ObjectId(ticketId)
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'user_id',
        //             foreignField: '_id',
        //             as: 'userData'
        //         }
        //     },
        //     {
        //         $unwind: '$userData', // Unwind the "category" array created by the first lookup
        //     },
        //     {
        //         $lookup: {
        //             from: 'events', // The name of another collection for the second lookup
        //             localField: 'event_id', // Field from the "category" data from the first lookup
        //             foreignField: '_id', // Field from the "anotherCollection"
        //             as: 'eventData', // Alias for the resulting data from the second lookup
        //         },
        //     },
        //     {
        //         $unwind: '$userData', // Unwind the "category" array created by the first lookup
        //     },
        // ])
        // .exec();
        return result;
    } catch (err) {
        throw err;
    }
}

export const getUserTicketFromDB = async (userId: string): Promise<any> => {
    try {
        const result = Ticket.find({ "user": userId })
            // .populate('user') // Populate the 'user_id' field with data from the "User" collection
            .populate('event') // Populate the 'event_id' field with data from the "Event" collection
            .exec();
        return result;

    } catch (err) {
        throw err;
    }
}

export const getEventTicketFromDB = async (eventId: string): Promise<any> => {
    try {
        const result = Ticket.find({ "event": eventId })
            .populate('user') // Populate the 'user_id' field with data from the "User" collection
            // .populate('event') // Populate the 'event_id' field with data from the "Event" collection
            .exec();
        return result;

    } catch (err) {
        throw err;
    }
}

export const updateTicketFromDB = async (ticket_id: string): Promise<string> => {
    try {
        const resData = await Ticket.findOneAndUpdate(
            { _id: ticket_id },
            {
                status: "done"
            },
            {
                new: true, // Return the updated document, if false, it returns the original document
                upsert: false, // If true, create a new document if no match is found
                rawResult: true, // Set rawResult to true to get the raw MongoDB driver result
                runValidators: true, // Run validation defined in the schema
            }
        );

        if (resData.ok) {
            return "Ticket is Used"
        } else {
            throw resData;
        }
    } catch (err) {
        throw err;
    }
}