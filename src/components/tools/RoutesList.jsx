const host = import.meta.env.VITE_SERVER_URL_AUD;

export default {
  host: host,
  api: {
    auth: {
      login: `${host}/api/auth/login`,
    },
    read_roles: `${host}/api/read-roles`,
    read_document_types: `${host}/api/read-document-types`,
    status: {
      index: `${host}/api/status/`,
      service: `${host}/api/status/service`,
    },
    users: {
      create: `${host}/api/users/create`,
      update: `${host}/api/users/update`,
      read: {
        index: `${host}/api/users/read`,
        by_rol: `${host}/api/users/read/by-rol`,
      },
    },
    products: {
      create: `${host}/api/products/create`,
      update: `${host}/api/products/update`,
      read: {
        index: `${host}/api/products/read/`,
        by_status: `${host}/api/products/read/by-status`,
      },
      types: {
        create: `${host}/api/products/types/create`,
        update: `${host}/api/products/types/update`,
        read: `${host}/api/products/types/read`,
      },
    },
    service_orders: {
      create: `${host}/api/service-orders/create`,
      update: `${host}/api/service-orders/update`,
      export: {
        excel:`${host}/api/service-orders/export/excel`,
        pdf:`${host}/api/service-orders/export/pdf`,
      },
      read: {
        index: `${host}/api/service-orders/read`,
        by_provider: `${host}/api/service-orders/read/by-provider/{idprovider_users}`,
        graphics: {
          amount_orders: `${host}/api/service-orders/read/graphics/amount-orders`,
          unit_percentages:`${host}/api/service-orders/read/graphics/unit-percentages`,

        }
      },
    },
    locations: {
      read_departments: `${host}/api/locations/read-departments`,
      read_cities: `${host}/api/locations/read-cities/`,  
    },
  },
};
