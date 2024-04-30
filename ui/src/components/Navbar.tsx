import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Navbar({ props }: any){
    const navigate = useNavigate();

    return <AppBar position="static">
        <Toolbar>
                <IconButton
                    onClick={() => navigate('/')}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pokedex by Eric
            </Typography>
            <Button onClick={() => navigate('/trainer-collection')} color="inherit" >Trainer’s Collection</Button>
        </Toolbar>
    </AppBar>
}

export default Navbar