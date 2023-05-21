import { AnimatePresence } from "framer-motion";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "./Home";
import AboutUs from "./About Us/AboutUs";

function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
}

export default Routes;
