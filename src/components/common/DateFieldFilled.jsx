import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/es-mx";

function DateFieldFilled({
  label,
  value,
  setValue,
  required,
  disabled,
  readOnly,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es-mx"}>
      <MobileDatePicker
        disableFuture
        minDate={"2022-12-30"}
        views={["year", "month", "day"]}
        inputFormat={"YYYY-MM-DD"}
        label={label}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={(e) => setValue(e)}
        renderInput={(params) => (
          <TextField
            variant="filled"
            color={"blue"}
            sx={{ width: "100%" }}
            required={required}
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: label,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateFieldFilled;
