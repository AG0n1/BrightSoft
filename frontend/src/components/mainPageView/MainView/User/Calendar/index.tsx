import {Calendar, CalendarProps} from "antd";
import type { Dayjs } from 'dayjs';
const CalendarPage = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    return (
            <Calendar style={{background: '#f5f5f5'}} onPanelChange={onPanelChange} />
    )
}

export default CalendarPage