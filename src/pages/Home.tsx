import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div>
      <Header />
      <Dashboard />
      <Toaster position="top-center" />
    </div>
  );
};

export default Home;
