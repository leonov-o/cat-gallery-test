export interface ICatBreed {
    id: string;
    name: string;
    temperament: string;
    description: string;
}

export interface ICat {
    id: string;
    url: string;
    breeds: ICatBreed[];
}
