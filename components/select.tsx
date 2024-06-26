"use client";

import { useMemo } from "react";
import {SingleValue} from "react-select";
import CreateableSelect from "react-select/creatable";

type Props = {
    onChange: (value: string) => void;
    onCreate: (value: string) => void;
    options?:{label:string ; value: string}[];
    value?: string | null | undefined;
    disabled?:boolean;
    placeholder?:string;
}


export const Select = ({
    value,
    onChange,
    options = [],
    disabled,
    placeholder,
    onCreate,

}:Props) => {
    const onSelect = (
        option: SingleValue<{ label: string; value: string }>
    ) => {
       onChange(option?.value ?? "");
    };
    const formatedValue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [value, options]);

    return (
        <CreateableSelect
            className="text-sm h-10"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover":{
                        borderColor: "#e2e8f0"
                    }
                })
            }}
            isDisabled={disabled}
            placeholder={placeholder}
            value={formatedValue}
            options={options}
            onChange={onSelect}
            onCreateOption={onCreate}
        />
    );
}
