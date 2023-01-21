export default {
  payments: [
    { field: "guide_payments", headerName: "GUIA PAGO", width: 180 },
    { field: "service_type", headerName: "ESTADO PAGO", width: 200 },
    { field: "guide_request", headerName: "GUIA SOLICITUD", width: 180 },
    { field: "service_type_request", headerName: "ESTADO SOLICITUD", width: 200 },
    { field: "payments_value", headerName:"VALOR", width: 150, valueFormatter: ({ value }) => {
      return "$" + value.toLocaleString('es');
    } },
    { field: "service_request_warranty", headerName: "GARANTIA", width: 180 },
  ],
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
    { field: "guide", headerName: "GUIA", width: 100 },
    { field: "service_type", headerName: "ESTADO", width: 120 },
    { field: "fullnamedealers", headerName: "DISTRIBUIDOR", width: 300 },
    { field: "fullnametechnical", headerName: "TECNICO", width: 300, valueFormatter: ({ value }) => {
      return value === null ? "SIN-ASIGNAR" : value;
    } },
    { field: "service_request_client_name", headerName: "CLIENTE", width: 300 },
  ],
  service_order: [
    { field: "full_consecutive", headerName: "CONSECUTIVO", width: 200 },
    { field: "service_type", headerName: "ESTADO", width: 200 },
    { field: "products_reference", headerName: "PRODUCTO", width: 200 },
    { field: "fullname", headerName: "PROVEEDOR", width: 350 },
  ],
  users: [
    { field: "roles_name", headerName: "ROL", width: 190 },
    { field: "users_identification", headerName: "IDENTIFICACIÓN", width: 190, },
    { field: "fullname", headerName: "NOMBRES", width: 300 },
    { field: "users_phone", headerName: "TELEFONO", width: 170 },
    { field: "status_type", headerName: "ESTADO CUENTA", width: 250 },
  ],
  products: [
    { field: "idproducts", headerName: "ID", width: 50 },
    { field: "status_type", headerName: "ESTADO ", width: 150 },
    { field: "products_reference", headerName: "REFERENCIA", width: 200 },
    { field: "products_color", headerName: "COLOR", width: 150 },
    { field: "product_types_name", headerName: "TIPO DE PRODUCTO", width: 250 },
    { field: "fullname", headerName: "USUARIO", width: 300 },
  ],
  type_products: [
    { field: "idproduct_types", headerName: "ID", width: 100 },
    { field: "product_types_name", headerName: "TIPO PRODUCTO", width: 300, },
  ],
};
