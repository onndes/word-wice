/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { List } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MenuBook from '@mui/icons-material/MenuBook'
import School from '@mui/icons-material/School'
import ListItemDrawer from './ListItemDrawer'
import {
    HOME_ROUTE,
    LEARN_WORDS_ROUTE,
    VOCABULARY_ROUTE,
} from '../../utils/consts'

const DrawerMenu = () => {
    return (
        <List>
            <ListItemDrawer
                text="Home"
                icon={() => <HomeIcon />}
                to={HOME_ROUTE}
            />
            <ListItemDrawer
                text="Vocabulary"
                icon={() => <MenuBook />}
                to={VOCABULARY_ROUTE}
            />
            <ListItemDrawer
                text="Learn words"
                icon={() => <School />}
                to={LEARN_WORDS_ROUTE}
            />
        </List>
    )
}

export default DrawerMenu
