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
  color = "blue",
}) {
  return (
    <TextField
      fullWidth
      type={type}
      required={required}
      disabled={disabled}
      label={label}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        event && event(e);
      }}
      variant={"filled"}
      color={color}
      autoComplete={"off"}
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
}

export default TextFieldFilled;
