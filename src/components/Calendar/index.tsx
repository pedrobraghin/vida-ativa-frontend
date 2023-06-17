import "./config";
import { Calendar as RNCalendar } from "react-native-calendars";

import { Colors } from "../../constants/Colors";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { OutputUserEventsTypeDTO } from "../../@types/EventsTypes";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

interface CalendarProps {
  events?: OutputUserEventsTypeDTO[];
}

export default ({ events }: CalendarProps) => {
  const currentDate = getCurrentDate();

  let markedDay = {} as { [key: string]: MarkingProps };

  events
    ? events.map((event) => {
        markedDay[formatDate(new Date(event.date))] = {
          selected: true,
          marked: true,
          selectedColor: Colors.MainColor,
        };
      })
    : undefined;

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <RNCalendar
      current={currentDate}
      className="rounded-md border-2 border-main-color"
      markedDates={markedDay}
      enableSwipeMonths
    />
  );
};
