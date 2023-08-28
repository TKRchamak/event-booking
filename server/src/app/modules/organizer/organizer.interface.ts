export interface IOrganizer {
    id: string;
    owner_name: string;
    email: string;
    password: string;
    organization_name: string;
    organization_title: string;
    organization_logo: string;
    organization_poster: string;
    // start_at: Date;
    description: string;
    // country: string; // city id
    event_list?: string[]; // event id
    followers?: string[]; // user id
}