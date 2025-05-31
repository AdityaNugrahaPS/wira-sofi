import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userRoutes from "./routes/userRoutes";



function App() {
  return (
    <Router>
      <Routes>
        {userRoutes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
