export interface ITicket {
    _id: string;
    user_id: string;
    event_id: string;
    price: number;
    ticket_date: Date;
    time_slot: object;
    quantity: number;
    status: "active" | "done";
    discount?: number;
    description?: string;
}