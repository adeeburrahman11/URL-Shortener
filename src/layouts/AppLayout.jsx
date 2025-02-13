import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="mx-10">
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>
      </div>
      <div>
        <div className="p-10 text-center bg-gray-800 mt-10">Made by me</div>
      </div>
    </>
  );
};

export default AppLayout;
