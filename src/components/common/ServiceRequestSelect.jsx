import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { get, getHeader } from "../tools/SessionSettings";
import RoutesList from "../tools/RoutesList";

function ServiceRequestSelect({
  value,
  setValue,
  required,
  disabled,
  readOnly
}) {
  const [serviceRequest, setServiceRequest] = useState([]);

  useEffect(() => {
    let route =  "";

    // if (jwtDecode(get('jwt')).data.idroles === 2) {
    //     route = RoutesList.api.service_request.read;
    // } else {
    //     route = RoutesList.api.service_request.read;
    // }

    // axios.get(route, getHeader()).then(res => {
    //     console.log(res.data);
    // });
  }, []);

  return null;
}

export default ServiceRequestSelect;
