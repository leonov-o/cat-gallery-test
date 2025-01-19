import {CatGallery} from "../components/CatGallery.tsx";
import {BreedFilter} from "../components/BreedFilter.tsx";
import {useUserStore} from "../store";

export const HomePage = () => {
    const {breeds, setFilters} = useUserStore();

    const options = breeds && [
        {label: 'All breeds', value: null},
        ...breeds.map((breed) => ({
            label: breed.name,
            value: breed.id
        }))
    ];

    return (
        <div>
            <BreedFilter options={options || []} onSelect={(value) => setFilters('breed', value)}/>
            <CatGallery/>
        </div>
    );
};
