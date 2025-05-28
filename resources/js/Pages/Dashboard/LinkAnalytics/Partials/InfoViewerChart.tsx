'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

const chartConfig = {
    click: {
        label: 'Click',
        color: 'hsl(var(--chart-1))',
    },
    label: {
        color: 'hsl(var(--background))',
    },
} satisfies ChartConfig;

interface Props {
    type: string;
    chartData: any[];
}

const InfoViewerChart = ({ type, chartData }: Props) => {
    return (
        <ChartContainer
            config={chartConfig}
            className={cn('w-full')}
            style={{ height: `${chartData.length * 40}px` }}
        >
            <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                    right: 24,
                }}
            >
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey={type}
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                />
                <XAxis dataKey="click" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                    dataKey="click"
                    layout="vertical"
                    fill="hsl(var(--border))"
                    radius={4}
                >
                    <LabelList
                        dataKey={type}
                        position="insideLeft"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    <LabelList
                        dataKey="click"
                        position="right"
                        width={500}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};

export default InfoViewerChart;
