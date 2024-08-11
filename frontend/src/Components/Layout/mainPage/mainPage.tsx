import { Button, Container, Typography, Box, Grid } from '@mui/material';
import "./mainPage.css";
import { useNavigate } from 'react-router-dom';

function MainPage(): JSX.Element {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
      };

      const handleRegisterClick = () => {
        navigate('/Register');
      };
    return  (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
          <Container
            maxWidth="xs"
            sx={{
              textAlign: 'center',
              backgroundColor: 'white',
              padding: 6,
              borderRadius: 2,
              boxShadow: 3,
              
            }}
          >
            <Typography variant="h3" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="h5" gutterBottom>
              Please log in or register to continue
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: 2 }}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: 2 }}
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
    );
}

export default MainPage;
