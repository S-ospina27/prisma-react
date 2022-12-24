import { TextField } from "@mui/material";

function TextFieldFilled({
  label,
  type,
  value,
  setValue,
  required,
  disabled,
  event,
  readOnly,
}) {
  return (
    <TextField
      type={type}
      fullWidth
      required={required}
      disabled={disabled}
      label={label}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        event && event(e);
      }}
      variant={"filled"}
      color={"blue-quinary"}
      autoComplete={"off"}
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
}

export default TextFieldFilled;
