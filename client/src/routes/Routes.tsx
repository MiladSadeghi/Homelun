import { AnimatePresence } from "framer-motion";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "./Home";
import AboutUs from "./About Us";
import Agents from "./Agents";
import ContactUs from "./Contact Us";
import NotFound from "./NotFound";
import Agent from "./Agent";
import { useEffect } from "react";
import Faqs from "./Faqs";
import Privacy from "./Privacy";
import Terms from "./Terms";
import PropertyListing from "./PropertyListing";

function Routes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    console.log(location);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="agents" element={<Agents />} />
          <Route path="agents/:slug" element={<Agent />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms-of-service" element={<Terms />} />
          <Route path="listings/:slug" element={<PropertyListing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
}

export default Routes;
