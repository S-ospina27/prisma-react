export default {
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
    { field: "products_description", headerName: "DESCRIPCIÓN", width: 250 },
    { field: "products_color", headerName: "COLOR", width: 460 },
    { field: "product_types_name", headerName: "TIPO DE PRODCUTO", width: 460 },
    { field: "users_name", headerName: "NOMBRE DEL USUARIO", width: 460 },
    { field: "status_type", headerName: "ESTADO ", width: 460 },
  ],
  type_products: [
    { field: "idproduct_types", headerName: "ID TIPO DE PRODUCTO", width: 250 },
    {
      field: "product_types_name",
      headerName: "NOMBRE TIPO PRODUCTO",
      width: 250,
    },
  ],
};
