import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setIsAuth, setUser } from '../features/auth/authSlice';
import { getAToken, getRToken } from '../utils/getTokens';
import Header from '../components/navigation/Header';
import decodeAToken from '../utils/decodeAToken';

const Root: React.FunctionComponent = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const aToken = getAToken();
  const rToken = getRToken();
  useEffect(() => {
    if (aToken) {
      dispatch(setIsAuth(true));
      const decodedUser = decodeAToken();
      if (decodedUser) {
        dispatch(
          setUser({
            user: {
              firstname: decodedUser.firstname,
              lastname: decodedUser.lastname,
              id: decodedUser.id,
              email: decodedUser.email,
            },
          }),
        );
      }
      // navigate('/');
    } else if (rToken) {
      dispatch(setIsAuth(true));
      // navigate('/');
    } else {
      navigate('/login');
      dispatch(setIsAuth(false));
    }
  }, [aToken, dispatch, rToken]);
  return (
    <>
      {isAuth && <Header />}
      {/* {!isAuth && <Navigate to="/login" />} */}
      {isAuth && <Outlet />}
    </>
  );
};

export default Root;
