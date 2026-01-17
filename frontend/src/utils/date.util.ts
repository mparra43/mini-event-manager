import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from "@/transversal/components/constants/validation.constants";
import { format, isValid, parseISO } from "date-fns";

export const formatForDisplay = (dateString: string): string => {
    try {
        const date = parseISO(dateString);
        return isValid(date) ? format(date, DISPLAY_DATE_FORMAT) : dateString;
    } catch {
        return dateString;
    }
}
export const formatForApi = (date: Date): string => {
    return format(date, DATE_FORMAT);
}
export const isValidISOString = (dateString: string): boolean => {
    try {
        const date = parseISO(dateString);
        return isValid(date);
    } catch {
        return false;
    }
}