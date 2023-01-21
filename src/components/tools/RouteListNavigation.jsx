import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default {
  online: {
    administrator: [
      {
        type: "title",
        label: "INICIO",
        childs: [
          {
            label: "Home",
            icon: <HomeIcon color={"blue"} />,
            url: "/",
          },
          {
            label: "Dashboard",
            icon: <DashboardIcon color={"dark-blue"} />,
            url: "/dashboard",
          },
        ],
      },
      {
        type: "title",
        label: "GESTIÓN",
        childs: [
          {
            label: "Usuarios",
            icon: <AssignmentIndIcon color={"blue"} />,
            url: "/users",
          },
          {
            label: "Portafolios",
            icon: <WorkRoundedIcon color={"dark-blue"} />,
            url: "/products",
          },
        ],
      },
      {
        type: "title",
        label: "SERVICIOS",
        childs: [
          {
            label: "Ordenes",
            icon: <MenuBookRoundedIcon color={"blue"} />,
            url: "/service/orders",
          },
          {
            label: "Solicitudes",
            icon: <AssignmentIcon color={"dark-blue"} />,
            url: "/service/request",
          },
          {
            label: "Inventario Tecnicos",
            icon: <InventoryIcon color={"blue"} />,
            url: "/service/technical-inventory",
          },
          {
            label: "Repuestos",
            icon: <InventoryIcon color={"dark-blue"} />,
            url: "/service/spare-parts",
          },
          {
            label: "Pagos",
            icon: <PointOfSaleIcon color={"blue"} />,
            url: "/service/payments",
          },
          // {
          //   label: "Formularios Solicitudes",
          //   icon: <FormatAlignLeftIcon color={"dark-blue"} />,
          //   url: "/service/application-order-form/1",
          // },
        ],
      },
    ],
    provider: [
      {
        type: "title",
        label: "INICIO",
        childs: [
          {
            label: "Home",
            icon: <HomeIcon color={"blue"} />,
            url: "/",
          },
          {
            label: "Dashboard",
            icon: <DashboardIcon color={"dark-blue"} />,
            url: "/dashboard",
          },
        ],
      },
      {
        type: "title",
        label: "SERVICIOS",
        childs: [
          {
            label: "Ordenes",
            icon: <MenuBookRoundedIcon color={"blue"} />,
            url: "/service/orders",
          },
        ],
      },
    ],
    technical: [
      {
        type: "title",
        label: "INICIO",
        childs: [
          {
            label: "Home",
            icon: <HomeIcon color={"blue"} />,
            url: "/",
          },
          {
            label: "Dashboard",
            icon: <DashboardIcon color={"dark-blue"} />,
            url: "/dashboard",
          },
        ],
      },
    ],
    dealer: [
      {
        type: "title",
        label: "INICIO",
        childs: [
          {
            label: "Home",
            icon: <HomeIcon color={"blue"} />,
            url: "/",
          },
          {
            label: "Dashboard",
            icon: <DashboardIcon color={"dark-blue"} />,
            url: "/dashboard",
          },
        ],
      },
    ],
  },
  offline: [
    {
      type: "title",
      label: "INICIO",
      childs: [
        {
          label: "Home",
          icon: <HomeIcon color={"blue"} />,
          url: "/",
        },
        {
          label: "Dashboard",
          icon: <DashboardIcon color={"dark-blue"} />,
          url: "/dashboard",
        },
      ],
    },
  ],
};
