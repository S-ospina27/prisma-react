import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

export default {
  online: {
    routes: [
      {
        nombre: "Usuarios",
        icon: <AssignmentIndIcon color={"primary"} />,
        link: "/users",
      },
      {
        nombre: "Portafolios",
        icon: <WorkRoundedIcon color={"primary"} />,
        link: "/",
      },
      {
        nombre: "Ordenes de Servicios",
        icon: <MenuBookRoundedIcon color={"primary"} />,
        link: "http://127.0.0.1:5173/",
      },
    ],
  },
  offline: [
    {
      nombre: "Loguin",
      link: "/",
    },
  ],
};
