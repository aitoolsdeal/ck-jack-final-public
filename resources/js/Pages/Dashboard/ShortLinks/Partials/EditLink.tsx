// import { LinkProps, PageProps } from "@/types";
// import { useForm, usePage } from "@inertiajs/react";
// import { FormEventHandler, useState } from "react";

// interface Props {
//    link: LinkProps;
// }

// const EditLink = (props: Props) => {
//    const page = usePage<PageProps>();
//    const { app, input } = page.props.translate;
//    const { link } = props;
//    const [open, setOpen] = useState(false);

//    const handleOpen = () => {
//       setOpen((prev) => !prev);
//    };

//    const { put, data, setData, errors } = useForm({
//       link_name: link.link_name,
//       link_type: "shortlink",
//       external_url: link.external_url || "",
//    });

//    const onHandleChange = (event: any) => {
//       setData(event.target.name, event.target.value);
//    };

//    const submit: FormEventHandler = async (e) => {
//       e.preventDefault();

//       put(route("short-links.update", { id: link.id }), {
//          onSuccess() {
//             handleOpen();
//          },
//       });
//    };

//    return (
//       <>
//          <IconButton
//             variant="text"
//             color="white"
//             onClick={handleOpen}
//             className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 active:bg-blue-50 text-blue-500"
//          >
//             <EditPen className="h-4 w-4" />
//          </IconButton>

//          <Dialog
//             size="sm"
//             open={open}
//             handler={handleOpen}
//             className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
//          >
//             <div className="flex items-center justify-between mb-6">
//                <p className="text-xl font-medium">{app.update_link}</p>
//                <span
//                   onClick={handleOpen}
//                   className="text-3xl leading-none cursor-pointer"
//                >
//                   ×
//                </span>
//             </div>

//             <form onSubmit={submit}>
//                <div className="mb-4">
//                   <Input
//                      type="text"
//                      name="link_name"
//                      label={input.short_link_name}
//                      value={data.link_name}
//                      error={errors.link_name}
//                      onChange={onHandleChange}
//                      placeholder={input.short_link_name_placeholder}
//                      fullWidth
//                      required
//                   />
//                </div>
//                <div className="mb-4">
//                   <Input
//                      type="url"
//                      name="external_url"
//                      label={input.external_url}
//                      value={data.external_url}
//                      error={errors.external_url}
//                      onChange={onHandleChange}
//                      placeholder={input.external_url_placeholder}
//                      fullWidth
//                      required
//                   />
//                </div>

//                <div className="flex justify-end mt-4">
//                   <Button
//                      color="red"
//                      variant="text"
//                      onClick={handleOpen}
//                      className="py-2 font-medium capitalize text-base mr-2"
//                   >
//                      <span>{app.cancel}</span>
//                   </Button>
//                   <Button
//                      type="submit"
//                      color="blue"
//                      variant="gradient"
//                      className="py-2 font-medium capitalize text-base"
//                   >
//                      <span>{app.save_changes}</span>
//                   </Button>
//                </div>
//             </form>
//          </Dialog>
//       </>
//    );
// };

// export default EditLink;
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkProps, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    link: LinkProps;
}

const EditLink = (props: Props) => {
    const page = usePage<PageProps>();
    const { app, input } = page.props.translate;
    const { link } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const { put, data, setData, errors } = useForm({
        link_name: link.link_name,
        link_type: 'shortlink',
        external_url: link.external_url || '',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        put(route('short-links.update', { id: link.id }), {
            onSuccess() {
                handleOpen();
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpen}>
                <DialogTrigger asChild>
                    <Button
                        size="icon"
                        className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50 active:bg-blue-50"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xl font-medium">
                                {app.update_link}
                            </p>
                        </div>
                        <DialogTitle>
                            <p className="text-xl font-medium">
                                {app.update_link}
                            </p>
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <Label>{input.short_link_name}</Label>

                            <Input
                                type="text"
                                name="link_name"
                                value={data.link_name}
                                onChange={onHandleChange}
                                placeholder={input.short_link_name_placeholder}
                                required
                            />

                            <InputError message={errors.link_name} />
                        </div>
                        <div className="mb-4">
                            <Label>{input.external_url}</Label>

                            <Input
                                type="url"
                                name="external_url"
                                value={data.external_url}
                                onChange={onHandleChange}
                                placeholder={input.external_url_placeholder}
                                required
                            />

                            <InputError message={errors.external_url} />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={handleOpen}
                                className="mr-2 py-2 text-base font-medium capitalize"
                            >
                                <span>{app.cancel}</span>
                            </Button>
                            <Button
                                type="submit"
                                className="py-2 text-base font-medium capitalize"
                            >
                                <span>{app.save_changes}</span>
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditLink;
