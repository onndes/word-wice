import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Box } from '@mui/material'

const MyToolbar = ({ numSelected, handleDelete, handleSubmitForStudy }) => {
  
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Vocabulary
                </Typography>
            )}

            {numSelected > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tooltip title="Add to study">
                        <IconButton onClick={handleSubmitForStudy}>
                            <AddBoxIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}

MyToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

export default MyToolbar
