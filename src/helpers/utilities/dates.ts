import moment from "moment";

export const getCurrentDateForDashboard = () => {
    moment.locale('es');
    return moment().format(`dddd, DD [de] MMMM [de] YYYY`);
}
