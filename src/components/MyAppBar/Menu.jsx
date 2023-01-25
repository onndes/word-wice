/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { List } from '@mui/material'
import MenuBook from '@mui/icons-material/MenuBook'
import School from '@mui/icons-material/School'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemDrawer from './ItemList'
import {
    LEARN_WORDS_ROUTE,
    MENU_ROUTE,
    VOCABULARY_ROUTE,
} from '../../utils/consts'

const Menu = () => {
    return (
        <List sx={{ display: 'flex' }}>
            <ListItemDrawer
                text="Vocabulary"
                icon={() => <MenuBook />}
                to={VOCABULARY_ROUTE}
            />
            <ListItemDrawer
                text="Learn"
                icon={() => <School />}
                to={LEARN_WORDS_ROUTE}
            />
            <ListItemDrawer
                text="Menu"
                icon={() => <MenuIcon />}
                to={MENU_ROUTE}
            />
        </List>
    )
}

export default Menu
