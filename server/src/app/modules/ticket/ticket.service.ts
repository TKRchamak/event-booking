import { ITicket } from './ticket.interface';
import Ticket from './ticket.model';


export const createTicketToDB = async (ticketData: ITicket): Promise<ITicket> => {
    try {
        const ticket = new Ticket(ticketData);
        return await ticket.save();
    } catch (err) {
        throw err;
    }
}


export const getUserTicketFromDB = async (userId: string): Promise<any> => {
    try {
        const resData = Ticket.find().populate("User")
        return resData;


        // if (resData) {
        //     return resData;
        // } else {
        //     throw resData;
        // }


        // const ticket = new Ticket(ticketData);
        // await ticket.save();
        // return ticket;
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