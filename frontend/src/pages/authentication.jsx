import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';



const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
  },
});

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            // Handle network errors and API errors
            let errorMessage = "An error occurred. Please try again.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            } else if (err.code === 'ERR_NETWORK' || err.code === 'ERR_CONNECTION_REFUSED') {
                errorMessage = "Cannot connect to server. Please check your connection and ensure the backend is running.";
            }
            setError(errorMessage);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: '400px',
                            height: '400px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            top: '-200px',
                            left: '-100px',
                        },
                    }}
                >
                    <Box sx={{ color: 'white', zIndex: 1, textAlign: 'center', p: 4 }}>
                        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>Welcome Back!</Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>Connect with your team instantly</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '450px',
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon sx={{ fontSize: 30 }} />
                        </Avatar>

                        <Box sx={{ display: 'flex', gap: 1, mb: 3, borderRadius: '50px', bgcolor: '#f5f5f5', p: 0.5 }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "text"} 
                                onClick={() => { setFormState(0) }} 
                                sx={{ 
                                    borderRadius: '50px', 
                                    px: 4,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    ...(formState === 0 && { boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' })
                                }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "text"} 
                                onClick={() => { setFormState(1) }} 
                                sx={{ 
                                    borderRadius: '50px', 
                                    px: 4,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    ...(formState === 1 && { boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' })
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Full Name"
                                name="fullname"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />

                            <p style={{ color: "red" }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ 
                                    mt: 3, 
                                    mb: 2, 
                                    py: 1.5, 
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                                    '&:hover': { 
                                        boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
                                        transform: 'translateY(-2px)'
                                    } 
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar

                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}