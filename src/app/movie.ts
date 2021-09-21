export interface Movie {
    id: number;
    name: string;
    length: number;
    shows: Array<Date>;
}

export interface Seance {
    id: number;
    name: string;
    length: number;
    begining: Date;
    ending: Date;
}

export interface ListOfSeances {
    seances: Array<Seance>;
}