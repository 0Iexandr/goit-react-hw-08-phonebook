import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { logOut } from 'redux/auth/operations';

export function Header({toogleTheme}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position='fixed'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            Phonebook
          </Typography>
          <div>
          <Typography variant='subtitle1' color='inherit' noWrap>
            Welcome, {user.name}
          </Typography>
          </div>
          <IconButton sx={{ ml: 1 }}  color='inherit' onClick={() => toogleTheme()}>
            {false ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button href='#' variant='outlined' color='error' sx={{ my: 1, mx: 1.5 }} onClick={() => dispatch(logOut())}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};