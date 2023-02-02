import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from './Header/Header';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { darkTheme, lightTheme } from 'themes/Themes';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';

export const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [theme, setTheme] = useState(lightTheme);
  const toogleTheme = () => {
    setTheme(prev => prev === lightTheme ? darkTheme : lightTheme);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
      {isLoggedIn ? <Header toogleTheme={toogleTheme} /> : null}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </ThemeProvider>
    </div>
  );
};
