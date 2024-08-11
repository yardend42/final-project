import "./Footer.css";
import { Box, Typography } from '@mui/material';

function Footer(): JSX.Element {
  return (
    <div className="Footer">
  <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="body1">© 2024 Vacation Site. All rights reserved to Yarden.D</Typography>
    </Box>    </div>
  );
}

export default Footer;
