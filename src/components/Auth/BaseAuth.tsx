import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom"

// TODO: Remove the weird margin from top
const BaseAuth: FC = () => {
    return <Box mt={0} sx={{
        marginTop: 0,
        height: "100vh",
        width: "100%",
    }}>
        <Outlet />
    </Box>
}

export default BaseAuth