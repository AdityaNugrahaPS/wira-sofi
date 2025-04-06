import { Layout, LayoutNavBar } from "../layouts/Layout";
import * as Pages from "../pages/all-in/page";
import * as AdminPage from "../pages/all-in/admin-page";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <RouterRoutes>
        {/* Route tanpa layout */}
        {/* <Route path="/admin-dashboard" element={<AdminPage.AdminDashboard />} /> */}

        {/* Route Intro pakai Layout biasa */}
        <Route path="/" element={<Layout><Pages.Intro /></Layout>} />

        {/* Route lainnya pakai LayoutNavBar */}
        <Route path="/admin-login" element={<Layout><AdminPage.LoginAdminPage /></Layout>} />
        <Route path="/opening" element={<LayoutNavBar><Pages.Opening /></LayoutNavBar>} />
        <Route path="/quotes" element={<LayoutNavBar><Pages.Quotes /></LayoutNavBar>} />
        <Route path="/bride" element={<LayoutNavBar><Pages.Bride /></LayoutNavBar>} />
        <Route path="/groom" element={<LayoutNavBar><Pages.Groom /></LayoutNavBar>} />
        <Route path="/story" element={<LayoutNavBar><Pages.Story /></LayoutNavBar>} />
        <Route path="/gallery" element={<LayoutNavBar><Pages.Gallery /></LayoutNavBar>} />
        <Route path="/rsvp" element={<LayoutNavBar><Pages.Rsvp /></LayoutNavBar>} />
        <Route path="/invited" element={<LayoutNavBar><Pages.Invited /></LayoutNavBar>} />
        <Route path="/thanks" element={<LayoutNavBar><Pages.Thanks /></LayoutNavBar>} />
      </RouterRoutes>
    </Router>
  );
};

export default AppRoutes;
