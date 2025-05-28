import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Dashboard from '@/layouts/dashboard/layout';
import { Head, router } from '@inertiajs/react';
import { Box, ExternalLink, Link, QrCode } from 'lucide-react';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    biolinks: {
        label: 'BioLinks',
        color: 'hsl(hsl(var(--chart-1)))',
    },
    shortlinks: {
        label: 'ShortLinks',
        color: 'hsl(hsl(var(--chart-2)))',
    },
    projects: {
        label: 'Projects',
        color: 'hsl(hsl(var(--chart-1)))',
    },
    qrcodes: {
        label: 'QRCodes',
        color: 'hsl(hsl(var(--chart-2)))',
    },
} satisfies ChartConfig;

interface Props {
    months: number;
    bioLinksData: any;
    shortLinksData: any;
    projectsData: any;
    qrCodesData: any;
    bioLinksTotal: number;
    shortLinksTotal: number;
    projectsTotal: number;
    qrCodesTotal: number;
}

const Index = (props: Props) => {
    const { bioLinksData, shortLinksData, projectsData, qrCodesData } = props;

    const chartData: any[] = [];

    Object.entries(bioLinksData).forEach(([key, value]) => {
        const bioLink = bioLinksData[key];
        const shortLink = shortLinksData[key];
        const project = projectsData[key];
        const qrCode = qrCodesData[key];

        chartData.push({
            date: key,
            biolinks: bioLink.total,
            shortlinks: shortLink.total,
            projects: project.total,
            qrcodes: qrCode.total,
        });
    });

    const overviews = [
        {
            id: nanoid(),
            name: 'BioLinks',
            Icon: Link,
            count: props.bioLinksTotal,
        },
        {
            id: nanoid(),
            name: 'ShortLinks',
            Icon: ExternalLink,
            count: props.shortLinksTotal,
        },
        {
            id: nanoid(),
            name: 'Projects',
            Icon: Box,
            count: props.projectsTotal,
        },
        {
            id: nanoid(),
            name: 'QRCodes',
            Icon: QrCode,
            count: props.qrCodesTotal,
        },
    ];

    // Create a URL object
    const urlObj = new URL(location.href);
    const searchParams = urlObj.searchParams;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const selectedYear = searchParams.get('year') ?? `${year}`;
    const selectedMonth = searchParams.get('month') ?? `${month}`;

    const yearHandler = (value: string) => {
        router.get(
            route('dashboard', {
                year: value,
                month: parseInt(selectedMonth),
            }),
        );
    };

    const monthHandler = (value: string) => {
        router.get(
            route('dashboard', {
                year: selectedYear,
                month: parseInt(value),
            }),
        );
    };

    const years = [
        { key: 'Current Year', value: `${year}` },
        { key: 'Last Year', value: `${year - 1}` },
        { key: 'Last 2 Year', value: `${year - 2}` },
        { key: 'All of Years', value: 'all' },
    ];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="mb-7 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
                {overviews.map(({ id, name, count, Icon }) => (
                    <Card key={id} className="p-6">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full"
                        >
                            <Icon className="h-4 w-4" />
                        </Button>

                        <p className="mb-3 mt-2 text-sm font-medium text-gray-500">
                            Total {name}
                        </p>

                        <h6 className="text-xl font-semibold md:text-2xl">
                            {count}
                        </h6>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>Interactive View</CardTitle>
                        <CardDescription>
                            Showing monthly based data depend on the selected
                            year.
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-4">
                        <Select
                            value={selectedYear}
                            onValueChange={yearHandler}
                        >
                            <SelectTrigger className="w-[132px] rounded-lg sm:ml-auto">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>

                            <SelectContent className="rounded-xl">
                                {years.map(({ key, value }) => (
                                    <SelectItem
                                        key={value}
                                        value={value}
                                        className="rounded-lg"
                                    >
                                        {key}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedMonth}
                            onValueChange={monthHandler}
                        >
                            <SelectTrigger className="w-[120px] rounded-lg sm:ml-auto">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {months.map((month, ind) => (
                                    <SelectItem
                                        key={month}
                                        value={`${ind + 1}`}
                                        className="rounded-lg"
                                    >
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[360px] w-full"
                    >
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient
                                    id="fillBioLink"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-1))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-1))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillShortLink"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-2))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-2))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillProject"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-3))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-3))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillQRCode"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-4))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-4))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                // tickFormatter={(value) => {
                                //     const date = new Date(value);
                                //     return date.toLocaleDateString('en-US', {
                                //         month: 'short',
                                //         day: 'numeric',
                                //     });
                                // }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        indicator="dot"
                                        labelFormatter={(value) => {
                                            const date = new Date(
                                                year,
                                                month - 1,
                                                value,
                                            );

                                            const dayName =
                                                new Intl.DateTimeFormat(
                                                    'en-US',
                                                    {
                                                        weekday: 'long',
                                                    },
                                                ).format(date);

                                            return `${dayName}`;
                                        }}
                                    />
                                }
                            />

                            <Area
                                dataKey="biolinks"
                                type="linear"
                                fill="url(#fillBioLink)"
                                stroke="hsl(var(--chart-1))"
                                stackId="a"
                            />
                            <Area
                                dataKey="shortlinks"
                                type="linear"
                                fill="url(#fillShortLink)"
                                stroke="hsl(var(--chart-2))"
                                stackId="a"
                            />
                            <Area
                                dataKey="projects"
                                type="linear"
                                fill="url(#fillProject)"
                                stroke="hsl(var(--chart-3))"
                                stackId="a"
                            />
                            <Area
                                dataKey="qrcodes"
                                type="linear"
                                fill="url(#fillQRCode)"
                                stroke="hsl(var(--chart-4))"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
