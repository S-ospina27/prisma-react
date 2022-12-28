const project = import.meta.env.VITE_PROJECT;
const host =
  project === "dev"
    ? import.meta.env.VITE_SERVER_URL_AUD_DEV
    : import.meta.env.VITE_SERVER_URL_AUD_PROD;

export default {
  host: host,
  api: {
    read_roles: `${host}/api/read-roles`,
    read_document_types: `${host}/api/read-document-types`,
    status:{
      index:`${host}/api/status/`,
      service: `${host}/api/status/service`,

    },
    users: {
      create: `${host}/api/users/create`,
      update: `${host}/api/users/update`,
      read: {
        index: `${host}/api/users/read`,
        filter: `${host}/api/users/filter`,
      },
    },
    products: {
      create: `${host}/api/products/create`,
      update: `${host}/api/products/update`,
      read: {
        index: `${host}/api/products/read/`,
        by_status: `${host}/api/products/read/by-status`
      },
      types: {
        create: `${host}/api/products/types/create`,
        update: `${host}/api/products/types/update`,
        read: `${host}/api/products/types/read`,
      },
    },
    service_orders: {
      create: `${host}api/service-orders/create`,
      update: `${host}api/service-orders/update`,
      export: `${host}api/serice-orders/export`,
      read: {
        index: `${host}api/service-orders/read`,
        by_provider: `${host}/api/service-orders/by-provider/{idprovider_users}`,
      },
    },
    locations: {
      read_departments: `${host}/api/locations/read-departments`,
      read_cities: `${host}/api/locations/read-cities/`,
    },
  },
};
