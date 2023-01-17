export default {
  SpareParts: [
    { field: "spare_parts_name", headerName: "REPUESTO", width: 270 },
    { field: "spare_parts_amount", headerName: "CANTIDAD", width: 200 },
  ],
  Technical: [
    { field: "fullname", headerName: "NOMBRES", width: 300 },
    { field: "spare_parts_name", headerName: "REPUESTO", width: 180 },
    { field: "technical_inventory_amount", headerName: "CANTIDAD", width: 100 },
    { field: "technical_inventory_quantity_used", headerName: "UTILIZADOS", width: 100 },
    { field: "technical_inventory_quantity_available", headerName: "DISPONIBLES", width: 120 },
    { field: "service_type", headerName: "ESTADO", width: 170 }
  ],
  service_request: [
    { field: "users_identification", headerName: "IDENFITICACION DISTRIBUIDOR", width: 270 },
    { field: "users_name", headerName: "NOMBRE DISTRIBUIDOR", width: 270 },
    { field: "users_lastname", headerName: "APELLIDO DISTRIBUIDOR", width: 270 },
    { field: "fullnametechnical", headerName: "NOMBRE COMPLETO TECNICO", width: 270 },
    { field: "service_request_client_name", headerName: "NOMBRE CLIENTE", width: 200 },
    { field: "service_request_phone_contact", headerName: "TELEFONO DE CONTACTO", width: 200 },
    { field: "service_request_email", headerName: "CORREO ELECTRONICO", width: 270 },
    { field: "cities_name", headerName: "CIUIDAD", width: 200 },
    { field: "service_request_address", headerName: "DIRECCIÓN", width: 250 },
    { field: "service_request_neighborhood", headerName: "BARRIO", width: 200 },
    { field: "product_types_name", headerName: "TIPO DE PRODUCTO", width: 350 },
    {field: "products_reference", headerName: "PRODUCTO",width: 350,},
    {field: "service_type", headerName: "ESTADO",width: 350,},
    {field: "service_request_creation_date", headerName: "FECHA DE CREACIÓN",width: 350,},
    {field: "service_request_date_visit", headerName: "FECHA DE VISITA",width: 350,},
    {field: "service_request_date_close", headerName: "FECHA DE CIERRE",width: 350,},
    {field: "service_request_trouble_report", headerName: "REPORTE DE NOVEDAD",width: 350,},
    {field: "service_request_warranty", headerName: "GARANTIA",width: 350,},
  ],
  service_order: [
    { field: "full_consecutive", headerName: "CONSECUTIVO", width: 200 },
    { field: "service_type", headerName: "ESTADO", width: 200 },
    { field: "products_reference", headerName: "PRODUCTO", width: 200 },
    { field: "fullname", headerName: "PROVEEDOR", width: 350 },
    {
      field: "service_orders_observation",
      headerName: "OBSERVACIONES",
      width: 350,
    },
  ],
  users: [
    { field: "roles_name", headerName: "ROL", width: 250 },
    {
      field: "users_identification",
      headerName: "# DE IDENTIFICACIÓN",
      width: 250,
    },
    { field: "fullname", headerName: "NOMBRE COMPLETO", width: 250 },
    { field: "users_phone", headerName: "TELEFONO", width: 250 },
    { field: "users_email", headerName: "EMAIL", width: 250 },
    { field: "users_address", headerName: "DIRECCIÓN", width: 250 },
    { field: "cities_name", headerName: "CIUDAD", width: 250 },
    {
      field: "departments_name",
      headerName: "DEPARTAMENTO",
      width: 250,
    },
    {
      field: "users_contact_name",
      headerName: "NOMBRE DE CONTACTO",
      width: 250,
    },
    {
      field: "users_contact_phone",
      headerName: "# DE CONTACTO",
      width: 250,
    },
    { field: "status_type", headerName: "STATUS", width: 250 },
  ],
  products: [
    { field: "idproducts", headerName: "ID PRODUCTO", width: 250 },
    { field: "products_reference", headerName: "REFERENCIA", width: 250 },
    { field: "products_description", headerName: "DESCRIPCIÓN", width: 350 },
    { field: "products_color", headerName: "COLOR", width: 250 },
    { field: "product_types_name", headerName: "TIPO DE PRODCUTO", width: 250 },
    { field: "users_name", headerName: "NOMBRE DEL USUARIO", width: 250 },
    { field: "status_type", headerName: "ESTADO ", width: 250 },
  ],
  type_products: [
    { field: "idproduct_types", headerName: "ID", width: 100 },
    {
      field: "product_types_name",
      headerName: "TIPO PRODUCTO",
      width: 300,
    },
  ],
};
