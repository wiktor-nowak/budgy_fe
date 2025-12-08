import { Outlet } from "react-router-dom";

const Outside = () => {
  return (
    <main className="w-full max-w-md mx-auto flex flex-col justify-center">
      <Outlet />
    </main>
  );
};

export default Outside;
