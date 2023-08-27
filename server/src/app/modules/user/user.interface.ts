export interface IUser {
    id: string;
    username: string;
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    role: "user" | "admin";
    gender: "male" | "female";
    contactNo?: string;
    address?: string;
    selected_city?: string;
    interest_list?: number[]; // event type id
    watch_list?: string[]; // event id
    favorite_list?: string[]; // organizer id
    ticket_list?: string[]; // ticket id
}


