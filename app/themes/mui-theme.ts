import { createTheme } from "@mui/material";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import { ptBR } from "@mui/x-date-pickers/locales";
import { ptBR as corePtBR } from "@mui/material/locale";

const { theme } = resolveConfig(tailwindConfig);

export const muiTheme = createTheme(
  {
    palette: {
      primary: {
        main: theme!.colors!["green-500"] as string,
        dark: theme!.colors!["green-700"] as string,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCardHeader: {
        defaultProps: {
          style: {
            textTransform: "capitalize",
          },
        },
        styleOverrides: {
          title: {
            textTransform: "capitalize",
          },
        },
      },
    },
  },
  corePtBR,
  ptBR
);
