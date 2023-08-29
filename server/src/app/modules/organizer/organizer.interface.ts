export interface IOrganizer {
    _id: string;
    owner_name: string;
    email: string;
    password: string;
    role: "organizer"
    organization_name: string;
    organization_title: string;
    organization_logo: string;
    organization_poster: string;
    // start_at: Date;
    description: string;
    event_list?: string[]; // event id
    followers?: string[]; // user id
    status: "active" | "reject" | "pending";
}