import { FC } from "react"
import { Box, CircularProgress } from "@mui/material";


const FullscreenLoading: FC = () => {
    return <Box mt={0} sx={{
        marginTop: 0,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <CircularProgress />
    </Box>

}

export default FullscreenLoading