import {Box, Container} from '@mui/material';
import { Link } from 'react-router-dom';



const Toolbar = () => {
  return (
    <>
      <Box>
        <Container sx={{paddingBottom: 2}}>
          <Link to='/'>News</Link>
        </Container>
      </Box>
    </>
  );
};

export default Toolbar;