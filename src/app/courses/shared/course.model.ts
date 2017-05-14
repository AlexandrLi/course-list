export interface Course {
    id: number;
    title: string;
    description: string;
    topRated: boolean;
    date: Date;

    authors: Array<{
        id: number,
        firstName: string,
        lastName: string
    }>;
    duration: number;
}
