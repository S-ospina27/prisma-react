import jwt_decode from "jwt-decode";
import RouteListNavigation from "./RouteListNavigation";

const roles = {
  administrator: 1,
  technical: 2,
  distributor: 3,
  provider: 4
};

export function remove(item) {
  sessionStorage.removeItem(item);
}

export function get(item) {
  return sessionStorage.getItem(item);
}

export function set(key, item) {
  sessionStorage.setItem(key, item);
}

export function getJWT(key = null) {
  const jwt = jwt_decode(get("jwt"));
  return key === null ? jwt : jwt.data[key];
}

export function getRol() {
  return roles[rol];
}

export function navigationLinks() {
  if (!session()) {
    return RouteListNavigation.offline;
  } else {
    const jwt = getJWT();

    return jwt.data.idroles === 1
      ? RouteListNavigation.online.administartor
      : RouteListNavigation.online.store;
  }
}

export function getHeader() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + get("jwt"),
    },
  };
}

export function getHeaderMultipart() {
  const header = getHeader();
  header.headers["Content-Type"] = "multipart/form-data";
  return header;
}

export default function session() {
  return [undefined, null].includes(get("jwt")) ? false : true;
}
