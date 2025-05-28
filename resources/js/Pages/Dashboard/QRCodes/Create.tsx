import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Dashboard from '@/layouts/dashboard/layout';
import { PageProps, ProjectProps } from '@/types';
import { useForm } from '@inertiajs/react';
import {
    FormEventHandler,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import { QRCode } from 'react-qrcode-logo';
import ColorInput from './Partials/ColorInput';
import LogoUpload from './Partials/LogoUpload';
import QRCodeDownloader from './Partials/QRCodeDownloader';
import QRCorner from './Partials/QRCorner';

interface Props extends PageProps {
    projects: ProjectProps[];
}

const Create = (props: Props) => {
    const { auth, projects, translate } = props;
    const { app, input } = translate;

    const [qrState, setQrState] = useState<{ [key: string]: any }>({
        size: 300,
        quietZone: 20,
        value: '',
        ecLevel: 'M',
        bgColor: '#ffffff',
        fgColor: '#000000',
        qrStyle: 'squares',
        logoImage: '',
        logoWidth: 80,
        logoHeight: 80,
        logoOpacity: 1,
        enableCORS: '',
        logoPadding: 0,
        logoPaddingStyle: 'square',
        removeQrCodeBehindLogo: false,
        eyeradius_0_outer_0: 0,
        eyeradius_0_outer_1: 0,
        eyeradius_0_outer_2: 0,
        eyeradius_0_outer_3: 0,
        eyeradius_0_inner_0: 0,
        eyeradius_0_inner_1: 0,
        eyeradius_0_inner_2: 0,
        eyeradius_0_inner_3: 0,
        eyeradius_1_outer_0: 0,
        eyeradius_1_outer_1: 0,
        eyeradius_1_outer_2: 0,
        eyeradius_1_outer_3: 0,
        eyeradius_1_inner_0: 0,
        eyeradius_1_inner_1: 0,
        eyeradius_1_inner_2: 0,
        eyeradius_1_inner_3: 0,
        eyeradius_2_outer_0: 0,
        eyeradius_2_outer_1: 0,
        eyeradius_2_outer_2: 0,
        eyeradius_2_outer_3: 0,
        eyeradius_2_inner_0: 0,
        eyeradius_2_inner_1: 0,
        eyeradius_2_inner_2: 0,
        eyeradius_2_inner_3: 0,
        eyecolor_0_outer: '#000000',
        eyecolor_0_inner: '#000000',
        eyecolor_1_outer: '#000000',
        eyecolor_1_inner: '#000000',
        eyecolor_2_outer: '#000000',
        eyecolor_2_inner: '#000000',
    });

    const handleChange = ({ target }: any) => {
        if (target.type === 'checkbox') {
            setQrState((prevState) => ({
                ...prevState,
                [target.name]: target.checked,
            }));
        } else {
            setQrState((prevState) => ({
                ...prevState,
                [target.name]: target.value,
            }));
        }
    };

    const { data, setData, post, errors, clearErrors } = useForm({
        content: '',
        img_data: '',
        qr_type: 'project_qr',
        user_id: auth.user.data.id,
        project_id: projects[0] ? projects[0].id : '',
    });

    const qrCodeRef: any = useRef(null);
    const getImageBlobData = () => {
        return qrCodeRef.current.canvasRef.current.toDataURL();
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        const qrCode = getImageBlobData();
        setData('img_data', qrCode);
    };

    useEffect(() => {
        const { content, img_data } = data;
        if (content && img_data) {
            clearErrors();

            post(route('qrcodes.store'));
        }
    }, [data]);

    const project_list = projects.map((item) => {
        return { key: item.project_name, value: item.id };
    });

    const ecLabels = [
        { key: 'L', value: 'L' },
        { key: 'M', value: 'M' },
        { key: 'Q', value: 'Q' },
        { key: 'H', value: 'H' },
    ];

    return (
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
            <Card className="p-4 lg:col-span-5">
                <form onSubmit={submit}>
                    <div>
                        <Label>Select Project</Label>

                        <Select
                            value={data.project_id as string}
                            onValueChange={(value) =>
                                setData('project_id', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Project" />
                            </SelectTrigger>
                            <SelectContent>
                                {project_list.map(({ key, value }) => (
                                    <SelectItem
                                        key={key}
                                        value={value as string}
                                    >
                                        {key}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="py-4">
                        <Label>{input.qr_content}</Label>

                        <Textarea
                            rows={3}
                            cols={10}
                            name="value"
                            value={qrState.value}
                            onChange={(e) => {
                                handleChange(e);
                                setData('content', e.target.value);
                            }}
                            placeholder={input.qr_content_placeholder}
                            required
                        />

                        <InputError message={errors.content} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>{input.qr_size}</Label>

                            <Input
                                min={100}
                                max={500}
                                name="size"
                                type="number"
                                value={qrState.size}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>{input.qr_padding}</Label>

                            <Input
                                min={0}
                                max={80}
                                type="number"
                                name="quietZone"
                                value={qrState.quietZone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>{input.ec_level}</Label>

                            <Select
                                name="ecLevel"
                                value={qrState.ecLevel}
                                onValueChange={(value) =>
                                    setQrState((prev: any) => ({
                                        ...prev,
                                        ecLevel: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select EC Label" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ecLabels.map(({ key, value }) => (
                                        <SelectItem
                                            key={key}
                                            value={value as string}
                                        >
                                            {key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>{input.qr_style}</Label>

                            <Select
                                name="qrStyle"
                                value={qrState.qrStyle}
                                onValueChange={(value) =>
                                    setQrState((prev: any) => ({
                                        ...prev,
                                        qrStyle: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select QrStyle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="squares">
                                        Squares
                                    </SelectItem>
                                    <SelectItem value="dots">Dots</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <ColorInput
                            name="bgColor"
                            label={input.bg_color}
                            value={qrState.bgColor}
                            onChange={handleChange}
                        />

                        <ColorInput
                            name="fgColor"
                            label={input.qr_color}
                            value={qrState.fgColor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="my-7">
                        <p className="mb-2 font-medium text-gray-900">
                            {app.corner_radius}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.top_left}
                                </p>
                                <QRCorner
                                    state={qrState}
                                    name="0_outer"
                                    title={input.outside}
                                    onChange={handleChange}
                                />
                                <QRCorner
                                    state={qrState}
                                    name="0_inner"
                                    title={input.inside}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.top_right}
                                </p>
                                <QRCorner
                                    state={qrState}
                                    name="1_outer"
                                    title={input.outside}
                                    onChange={handleChange}
                                />
                                <QRCorner
                                    state={qrState}
                                    name="1_inner"
                                    title={input.inside}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.bottom_left}
                                </p>
                                <QRCorner
                                    state={qrState}
                                    name="2_outer"
                                    title={input.outside}
                                    onChange={handleChange}
                                />
                                <QRCorner
                                    state={qrState}
                                    name="2_inner"
                                    title={input.inside}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 font-medium text-gray-900">
                            {app.corner_color}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.top_left}
                                </p>
                                <ColorInput
                                    label={input.outside}
                                    name="eyecolor_0_outer"
                                    value={qrState.eyecolor_0_outer}
                                    onChange={handleChange}
                                />
                                <ColorInput
                                    label={input.inside}
                                    name="eyecolor_0_inner"
                                    value={qrState.eyecolor_0_inner}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.top_right}
                                </p>
                                <ColorInput
                                    label={input.outside}
                                    name="eyecolor_1_outer"
                                    value={qrState.eyecolor_1_outer}
                                    onChange={handleChange}
                                />
                                <ColorInput
                                    label={input.inside}
                                    name="eyecolor_1_inner"
                                    value={qrState.eyecolor_1_inner}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className="my-2 text-sm font-medium text-gray-700">
                                    {app.bottom_left}
                                </p>
                                <ColorInput
                                    label={input.outside}
                                    name="eyecolor_2_outer"
                                    value={qrState.eyecolor_2_outer}
                                    onChange={handleChange}
                                />
                                <ColorInput
                                    label={input.inside}
                                    name="eyecolor_2_inner"
                                    value={qrState.eyecolor_2_inner}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-7">
                        <p className="mb-2 font-medium text-gray-900">
                            {app.qr_logo}
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <LogoUpload
                                name="logoImage"
                                handleChange={handleChange}
                                className="col-span-3"
                            />

                            <div>
                                <Label>{input.style}</Label>

                                <Select
                                    name="logoPaddingStyle"
                                    value={qrState.logoPaddingStyle}
                                    onValueChange={(value) =>
                                        setQrState((prev: any) => ({
                                            ...prev,
                                            logoPaddingStyle: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select logo padding style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="square">
                                            Square
                                        </SelectItem>
                                        <SelectItem value="circle">
                                            Circle
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>{input.opacity}</Label>

                                <Input
                                    min={0}
                                    max={1}
                                    type="number"
                                    step="0.1"
                                    name="logoOpacity"
                                    value={qrState.logoOpacity}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>{input.padding}</Label>

                                <Input
                                    min={0}
                                    max={20}
                                    type="number"
                                    name="logoPadding"
                                    value={qrState.logoPadding}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>{input.width}</Label>

                                <Input
                                    min={40}
                                    max={400}
                                    type="number"
                                    name="logoWidth"
                                    value={qrState.logoWidth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label>{input.height}</Label>

                                <Input
                                    min={40}
                                    max={400}
                                    type="number"
                                    name="logoHeight"
                                    value={qrState.logoHeight}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-3 flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="removeQrCodeBehindLogo"
                                    checked={qrState.removeQrCodeBehindLogo}
                                    className="mr-2 h-3.5 w-3.5 rounded focus:outline-0 focus:ring-white"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="remember"
                                    className="whitespace-nowrap"
                                >
                                    {input.remove_qrcode_behind_logo}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        <Button
                            type="submit"
                            className="w-full rounded-md px-1 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                        >
                            {app.save_qrcode}
                        </Button>

                        <QRCodeDownloader
                            buttonText={app.download}
                            imageBlogData={getImageBlobData}
                        />
                    </div>
                </form>
            </Card>

            <div className="overflow-hidden lg:col-span-7">
                <div className="lg:fixed">
                    <QRCode
                        ref={qrCodeRef}
                        logoOnLoad={() => console.log('logo loaded')}
                        {...{
                            ...qrState,
                            eyeRadius: [
                                // build eyeRadius manually
                                {
                                    outer: [
                                        qrState.eyeradius_0_outer_0,
                                        qrState.eyeradius_0_outer_1,
                                        qrState.eyeradius_0_outer_2,
                                        qrState.eyeradius_0_outer_3,
                                    ],
                                    inner: [
                                        qrState.eyeradius_0_inner_0,
                                        qrState.eyeradius_0_inner_1,
                                        qrState.eyeradius_0_inner_2,
                                        qrState.eyeradius_0_inner_3,
                                    ],
                                },
                                {
                                    outer: [
                                        qrState.eyeradius_1_outer_0,
                                        qrState.eyeradius_1_outer_1,
                                        qrState.eyeradius_1_outer_2,
                                        qrState.eyeradius_1_outer_3,
                                    ],
                                    inner: [
                                        qrState.eyeradius_1_inner_0,
                                        qrState.eyeradius_1_inner_1,
                                        qrState.eyeradius_1_inner_2,
                                        qrState.eyeradius_1_inner_3,
                                    ],
                                },
                                {
                                    outer: [
                                        qrState.eyeradius_2_outer_0,
                                        qrState.eyeradius_2_outer_1,
                                        qrState.eyeradius_2_outer_2,
                                        qrState.eyeradius_2_outer_3,
                                    ],
                                    inner: [
                                        qrState.eyeradius_2_inner_0,
                                        qrState.eyeradius_2_inner_1,
                                        qrState.eyeradius_2_inner_2,
                                        qrState.eyeradius_2_inner_3,
                                    ],
                                },
                            ],
                            eyeColor: [
                                // build eyeColor manually
                                {
                                    outer:
                                        qrState.eyecolor_0_outer ??
                                        qrState.fgColor,
                                    inner:
                                        qrState.eyecolor_0_inner ??
                                        qrState.fgColor,
                                },
                                {
                                    outer:
                                        qrState.eyecolor_1_outer ??
                                        qrState.fgColor,
                                    inner:
                                        qrState.eyecolor_1_inner ??
                                        qrState.fgColor,
                                },
                                {
                                    outer:
                                        qrState.eyecolor_2_outer ??
                                        qrState.fgColor,
                                    inner:
                                        qrState.eyecolor_2_inner ??
                                        qrState.fgColor,
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

Create.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Create;
