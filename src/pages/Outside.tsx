import { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Outside = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="w-full max-w-md mx-auto p-6">
      {isLogin ? <Login onSwitch={handleSwitch} /> : <Register onSwitch={handleSwitch} />}
    </main>
  );
};

export default Outside;
