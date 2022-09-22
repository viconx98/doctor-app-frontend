import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const TextButton = styled(Button)(({ theme }) => {
    return {
        color: "gray",
        fontSize: "16px",
        backgroundColor: "transparent",
        padding: "8px",
        borderRadius: "8px",
        fontWeight: "normal",
        textTransform: "none",
        
        "&:hover": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main
        },
        "&:active": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main
        }
    }
})

export default TextButton