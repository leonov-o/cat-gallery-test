import {ICat, ICatBreed} from "./cat.types.ts";

const API_KEY = import.meta.env.VITE_API_KEY;

class CatService {
    url = 'https://api.thecatapi.com/v1';

    async getBreeds(): Promise<ICatBreed[]> {
        const response = await fetch(`${this.url}/breeds`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        return await response.json();
    }

    async getCats(page: number = 0, limit: number = 20, breed?: string | null): Promise<ICat[]> {
        const response = await fetch(`${this.url}/images/search?has_breeds=true&page=${page}&limit=${limit}${breed ? `&breed_ids=${breed}` : ''}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        return await response.json();
    }
}

export const catService = new CatService();
