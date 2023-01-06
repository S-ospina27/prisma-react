import { Box, Grid, Typography } from "@mui/material";
import Graphics from "../components/common/Graphics";

function Home() {
  return (
    <>
    <Box m={5}>
      <Typography variant="h3" gutterBottom>{"Home"}</Typography>
      
    </Box>
    <Grid item xs={12} sm={6} md={6}>
    <Box >
      <Graphics/>
      
    </Box>
   </Grid> 
    </>
  );
}

export default Home;
