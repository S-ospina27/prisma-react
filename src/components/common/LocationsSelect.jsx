import { Autocomplete, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoutesList from "../tools/RoutesList";

function LocationsSelect({
  labelDepartment,
  labelCity,
  city,
  setCity,
  department,
  setDepartment,
  requiredCity,
  requiredDepartment,
  readOnlyCity,
  readOnlyDepartment,
  disabledCity,
  disabledDepartment,
}) {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [disabledCityAction, setDisabledCityAction] = useState(false);

  const handleReadDepartments = () => {
    axios
      .get(RoutesList.api.locations.read_departments)
      .then((res) => {
        setDepartments(res.data);
      });
  };

  const handleReadCities = (iddepartments) => {
    axios
      .get(RoutesList.api.locations.read_cities + iddepartments)
      .then((res) => setCities(res.data));
  };

  const List = ({
    type,
    value,
    setValue,
    options,
    itemID,
    label,
    disabled,
    readOnly,
    required,
  }) => {
    return (
      <Autocomplete
        disablePortal
        filterSelectedOptions
        // disableClearable
        disabled={disabled}
        readOnly={readOnly}
        options={options}
        getOptionLabel={(option) => option}
        getOptionDisabled={(option) => option === value}
        isOptionEqualToValue={(option, value) => option === value}
        itemID={itemID}
        value={value}
        onChange={(event, newValue) => {
          if (![null, ""].includes(newValue)) {
            setValue(newValue);

            if (type === "departments") {
              setDisabledCityAction(false);
              setCity("");
              handleReadCities(newValue.split("-").shift().trim());
            }
          } else {
            if (type === "cities") {
              setDisabledCityAction(false);
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            color={"primary"}
            variant={"filled"}
            required={required}
            InputProps={{
              ...params.InputProps,
              autoComplete: "off",
            }}
          />
        )}
      />
    );
  };

  useEffect(() => {
    if ([null, ''].includes(department)) {
      setDisabledCityAction(true);
    }

    if (![null, ''].includes(department)) {
      handleReadCities(department);
    }

    handleReadDepartments();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <List
          type={"departments"}
          label={!labelDepartment ? "Departamentos" : labelDepartment}
          value={department}
          setValue={setDepartment}
          required={requiredDepartment}
          disabled={disabledDepartment}
          readOnly={readOnlyDepartment}
          options={departments.map(
            (dep) => `${dep.iddepartments} - ${dep.departments_name}`
          )}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <List
          type={"cities"}
          label={!labelCity ? "Ciudades" : labelCity}
          value={city}
          setValue={setCity}
          required={requiredCity}
          disabled={disabledCityAction}
          readOnly={readOnlyCity}
          options={cities.map(
            (city) => `${city.idcities} - ${city.cities_name}`
          )}
        />
      </Grid>
    </Grid>
  );
}

export default LocationsSelect;
