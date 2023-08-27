export interface IOrganizer {
    id: string;
    owner_name: string;
    email: string;
    password: string;
    organization_name: string;
    organization_title: string;
    organization_logo: string;
    organization_poster: string;
    event_list?: string[]; // event id
    start_at: Date;
    description: string;
    followers?: string[]; // user id
    city: string;
}