import { parseISO, format } from "date-fns";

export function timestampFormat(data: number, formatStyle: string) {
    const date = new Date(data * 1000);

    return format(date, formatStyle);
}

export const stringToDateTime = (str: string) => {
    const time = format(parseISO(str), "hh:mm aa");
    const date = format(parseISO(str), "dd MMM, yyyy");
    return { date, time };
};
