import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ICat, ICatBreed} from "../entities/cat/cat.types.ts";

interface IUserState {
    breeds: ICatBreed[];
    favourites: ICat[];
    filters: {
        breed: string | null;
    };
    setBreeds: (breeds: ICatBreed[]) => void;
    setFilters: (field: string, value: string) => void;
    toggleFavourite: (item: ICat) => void;
}

export const useUserStore = create<IUserState>()(immer(persist((set) => ({
    breeds: [],
    favourites: [],
    filters: {
        breed: null
    },

    setBreeds: (breeds: ICatBreed[]) => {
        set((state) => {
            state.breeds = breeds;
        });
    },

    setFilters: (field, value) => {
        set((state) => {
            state.filters[field as keyof IUserState['filters']] = value;
        });
    },

    toggleFavourite: (item: ICat) => {
        set((state) => {
            if (state.favourites.some(({id}) => id === item.id)) {
                state.favourites = state.favourites.filter(({id}) => id !== item.id);
            } else {
                state.favourites.push(item);
            }
        });
    }



}), {
    name: 'catgallery-storage',
    partialize: (state) => ({
        favourites: state.favourites,
    })
})));
