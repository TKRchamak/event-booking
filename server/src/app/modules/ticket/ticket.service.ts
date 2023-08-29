import { v4 as uuidv4 } from 'uuid';
import { ITicket } from './ticket.interface';
import Ticket from './ticket.model';
import { addTicketInDB, removeTicketInDB } from '../user/user.service';


export const createTicketToDB = async (ticketData: ITicket): Promise<ITicket> => {
    try {
        const ticket = new Ticket(ticketData);
        await ticket.save();
        await addTicketInDB(ticket.user_id, ticket._id);
        return ticket;
    } catch (err) {
        throw err;
    }
}


export const getTicketFromDB = async (ticketData: ITicket): Promise<ITicket> => {
    try {
        const ticket = new Ticket(ticketData);
        await ticket.save();
        await addTicketInDB(ticket.user_id, ticket._id as any);
        return ticket;
    } catch (err) {
        throw err;
    }
}

// export const removeTicketFromDB = async (ticket_id: string): Promise<string> => {
//     try {
//         const resData = await Ticket.findOne({ _id: ticket_id });
//         const resData = await Ticket.deleteOne({ _id: ticket_id });
//         await removeTicketInDB()
//         if (resData.acknowledged) {
//             return "City Remove From List"
//         } else {
//             throw resData;
//         }
//     } catch (err) {
//         throw err;
//     }
// }