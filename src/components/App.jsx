import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { refreshUser } from 'redux/auth/operations';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/auth/selectors';
import { Loader } from './Loader/Loader';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));
const ContactsPage = lazy(() => import('../pages/HomePage'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={isLoggedIn ? <ContactsPage /> : <SignIn />} />
        <Route
          path='/register'
          element={
            <RestrictedRoute
              redirectTo='/contacts'
              component={<SignUp />}
            />
          }
        />
        <Route
          path='/login'
          element={
            <RestrictedRoute redirectTo='/contacts' component={<SignIn />} />
          }
        />
        <Route
          path='/contacts'
          element={
            <PrivateRoute redirectTo='/login' component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};
