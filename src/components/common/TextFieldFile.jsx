import { useRef, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
function TextFieldFile({
  label,
  type,
  value,
  setValue,
  required,
  disabled,
  event,
  readOnly,
  defaultValue,
  accept,
}) {
  const [str, setStr] = useState("");
  const fileInput = useRef();

  return (
    <TextField
      fullWidth
      type={type}
      required={required}
      disabled={disabled}
      label={label}
      value={str}
      onClick={() => fileInput.current.click()}
      variant={"filled"}
      color={"blue"}
      autoComplete={"off"}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton color="blue" edge="end">
              <PhotoCameraBackIcon />
              <input
                hidden
                accept={accept.join(", ")}
                type="file"
                ref={fileInput}
                onChange={(e) => {
                  if (![null, ""].includes(e.target.value)) {
                    setStr(e.target.files[0].name);
                    setValue(e.target.files);
                  } else {
                    setStr("");
                    setValue(e.target.files);
                  }
                }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default TextFieldFile;
{
  /* <TextField
                    label="Archivos"
                    fullWidth
                    required
                    type={"text"}
                    value={strFileInput}
                    onClick={() => fileInput.current.click()}
                    variant={"filled"}
                    color={"primary"}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton color="primary" edge="end">
                            <PhotoCameraBackIcon />
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              ref={fileInput}
                              onChange={(e) => {
                                if (![null, ""].includes(e.target.value)) {
                                  setStrFileInput(e.target.files[0].name);
                                } else {
                                  setStrFileInput("");
                                }
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  /> */
}
