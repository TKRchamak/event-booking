export interface ITicket {
    _id: string;
    user_id: object;
    event_id: string;
    price: number;
    ticket_date: string;
    time_slot: string;
    quantity: number;
    status: "active" | "done";
    discount?: number;
    description?: string;
}