interface Props {
    name: string;
    label?: string;
    value?: string;
    onChange?: (e: any) => void;
    className?: string;
}

const ColorInput = (props: Props) => {
    const { name, label, value, onChange, className } = props;

    return (
        <div>
            {label && (
                <small className="mb-1 flex w-full items-center whitespace-nowrap font-medium text-gray-500">
                    {label}
                </small>
            )}
            <input
                type="color"
                name={name}
                value={value}
                onChange={onChange}
                className={`h-11 w-full p-0 ${className}`}
            />
        </div>
    );
};

export default ColorInput;
