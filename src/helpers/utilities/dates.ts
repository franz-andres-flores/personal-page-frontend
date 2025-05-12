import moment from "moment";

export const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD');
}

export const addDaysToDate = (dateStr: string, days: number): string => {
    return moment(dateStr, "YYYY-MM-DD").add(days, "days").format("YYYY-MM-DD");
}

export const getCurrentDateForDashboard = () => {
    moment.locale('es');
    return moment().format(`dddd, DD [de] MMMM [de] YYYY`);
}

export const getCurrentDateTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

export const formatGenericDate = (date: string): string => {
    return moment(date).format('YYYY-MM-DD');
}

export const parseToUtcDateTime = (date: string): string => {
    return moment(date).utc().format('YYYY-MM-DD HH:mm:ss');
}

export const isDateTimeSameOrAfter = (datetime1: string, datetime2: string): boolean => {
    const parsedTime1 = moment(datetime1, 'YYYY-MM-DD HH:mm:ss');
    const parsedTime2 = moment(datetime2, 'YYYY-MM-DD HH:mm:ss');

    return parsedTime1.isSameOrAfter(parsedTime2);
}

export const validateDate = (input: string): boolean => {
    const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

    const match = input.match(dateTimeRegex);

    if (!match) {
        return false; // The input does not match either format
    }

    // Extract parts of the date and time to validate further
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);


    // Validate ranges of month, day, hour, minute, and second
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    return true;
}

export const fetchMonthsOfYear = () => {
    moment.locale('es');
    const monthsInSpanish: string[] = moment.months();
    return monthsInSpanish;
}

export const fetchMonthByNumber = (month: number) => {
    const months = fetchMonthsOfYear();
    return months[month];
}

export const fetchCurrentYear = () => {
    return moment().year();
}

export const getYearList = (startYear: number, endYear: number): number[] => {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
}