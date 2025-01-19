import React, {RefObject, useEffect, useRef, useState} from 'react';

interface IOption {
    label: string;
    value: string | null;
}

interface IBreedFilterProps {
    options: IOption[];
    onSelect: (value: string) => void;
}

export const BreedFilter: React.FC<IBreedFilterProps> = ({options, onSelect}) => {
    const [filteredOptions, setFilteredOptions] = useState<IOption[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setFilteredOptions(options)
    }, [options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredOptions(
            options.filter((option) =>
                option.label.toLowerCase().includes(term)
            )
        );
    };

    const handleOptionClick = (option: IOption) => {
        onSelect(option.value || '');
        setSearchTerm(option.label);
        setIsOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="relative w-64" ref={dropdownRef as RefObject<HTMLDivElement>}>
                <input
                    type="text"
                    placeholder={"Search..."}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(true)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isOpen && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No options found</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

