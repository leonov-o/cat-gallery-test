import {ItemCard} from "./ItemCard.tsx";
import {ScrollToTop} from "./ScrollToTop.tsx";
import {ICat} from "../entities/cat/cat.types.ts";
import React from "react";

interface ICardGridProps {
    data: ICat[];
    isLoading: boolean;
}

export const CardGrid: React.FC<ICardGridProps> = ({data, isLoading}) => {
    return (
        <div className="mt-8 flex flex-wrap justify-center p-4">
            {
                isLoading
                    ? new Array(20).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className="mr-2 mt-2 h-64 w-1/3 animate-pulse rounded-lg bg-gray-100 md:w-1/4 lg:h-80 lg:w-1/5">
                        </div>
                    ))
                    : data?.map(item => <ItemCard key={item.id} item={item}/>)
            }
            <ScrollToTop/>
        </div>
    );
};
