import { createTheme } from '@mui/material/styles'
import { createContext, useState, useMemo } from 'react'

export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
              grey: {
                  100: '#e0e0e0',
                  200: '#c2c2c2',
                  300: '#a3a3a3',
                  400: '#858585',
                  500: '#666666',
                  600: '#525252',
                  700: '#3d3d3d',
                  800: '#292929',
                  900: '#141414',
              },
              primary: {
                  100: '#d6e3f8',
                  200: '#adc7f1',
                  300: '#83aceb',
                  400: '#5a90e4',
                  500: '#3174dd',
                  600: '#275db1',
                  700: '#1d4685',
                  800: '#142e58',
                  900: '#0a172c',
              },
              greenAccent: {
                  100: '#dbf5ee',
                  200: '#b7ebde',
                  300: '#94e2cd',
                  400: '#70d8bd',
                  500: '#4cceac',
                  600: '#3da58a',
                  700: '#2e7c67',
                  800: '#1e5245',
                  900: '#0f2922',
              },
              redAccent: {
                  100: '#f8dcdb',
                  200: '#f1b9b7',
                  300: '#e99592',
                  400: '#e2726e',
                  500: '#db4f4a',
                  600: '#af3f3b',
                  700: '#832f2c',
                  800: '#58201e',
                  900: '#2c100f',
              },
              blueAccent: {
                  100: '#e1e2fe',
                  200: '#c3c6fd',
                  300: '#a4a9fc',
                  400: '#868dfb',
                  500: '#6870fa',
                  600: '#535ac8',
                  700: '#3e4396',
                  800: '#2a2d64',
                  900: '#151632',
              },
              mocha: {
                  100: '#eae4e2',
                  200: '#d4c9c5',
                  300: '#bfada7',
                  400: '#a9928a',
                  500: '#94776d',
                  600: '#765f57',
                  700: '#594741',
                  800: '#3b302c',
                  900: '#1e1816',
              },
              emerald: {
                  100: '#ddeae1',
                  200: '#bcd5c4',
                  300: '#9abfa6',
                  400: '#79aa89',
                  500: '#57956b',
                  600: '#467756',
                  700: '#345940',
                  800: '#233c2b',
                  900: '#111e15',
              },
              indigo: {
                  100: '#e3dbe8',
                  200: '#c7b7d2',
                  300: '#ac94bb',
                  400: '#9070a5',
                  500: '#744c8e',
                  600: '#5d3d72',
                  700: '#462e55',
                  800: '#2e1e39',
                  900: '#170f1c',
              },
              orange: {
                  100: '#ffe9cc',
                  200: '#ffd399',
                  300: '#ffbd66',
                  400: '#ffa733',
                  500: '#ff9100',
                  600: '#cc7400',
                  700: '#995700',
                  800: '#663a00',
                  900: '#331d00',
              },
          }
        : {
              grey: {
                  900: '#141414',
                  800: '#292929',
                  700: '#3d3d3d',
                  600: '#525252',
                  500: '#666666',
                  400: '#858585',
                  300: '#a3a3a3',
                  200: '#c2c2c2',
                  100: '#e0e0e0',
              },
              primary: {
                  100: '#d6e3f8',
                  200: '#adc7f1',
                  300: '#83aceb',
                  400: '#5a90e4',
                  500: '#3174dd',
                  600: '#275db1',
                  700: '#1d4685',
                  800: '#142e58',
                  900: '#0a172c',
              },
              greenAccent: {
                  100: '#0f2922',
                  200: '#1e5245',
                  300: '#2e7c67',
                  400: '#3da58a',
                  500: '#4cceac',
                  600: '#70d8bd',
                  700: '#94e2cd',
                  800: '#b7ebde',
                  900: '#dbf5ee',
              },
              redAccent: {
                  100: '#2c100f',
                  200: '#58201e',
                  300: '#832f2c',
                  400: '#af3f3b',
                  500: '#db4f4a',
                  600: '#e2726e',
                  700: '#e99592',
                  800: '#f1b9b7',
                  900: '#f8dcdb',
              },
              blueAccent: {
                  100: '#151632',
                  200: '#2a2d64',
                  300: '#3e4396',
                  400: '#535ac8',
                  500: '#6870fa',
                  600: '#868dfb',
                  700: '#a4a9fc',
                  800: '#c3c6fd',
                  900: '#e1e2fe',
              },
              mocha: {
                  100: '#eae4e2',
                  200: '#d4c9c5',
                  300: '#bfada7',
                  400: '#a9928a',
                  500: '#94776d',
                  600: '#765f57',
                  700: '#594741',
                  800: '#3b302c',
                  900: '#1e1816',
              },
              emerald: {
                  100: '#ddeae1',
                  200: '#bcd5c4',
                  300: '#9abfa6',
                  400: '#79aa89',
                  500: '#57956b',
                  600: '#467756',
                  700: '#345940',
                  800: '#233c2b',
                  900: '#111e15',
              },
              indigo: {
                  100: '#e3dbe8',
                  200: '#c7b7d2',
                  300: '#ac94bb',
                  400: '#9070a5',
                  500: '#744c8e',
                  600: '#5d3d72',
                  700: '#462e55',
                  800: '#2e1e39',
                  900: '#170f1c',
              },
              orange: {
                  900: '#331d00',
                  800: '#663a00',
                  700: '#995700',
                  600: '#cc7400',
                  500: '#ff9100',
                  400: '#ffa733',
                  300: '#ffbd66',
                  200: '#ffd399',
                  100: '#ffe9cc',
              },
          }),
})

export const themeSettings = (mode) => {
    // const colors = tokens(mode)
    return {
        palette: {
            mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: '#3174dd',
                      },
                      secondary: {
                          main: 'rgba(30, 80, 160, .8)',
                      },
                      background: {
                          primaryOpacity: 'rgba(32,101, 209, .05)',
                          default: '#161C24',
                          main: '#212B36',
                          paper: '#212B36',
                          secondary: '#212B36',
                          disabled: 'rgba(33, 43, 54, 0)',
                      },
                      text: {
                          primary: '#dfebf7',
                          secondary: '#525252',
                      },
                  }
                : {
                      primary: {
                          main: '#3174dd',
                      },
                      secondary: {
                          main: 'rgba(30, 80, 160, .8)',
                      },
                      background: {
                          primaryOpacity: 'rgba(32,101, 209, .05)',
                          default: '#e8edf1',
                          main: '#ffffff',
                          paper: '#ffffff',
                          secondary: '#e8edf1',
                          disabled: 'rgba(33, 43, 54, 0)',
                      },
                      text: {
                          primary: '#212b36',
                          secondary: '#748290',
                      },
                  }),
        },
        components: {
            Paper: {
                styleOverrides: {
                    root: {},
                },
            },
        },
        typography: {
            fontFamily: ['Roboto', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 18,
            },
            h6: {
                fontFamily: ['Roboto', 'sans-serif'].join(','),
                fontSize: 14,
            },
        },
    }
}

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
})

export const useMode = () => {
    const [mode, setMode] = useState(
        localStorage.getItem('colorMode') || 'dark'
    )

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => {
                    const modeOn = prev === 'light' ? 'dark' : 'light'
                    localStorage.setItem('colorMode', modeOn)
                    return modeOn
                })
            },
        }),
        []
    )

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode]
}
