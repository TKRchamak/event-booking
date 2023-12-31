export interface ITicketType {
    description: string;
    price: string;
    discount: string;
}

export interface IReview {
    // created_at: Date;
    rating: string;
    review_description: string;
    reviewer_name: string;
    reviewer_img_url: string;
}


export interface IEvent {
    _id: string;
    name: string;
    title: string;
    organizer: string; // organizer id
    city: string;
    type: string;
    location: any;
    image: string;
    poster: string;
    description: string;
    seat_quantity: string;
    general_info?: string;
    time_slot?: any[];
    reviews?: IReview[];
    ticket_cat?: any[];
    ticket_price: number;
    duration: number;
}

// {
//     "id": "slgjslfgjlsjfdgl",
//     "name": "slgjslfgjlsjfdgl",
//     "title": "slgjslfgjlsjfdgl",
//     "organizer": "slgjslfgjlsjfdgl",
//     "city": "slgjslfgjlsjfdgl",
//     "type": "slgjslfgjlsjfdgl",
//     "latitude": "slgjslfgjlsjfdgl",
//     "longitude": "slgjslfgjlsjfdgl",
//     "image": "slgjslfgjlsjfdgl",
//     "poster": "slgjslfgjlsjfdgl",
//     "description": "slgjslfgjlsjfdgl",
//     "general_info"?: "slgjslfgjlsjfdgl",
//     "seat_quantity": "number",
//     "time_slot": [],
//     "reviews": [],
//     "ticket_cat": [],
// }