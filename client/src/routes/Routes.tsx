import { AnimatePresence } from "framer-motion";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home";
import AboutUs from "./About Us";
import Agents from "./Agents";
import ContactUs from "./Contact Us";
import NotFound from "./NotFound";

function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="agents" element={<Agents />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
}

export default Routes;
