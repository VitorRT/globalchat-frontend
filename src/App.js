import React, { useState, useEffect } from 'react';
import AppRoutes from './router/router';

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const user = localStorage.getItem('user');
      if (user) {
        setLogged(true);
        setUser(JSON.parse(user));
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AppRoutes logged={logged} setLogged={setLogged} user={user} />
    </>
  );
}

export default App;
