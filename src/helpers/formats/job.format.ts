import { RowJobDto } from "@/dto";
import { Job } from "@/entities";
import { fetchMonthByNumber } from "../utilities";

export const formatRowJobDto = (jobs: Job[]): RowJobDto[] => {
    return jobs.map(x => {
        const row: RowJobDto = {
            ...x,
            active: x.isActive ? 'Activo' : 'Inactivo',
            startTimeLabel: fetchMonthByNumber(x.startMonth) + "/" + x.startYear
        }

        return row;
    });
}