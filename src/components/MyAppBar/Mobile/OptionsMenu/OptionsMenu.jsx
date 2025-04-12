import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort'
import { Box, IconButton } from '@mui/material'
import Filters from './Filters'
import Toolbar from './Toolbar'
import Sort from './Sort'
import useMyTheme from '../../../../hooks/useMyTheme'

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2),
        minWidth: 180,

        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            // eslint-disable-next-line max-len
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}))

const options = {
    filters: { type: 'filter', title: 'Filter' },
    sort: { type: 'sort', title: 'Sort' },
}

export default function OptionsMenu() {
    const { t } = useMyTheme()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [openOptions, setOpenOptions] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setOpenOptions(null)
    }

    return (
        <div>
            <IconButton
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {openOptions && (
                    <Toolbar
                        handle={setOpenOptions}
                        title={openOptions.title}
                    />
                )}
                {!openOptions && (
                    <Box>
                        <MenuItem
                            onClick={() => setOpenOptions(options.filters)}
                            disableRipple
                        >
                            <FilterAltIcon />
                            {t(options.filters.title)}
                        </MenuItem>

                        <MenuItem
                            onClick={() => setOpenOptions(options.sort)}
                            disableRipple
                        >
                            <SortIcon />
                            {t(options.sort.title)}
                        </MenuItem>
                    </Box>
                )}

                {openOptions && (
                    <Box p={1}>
                        {openOptions?.type === options.filters.type && (
                            <Filters />
                        )}
                        {openOptions?.type === options.sort.type && <Sort />}
                    </Box>
                )}
            </StyledMenu>
        </div>
    )
}
