import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from '@mui/icons-material/Inventory';

export default {
  online: {
    administartor: [
      {
        nombre: "Dashboard",
        icon: <HomeIcon color={"dark-blue"} />,
        link: "/",
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
        link: "/service-orders",
      },
      {
        nombre: "Solicitudes",
        icon: <AssignmentIcon color={"dark-blue"} />,
        link: "/service-request",
      },
      {
        nombre: "Tecnicos",
        icon: <SupervisedUserCircleIcon color={"blue"} />,
        link: "/technical",
      },
      {
        nombre: "Inventario",
        icon: <InventoryIcon color={"blue"} />,
        link: "/inventory",
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
