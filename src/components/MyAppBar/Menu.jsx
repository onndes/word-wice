import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, useMediaQuery } from '@mui/material'
import MenuBook from '@mui/icons-material/MenuBook'
import School from '@mui/icons-material/School'
import MenuIcon from '@mui/icons-material/Menu'
import { LEARN_WORDS_ROUTE, MENU_ROUTE, WORDS_ROUTE } from '../../utils/consts'

const tabs = [
    { label: 'Words', to: WORDS_ROUTE, icon: <MenuBook /> },
    { label: 'Learn', to: LEARN_WORDS_ROUTE, icon: <School /> },
    { label: 'Menu', to: MENU_ROUTE, icon: <MenuIcon /> },
]

const Menu = () => {
    const mq = useMediaQuery('(max-width:900px)')
    const [value, setValue] = React.useState(0)

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }
    return (
        <Tabs
            value={value}
            onChange={handleChange}
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
