import {format} from "date-fns"

export default function dateFormatter(date) {
    return format(date, "MMM do")
}