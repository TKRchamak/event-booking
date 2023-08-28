interface ITicketType {
    id: string;
    description: string;
    price: string;
    discount: string;
}


export interface IEvent {
    id: string;
    name: string;
    title: string;
    organizer: string; // organizer id
    city: string;
    type: string;
    latitude: string;
    longitude: string;
    image: string;
    poster: string;
    description: string;
    general_info?: string;
    seat_quantity: number;
    time_slot?: string[];
    reviews?: string[];
    ticket_cat?: ITicketType[];
}