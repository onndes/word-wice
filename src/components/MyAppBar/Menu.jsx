import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab, Tabs, useMediaQuery } from '@mui/material'
import MenuBook from '@mui/icons-material/MenuBook'
import School from '@mui/icons-material/School'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import {
    LEARN_WORDS_ROUTE,
    MENU_ROUTE,
    PROFILE_ROUTE,
    WORDS_ROUTE,
} from '../../utils/consts'

const tabs = [
    { label: 'Profile', to: PROFILE_ROUTE, icon: <PersonIcon /> },
    { label: 'Words', to: WORDS_ROUTE, icon: <MenuBook /> },
    { label: 'Learn', to: LEARN_WORDS_ROUTE, icon: <School /> },
    { label: 'Menu', to: MENU_ROUTE, icon: <MenuIcon /> },
]

const Menu = () => {
    const mq = useMediaQuery('(max-width:900px)')
    const location = useLocation()
    const [value, setValue] = React.useState(0)

    useEffect(() => {
        const path = `/${location.pathname.split('/', 2)[1]}`
        const idx = tabs.findIndex((tab) => tab.to === path)
        setValue(idx === -1 ? 0 : idx)
    }, [location])

    return (
        <Tabs
            value={value}
            aria-label="tabs"
            indicatorColor="secondary"
            textColor="secondary"
            variant={mq ? 'fullWidth' : 'standard'}
        >
            {tabs.map((tab, index) => {
                return (
                    <Tab
                        key={tab.label}
                        label={tab.label}
                        icon={tab.icon}
                        to={tab.to}
                        component={Link}
                        iconPosition={mq ? 'top' : 'start'}
                        value={index}
                    />
                )
            })}
        </Tabs>
    )
}

export default Menu
