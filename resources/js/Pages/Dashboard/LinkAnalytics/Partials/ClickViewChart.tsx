import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartConfig = {
    click: {
        label: 'Click',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

interface Props {
    date: string;
    total: number;
    linkId: string;
    chartData: any[];
}

const ClickViewChart = ({ date, total, linkId, chartData }: Props) => {
    const visitDate = [
        { date: 'today', title: 'Last 24 Hours' },
        { date: 'this_week', title: 'Last 7 Days' },
        { date: 'last_month', title: 'Last 30 Days' },
        { date: 'last_6_months', title: 'Last 6 Months' },
        { date: 'last_year', title: 'Last 1 Year' },
        { date: 'all_time', title: 'All Time' },
    ];

    return (
        <Card>
            <div className="flex items-center justify-between p-6">
                <CardTitle className="text-lg">
                    <span className="font-normal">Total Clicks</span> {total}
                </CardTitle>

                <Select
                    defaultValue={date}
                    onValueChange={(value) =>
                        router.get(
                            route('link.analytics', {
                                id: linkId,
                                date: value,
                            }),
                        )
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {visitDate.map(({ date, title }) => (
                                <SelectItem key={date} value={date}>
                                    {title}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <CardContent className="px-3 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="h-[320px] w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 8,
                            left: 12,
                            right: 12,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value, ind) =>
                                ind < 9 ? `0${ind + 1}` : `${ind + 1}`
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />

                        <Area
                            dataKey="click"
                            type="linear"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ClickViewChart;
