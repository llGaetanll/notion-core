import React, { useState } from "react";

import { Box, MenuItem, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    sideBar: {
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        // padding: `0 ${theme.spacing(1)}px`,
        height: "100%",
        width: 225,
        background: theme.palette.grey[100],
        borderRight: `3px solid ${theme.palette.grey[300]}`
    }
}));

const SideBar = () => {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.sideBar}>
                <WorkSpaceSelect />
            </Box>
            <Box />
        </Box>
    );
};

const WorkSpaceSelect = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Box onClick={() => setIsOpen(true)}>
                <WorkSpaceBadge name="Personal" />
            </Box>
            {isOpen ? <Box></Box> : null}
        </>
    )
}

const WorkSpaceBadge = ({ icon, name }) => <Box>
    <Typography>{name}</Typography>
</Box>

export default SideBar;
