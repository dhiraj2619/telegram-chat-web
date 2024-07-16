import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const themeContext = createContext();

const ThemeContextProvider =({children})=>{
 
    const [mode,setMode] = useState('light');

    const theme = useMemo(()=>
        createTheme({
            palette:{
                mode
            }
        }),
        [mode]
    )

    const toggleTheme=()=>{
        setMode((prevMode)=>(prevMode === 'light'?'dark':'light'))
    }
    return(
       <themeContext.Provider value={{mode,toggleTheme}}>
         <ThemeProvider theme={theme}>
            <CssBaseline/>
          {children}
         </ThemeProvider>
       </themeContext.Provider>
    )
}

export default ThemeContextProvider;