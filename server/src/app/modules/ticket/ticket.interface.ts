export interface ITicket {
    _id: string;
    description: string;
    discount: string;
    price: string;
    user_id: string;
    event_id: string;
    ticket_date: string;
    time_slot: string;
    // status: "active" | "done";
}