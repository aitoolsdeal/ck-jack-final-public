import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Dashboard from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { DollarSignIcon } from 'lucide-react';
import { FormEventHandler, ReactNode } from 'react';
import UnlimitedCheckBox from './Partials/UnlimitedCheckBox';

interface Props extends PageProps {
    pricing_plan?: string;
    feature?: PricingPlanFeature;
}

const Feature = ({ feature, translate, pricing_plan }: Props) => {
    const { app, input } = translate;

    const { data, setData, post, put, errors, clearErrors } = useForm({
        biolinks: feature ? feature.biolinks : 0,
        biolink_blocks: feature ? feature.biolink_blocks : 1,
        shortlinks: feature ? feature.shortlinks : 0,
        projects: feature ? feature.projects : 0,
        qrcodes: feature ? feature.qrcodes : 0,
        themes: feature ? feature.themes : 'Free',
        custom_theme: feature ? feature.custom_theme : 0,
        support: feature ? feature.support : 24,
        pricing_plan_id: pricing_plan,
    });

    const onHandleChange = (event: any) => {
        if (event.target.type === 'checkbox') {
        } else {
            setData(event.target.name, parseInt(event.target.value));
        }
    };

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();
        clearErrors();

        if (feature) {
            put(
                route('pricing-feature.update', {
                    pricing_feature: feature.id,
                }),
            );
        } else {
            post(route('pricing-feature.store'));
        }
    };

    const themesList = [
        { key: 'Basic Only', value: 'Free' },
        { key: 'Standard (Free Themes Included)', value: 'Standard' },
        { key: 'Premium (All Themes Included)', value: 'Premium' },
    ];

    let blockList = [];
    for (let i = 1; i <= 10; i++) {
        const obj = { key: i, value: i };
        blockList.push(obj);
    }

    return (
        <>
            <Head title={app.new_subscription_plan} />
            <Breadcrumb
                Icon={DollarSignIcon}
                title={app.new_subscription_plan}
            />

            <Card className="mx-auto w-full max-w-[1000px] shadow-card">
                <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                    <p className="text18 font-bold text-gray-900">
                        {app.create_pricing_plan}
                    </p>
                </div>
                <form onSubmit={submit} className="p-7">
                    <p className="text18 mb-4 font-bold text-gray-900">
                        {app.subscription_plan_features}
                    </p>

                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <UnlimitedCheckBox
                            name={'biolinks'}
                            value={data.biolinks}
                            error={errors.biolinks}
                            onChange={onHandleChange}
                            checkHandler={(check) =>
                                setData('biolinks', check ? null : 0)
                            }
                        />

                        <div className="relative">
                            <Label>{input.biolink_block_access}</Label>

                            <Select
                                defaultValue={`${data.biolink_blocks}`}
                                onValueChange={(value) =>
                                    setData('biolink_blocks', parseInt(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Biolink block access" />
                                </SelectTrigger>

                                <SelectContent>
                                    {blockList.map((block) => (
                                        <SelectItem
                                            key={block.key}
                                            value={`${block.value}`}
                                        >
                                            {block.key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.biolink_blocks} />
                        </div>

                        <UnlimitedCheckBox
                            name={'shortlinks'}
                            value={data.shortlinks}
                            error={errors.shortlinks}
                            onChange={onHandleChange}
                            checkHandler={(check) =>
                                setData('shortlinks', check ? null : 0)
                            }
                        />

                        <UnlimitedCheckBox
                            name="projects"
                            value={data.projects}
                            error={errors.projects}
                            onChange={onHandleChange}
                            checkHandler={(check) =>
                                setData('projects', check ? null : 0)
                            }
                        />

                        <UnlimitedCheckBox
                            name={'qrcodes'}
                            value={data.qrcodes}
                            error={errors.qrcodes}
                            onChange={onHandleChange}
                            checkHandler={(check) =>
                                setData('qrcodes', check ? null : 0)
                            }
                        />

                        <div>
                            <Label>{input.theme_access}</Label>

                            <Select
                                defaultValue={data.themes}
                                onValueChange={(value) =>
                                    setData('themes', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Biolink theme access" />
                                </SelectTrigger>

                                <SelectContent>
                                    {themesList.map((block) => (
                                        <SelectItem
                                            key={block.key}
                                            value={`${block.value}`}
                                        >
                                            {block.key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.themes} />
                        </div>

                        <div>
                            <Label>{input.custom_theme_create}</Label>

                            <Select
                                defaultValue={`${data.custom_theme}`}
                                onValueChange={(value) =>
                                    setData('custom_theme', parseInt(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Biolink custom theme create access" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="1">True</SelectItem>
                                    <SelectItem value="0">False</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.custom_theme} />
                        </div>

                        <div>
                            <Label>{input.support}</Label>

                            <Select
                                defaultValue={`${data.support}`}
                                onValueChange={(value) =>
                                    setData('support', parseInt(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Customer support" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="24">24</SelectItem>
                                    <SelectItem value="48">48</SelectItem>
                                    <SelectItem value="72">72</SelectItem>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.support} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Button
                            type="submit"
                            className="rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                        >
                            {feature
                                ? app.update_pricing_plan
                                : app.create_pricing_plan}
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
};

Feature.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Feature;
