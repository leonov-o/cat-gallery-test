import React from 'react';
import {useUserStore} from "../store";
import {CardGrid} from "../components/CardGrid.tsx";

export const FavouritesPage = () => {
    const {favourites} = useUserStore();

    return (
        <div>
            {
                favourites.length === 0
                    ? <div className="mt-8 flex justify-center text-3xl font-medium">No favourites yet</div>
                    : <CardGrid data={favourites} isLoading={false}/>
            }
        </div>
    );
};
