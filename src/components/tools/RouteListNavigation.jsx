import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export default {
  online: {
    administartor: [
      {
        nombre: "Dashboard",
        icon: <HomeIcon color={"dark-blue"} />,
        link: "/dashboard",
      },
      {
        nombre: "Usuarios",
        icon: <AssignmentIndIcon color={"blue"} />,
        link: "/users",
      },
      {
        nombre: "Portafolios",
        icon: <WorkRoundedIcon color={"dark-blue"} />,
        link: "/products",
      },
      {
        nombre: "Ordenes de Servicios",
        icon: <MenuBookRoundedIcon color={"blue"} />,
        link: "/service/orders",
      },
      {
        nombre: "Ordenes de Solicitudes",
        icon: <AssignmentIcon color={"dark-blue"} />,
        link: "/service/request",
      },
      {
        nombre: "Inventario Tecnicos",
        icon: <SupervisedUserCircleIcon color={"blue"} />,
        link: "/service/technical-inventory",
      },
      {
        nombre: "Repuestos",
        icon: <InventoryIcon color={"dark-blue"} />,
        link: "/service/spare-parts",
      },
      {
        nombre: "Pagos",
        icon: <PointOfSaleIcon color={"blue"} />,
        link: "/service/Payments",
      },
      {
        nombre: "Formularios Solicitudes",
        icon: <PointOfSaleIcon color={"blue"} />,
        link: "/service/application-order-form/1",
      },
    ],
    provider: [
      {
        nombre: "Ordenes de Servicios",
        icon: <MenuBookRoundedIcon color={"dark-blue"} />,
        link: "/service-orders",
      },
    ],
  },
  offline: [
    {
      nombre: "Loguin",
      link: "/",
    },
    {
      nombre: "Solicitudes",
      icon: <AssignmentIcon color={"dark-blue"} />,
      link: "/service-request",
    },
  ],
};
