import {Cross1Icon} from "@radix-ui/react-icons";
import {ICat} from "../entities/cat/cat.types.ts";
import React from "react";


interface IDetailsModalProps {
    item: ICat;
    isOpen: boolean;
    onClose: () => void;
}

export const DetailsModal: React.FC<IDetailsModalProps> = ({item, isOpen, onClose}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed left-0 top-0 flex size-full items-center justify-center">
            <div className="absolute size-full bg-gray-900 opacity-50"/>
            <div className="z-50 mx-auto w-3/4 overflow-y-auto rounded bg-white shadow-lg lg:w-1/2">
                <div className="relative">
                    <div
                        className="absolute right-0 top-0 z-50 mr-4 mt-4 cursor-pointer"
                        onClick={onClose}
                    >
                        <Cross1Icon className="size-6 text-orange-400"/>

                    </div>
                    <div className="md:h-[60vh]">
                        <img src={item.url} alt={item.breeds[0].name}
                             className="size-full object-cover"/>
                    </div>
                    <div className="p-4">
                        <h3 className="mb-4 font-bold lg:text-xl">{item.breeds[0].name}</h3>
                        <p className="mb-2 text-justify text-sm md:text-base">Temperament: {item.breeds[0].temperament}</p>
                        <p className="mb-2 text-justify text-sm md:text-base">Description: {item.breeds[0].description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
