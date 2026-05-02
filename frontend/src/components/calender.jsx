import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function Calendar({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={["month", "day"]}
        referenceDate={dayjs("2023-01-01")}
        minDate={dayjs("2023-01-01")}
        maxDate={dayjs("2023-12-31")}
        value={dayjs().year(2023).dayOfYear(value)}
        onChange={(newValue) => {
          onChange(newValue.dayOfYear()); // Wenn im Kalender ein Datum geklickt wird, rechnen wir es zurück in den jeweiligen Tag
        }}
      />
    </LocalizationProvider>
  );
}
