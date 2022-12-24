import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export default {
  online: {
    administartor: [
      {
        nombre: "Dashboard",
        icon: <HomeIcon color={"primary"} />,
        link: "/",
      },
      {
        nombre: "Usuarios",
        icon: <AssignmentIndIcon color={"primary"} />,
        link: "/users",
      },
      {
        nombre: "Portafolios",
        icon: <WorkRoundedIcon color={"primary"} />,
        link: "/products",
      },
      {
        nombre: "Ordenes de Servicios",
        icon: <MenuBookRoundedIcon color={"primary"} />,
        link: "/service-orders",
      },
      {
        nombre: "Solicitudes",
        icon: <AssignmentIcon color={"primary"} />,
        link: "/service-request",
      },
      {
        nombre: "Tecnicos",
        icon: <SupervisedUserCircleIcon color={"primary"} />,
        link: "/technical"
      },
    ],
    provider: [
      {
        nombre: "Ordenes de Servicios",
        icon: <MenuBookRoundedIcon color={"primary"} />,
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
      icon: <AssignmentIcon color={"primary"} />,
      link: "/service-request",
    },
  ],
};
