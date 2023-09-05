import mongoose from 'mongoose';
import { ITicket } from './ticket.interface';
import Ticket from './ticket.model';


export const createTicketToDB = async (ticketData: ITicket): Promise<ITicket> => {
    try {
        const ticket = new Ticket(ticketData);
        await ticket.save();
        return await getSingleTicket(ticket?._id)
    } catch (err) {
        throw err;
    }
}

export const getSingleTicket = async (ticketId: string): Promise<any> => {
    console.log(ticketId);
    try {
        // const result = Ticket.find({ "_id": ticketId });
        const result = await Ticket.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(ticketId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            // {
            //     $unwind: '$userData', // Unwind the "category" array created by the first lookup
            // },
            // {
            //     $lookup: {
            //         from: 'Event', // The name of another collection for the second lookup
            //         localField: 'event_id', // Field from the "category" data from the first lookup
            //         foreignField: '_id', // Field from the "anotherCollection"
            //         as: 'eventData', // Alias for the resulting data from the second lookup
            //     },
            // },
        ])
        // .exec();
        return result;
    } catch (err) {
        throw err;
    }
}



export const getUserTicketFromDB = async (): Promise<any> => {
    try {
        // const resData = Ticket.find().populate("User")
        // return resData;

        const result = await Ticket
            .aggregate(
                [
                    {
                        $match: {
                            // buyer_id:userId
                        }
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'userData'
                        }
                    },
                    {
                        $unwind: '$category', // Unwind the "category" array created by the first lookup
                    },
                    {
                        $lookup: {
                            from: 'Event', // The name of another collection for the second lookup
                            localField: 'event_id', // Field from the "category" data from the first lookup
                            foreignField: '_id', // Field from the "anotherCollection"
                            as: 'eventData', // Alias for the resulting data from the second lookup
                        },
                    },
                ]
            )
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