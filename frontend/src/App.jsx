import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './page/Home';
import Group from './page/Group';
import Login from './page/Login';
import Register from './page/Register';
import { createApiClient } from './api/client';
import { readSession, writeSession } from './auth/session';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(readSession);

  useEffect(() => {
    writeSession(session);
  }, [session]);

  const handleAuthSuccess = ({ token, user }) => {
    setSession({ token, user });
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    setSession({ token: '', user: null });
    navigate('/login', { replace: true });
  };

  const { apiRequest } = useMemo(
    () =>
      createApiClient({
        getToken: () => session.token,
        onUnauthorized: () => {
          setSession({ token: '', user: null });
          navigate('/login', { replace: true });
        },
      }),
    [navigate, session.token]
  );

  const isAuthenticated = Boolean(session.token && session.user);
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage ? (
        <Navbar
          isAuthenticated={isAuthenticated}
          user={session.user}
          onLogout={handleLogout}
        />
      ) : null}

      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login apiRequest={apiRequest} onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Register apiRequest={apiRequest} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home apiRequest={apiRequest} user={session.user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/groups/:groupId"
          element={
            isAuthenticated ? (
              <Group apiRequest={apiRequest} user={session.user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    </>
  );
}

export default App;
