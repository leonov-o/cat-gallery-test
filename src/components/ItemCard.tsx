import {HeartFilledIcon, HeartIcon} from "@radix-ui/react-icons";
import {useUserStore} from "../store";
import {DetailsModal} from "./DetailsModal.tsx";
import React, {useState} from "react";
import {ICat} from "../entities/cat/cat.types.ts";

interface IItemCardProps {
    item: ICat
}

export const ItemCard: React.FC<IItemCardProps> = ({item}) => {
    const {favourites, toggleFavourite} = useUserStore();
    const isFavourite = favourites.some(({id}) => id === item.id);

    const { url, breeds = [] } = item;
    const breedName = breeds.length > 0 ? breeds[0].name : "Unknown Breed";

    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }


    return (
        <>
            <div className="mr-2 mt-2 w-1/3 rounded-lg border border-gray-300 p-2 shadow-md md:w-1/4 lg:w-1/5 lg:p-4">
                <div>
                    <div className="flex items-center justify-between">
                        <div className="p-2 text-sm font-medium text-gray-800 lg:text-lg">
                            {breedName}
                        </div>
                        <div className="rounded p-1 transition hover:bg-gray-100 hover:text-red-500"
                             onClick={() => toggleFavourite(item)}>
                            {
                                isFavourite
                                    ? <HeartFilledIcon className="size-5 text-red-500"/>
                                    : <HeartIcon className="size-5"/>
                            }
                        </div>
                    </div>
                    <div className="cursor-pointer" onClick={handleOpenModal}>
                        <img
                            src={url}
                            alt={breedName}
                            className="h-48 w-full rounded-lg object-cover transition duration-300 hover:scale-95 lg:h-64"
                        />
                    </div>
                </div>
            </div>
            <DetailsModal item={item} isOpen={isOpenModal} onClose={handleCloseModal}/>
        </>
    );
};
