import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from './ui/card';

type DataType = {
    key: string;
    value: string;
};

interface Props {
    name: string;
    dataList: DataType[];
    onSelectChange: (value: DataType) => void;
}

const SelectSearch = ({ name, dataList, onSelectChange }: Props) => {
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<DataType>(dataList[1]);

    const filteredPeople =
        query === ''
            ? dataList
            : dataList.filter((person) =>
                  person.key.toLowerCase().includes(query.toLowerCase()),
              );

    useEffect(() => {
        onSelectChange(selected);
    }, [selected]);

    return (
        <div className="relative z-50">
            <Combobox<DataType>
                value={selected}
                onChange={(value: DataType) => setSelected(value)}
                onClose={() => setQuery('')}
            >
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border-border py-1.5 pl-3 pr-8 text-sm/6 focus:border-border focus:ring-primary',
                        )}
                        displayValue={(person: DataType) => person?.key}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'z-50 max-h-[280px] w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    )}
                >
                    <Card>
                        {filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person.value}
                                value={person}
                                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6">{person.key}</div>
                            </ComboboxOption>
                        ))}
                    </Card>
                </ComboboxOptions>
            </Combobox>
        </div>
    );
};

export default SelectSearch;
