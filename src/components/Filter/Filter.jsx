import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './FilterConfig';
import { Typography } from '@mui/material';
import { filterContacts } from 'redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  
  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography component='h1' variant='h5' sx={{ mb: 1 }}>
        My contacts
      </Typography>
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
            onChange={e => dispatch(filterContacts(e.target.value))}
          />
        </Search>
      </Toolbar>
    </Box>
  );
}