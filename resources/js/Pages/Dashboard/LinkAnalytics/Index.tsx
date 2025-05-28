import Breadcrumb from '@/components/breadcrumb';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from '@/layouts/dashboard/layout';
import { LinkProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartLine } from 'lucide-react';
import { ReactNode } from 'react';
import ClickViewChart from './Partials/ClickViewChart';
import InfoViewerChart from './Partials/InfoViewerChart';

let clickData = [
    { key: '01am', hour: '01 AM', click: 0 },
    { key: '02am', hour: '02 AM', click: 0 },
    { key: '03am', hour: '03 AM', click: 0 },
    { key: '04am', hour: '04 AM', click: 0 },
    { key: '05am', hour: '05 AM', click: 0 },
    { key: '06am', hour: '06 AM', click: 0 },
    { key: '07am', hour: '07 AM', click: 0 },
    { key: '08am', hour: '08 AM', click: 0 },
    { key: '09am', hour: '09 AM', click: 0 },
    { key: '10am', hour: '10 AM', click: 0 },
    { key: '11am', hour: '11 AM', click: 0 },
    { key: '12pm', hour: '12 PM', click: 0 },
    { key: '01pm', hour: '01 PM', click: 0 },
    { key: '02pm', hour: '02 PM', click: 0 },
    { key: '03pm', hour: '03 PM', click: 0 },
    { key: '04pm', hour: '04 PM', click: 0 },
    { key: '05pm', hour: '05 PM', click: 0 },
    { key: '06pm', hour: '06 PM', click: 0 },
    { key: '07pm', hour: '07 PM', click: 0 },
    { key: '08pm', hour: '08 PM', click: 0 },
    { key: '09pm', hour: '09 PM', click: 0 },
    { key: '10pm', hour: '10 PM', click: 0 },
    { key: '11pm', hour: '11 PM', click: 0 },
    { key: '12am', hour: '12 AM', click: 0 },
];

function infoGetter(key: string, counter: any[], info: any) {
    let existing = counter.find((data) => data[key] == info.value);

    if (existing) {
        if (existing.id != info.id) {
            existing.id = info.id;
            existing.click += info.count;
        }
    } else {
        counter.push({
            id: info.id,
            [key]: info.value,
            click: info.count,
        });
    }
}

let countries: any[] = [];
let cities: any[] = [];
let timezones: any[] = [];
let device: any[] = [];
let browser: any[] = [];
let os: any[] = [];
let phone: any[] = [];
let desktop: any[] = [];
let referer: any[] = [];
let referer_url: any[] = [];

interface Props {
    date: string;
    link: LinkProps;
}

const Index = ({ date, link }: Props) => {
    let total = 0;

    link.visit?.visit_track.map((track) => {
        total += track.total;

        Object.entries(track).forEach(([key, value]) => {
            if (
                key == 'id' ||
                key == 'created_at' ||
                key == 'updated_at' ||
                key == 'total' ||
                key == 'visit_info' ||
                key == 'visit_id' ||
                key == 'total'
            ) {
                return;
            } else {
                for (let i = 0; i < clickData.length; i++) {
                    const element = clickData[i];

                    if (key == element.key) {
                        element.click += value as number;
                        break;
                    }
                }
            }
        });

        track.visit_info.forEach((info: any) => {
            switch (info.key) {
                case 'country':
                    infoGetter('country', countries, info);
                    break;

                case 'city':
                    infoGetter('city', cities, info);
                    break;

                case 'timezone':
                    infoGetter('timezone', timezones, info);
                    break;

                case 'device':
                    infoGetter('device', device, info);
                    break;

                case 'browser':
                    infoGetter('browser', browser, info);
                    break;

                case 'os':
                    infoGetter('os', os, info);
                    break;
                //
                case 'phone':
                    infoGetter('phone', phone, info);
                    break;

                case 'desktop':
                    infoGetter('desktop', desktop, info);
                    break;

                case 'referer':
                    infoGetter('referer', referer, info);
                    break;

                case 'referer_url':
                    infoGetter('referer_url', referer_url, info);
                    break;

                default:
                    break;
            }
        });
    });

    const tabList =
        'h-12 w-full justify-start rounded-none border-b border-border bg-transparent p-0 px-5';

    const tabTrigger =
        "relative rounded-none border-primary px-5 py-3.5 !shadow-none before:absolute before:bottom-0 before:left-0 before:rounded-t-xl data-[state=active]:!bg-card data-[state=active]:before:h-[3px] data-[state=active]:before:w-full data-[state=active]:before:bg-primary data-[state=active]:before:content-['.']";

    return (
        <>
            <Head title="Link Visitors Analytics" />
            <Breadcrumb Icon={ChartLine} title="Link Visitors Analytics" />

            <div className="mx-auto w-full max-w-[1000px]">
                <ClickViewChart
                    date={date}
                    total={total}
                    linkId={link.id as string}
                    chartData={clickData}
                />

                <div className="mt-6 grid grid-cols-2 gap-6">
                    <Card>
                        <Tabs defaultValue="country">
                            <TabsList className={tabList}>
                                <TabsTrigger
                                    value="country"
                                    className={tabTrigger}
                                >
                                    Country
                                </TabsTrigger>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="city"
                                >
                                    City
                                </TabsTrigger>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="timezone"
                                >
                                    Timezone
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="p-5" value="country">
                                <InfoViewerChart
                                    type="country"
                                    chartData={countries}
                                />
                            </TabsContent>
                            <TabsContent className="p-5" value="city">
                                <InfoViewerChart
                                    type="city"
                                    chartData={cities}
                                />
                            </TabsContent>
                            <TabsContent className="p-5" value="timezone">
                                <InfoViewerChart
                                    type="timezone"
                                    chartData={timezones}
                                />
                            </TabsContent>
                        </Tabs>
                    </Card>

                    <Card>
                        <Tabs defaultValue="device">
                            <TabsList className={tabList}>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="device"
                                >
                                    Device
                                </TabsTrigger>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="browser"
                                >
                                    Browser
                                </TabsTrigger>
                                <TabsTrigger className={tabTrigger} value="os">
                                    OS
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="p-5" value="device">
                                <InfoViewerChart
                                    type="device"
                                    chartData={[
                                        ...phone.map((e) => ({
                                            ...e,
                                            device: 'Phone',
                                        })),
                                        ...desktop.map((e) => ({
                                            ...e,
                                            device: 'Desktop',
                                        })),
                                    ]}
                                />
                            </TabsContent>
                            <TabsContent className="p-5" value="browser">
                                <InfoViewerChart
                                    type="browser"
                                    chartData={browser}
                                />
                            </TabsContent>
                            <TabsContent className="p-5" value="os">
                                <InfoViewerChart type="os" chartData={os} />
                            </TabsContent>
                        </Tabs>
                    </Card>

                    <Card>
                        <Tabs defaultValue="referer">
                            <TabsList className={tabList}>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="referer"
                                >
                                    Referer
                                </TabsTrigger>
                                <TabsTrigger
                                    className={tabTrigger}
                                    value="referer_url"
                                >
                                    Referer URL
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent className="p-5" value="referer">
                                <InfoViewerChart
                                    type="referer"
                                    chartData={referer}
                                />
                            </TabsContent>
                            <TabsContent className="p-5" value="referer_url">
                                <InfoViewerChart
                                    type="referer_url"
                                    chartData={referer_url}
                                />
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
