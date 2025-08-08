import { parse } from "date-fns";


export function parseMonth(string) {
    return parse(string, "MMM", new Date()).getMonth() + 1;
}

export function parseDay(string) {
    return parse(string, "do", new Date()).getDate();
}