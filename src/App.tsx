import Layout from "./layouts/Layout";
import * as Pages from "./pages/all-in/page";
import * as AdminPage from "./pages/all-in/admin-page";
// Mengimpor semua halaman sekaligus
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Pages.Intro />} />
          <Route path="/opening" element={<Pages.Opening />} />
          <Route path="/quotes" element={<Pages.Quotes />} />
          <Route path="/bride" element={<Pages.Bride />} />
          <Route path="/groom" element={<Pages.Groom />} />
          <Route path="/story" element={<Pages.Story />} />
          <Route path="/gallery" element={<Pages.Gallery />} />
          <Route path="/rsvp" element={<Pages.Rsvp />} />
          <Route path="/invited" element={<Pages.Invited />} />
          <Route path="/thanks" element={<Pages.Thanks />} />

          {/* Admin Login */}
          <Route path="/admin-login" element={<AdminPage.LoginAdminPage/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
