import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { WeddingProvider } from "./contexts/WeddingContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <WeddingProvider>
        <Router>
          <Routes>
            {userRoutes.map(({ path, component: Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
            {adminRoutes.map(({ path, component: Component }, index) => (
              <Route key={`admin-${index}`} path={path} element={<Component />} />
            ))}
          </Routes>
        </Router>
      </WeddingProvider>
    </AuthProvider>
  );
}

export default App;
