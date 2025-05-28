import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

interface Props {
    name: string;
    value: any;
    error: string | undefined;
    checkHandler: (value: boolean) => void;
    onChange: (event: any) => void;
}

const UnlimitedCheckBox = (props: Props) => {
    const page = usePage<PageProps>();
    const { input } = page.props.translate;

    const { name, value, error, checkHandler, onChange } = props;

    return (
        <div className="relative">
            <div className="absolute right-0 top-0 flex items-center">
                <label className="mr-2 flex items-center whitespace-nowrap text-sm font-medium text-gray-500">
                    Unlimited
                </label>

                <Checkbox
                    name={name}
                    className="h-3.5 w-3.5 rounded hover:before:opacity-0"
                    onCheckedChange={(value: boolean) => {
                        checkHandler(value);
                    }}
                />
            </div>

            <div>
                <Label>{input.shortlink_create}</Label>

                <Input
                    required={value === null ? false : true}
                    name={name}
                    value={value === null ? '' : value}
                    placeholder={
                        value === null
                            ? 'Unlimited'
                            : input.shortlink_create_placeholder
                    }
                    onChange={onChange}
                    type={value === null ? 'text' : 'number'}
                    disabled={value === null ? true : false}
                />

                <InputError message={error} />
            </div>
        </div>
    );
};

export default UnlimitedCheckBox;
