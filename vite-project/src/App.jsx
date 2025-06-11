import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CompareProvider } from "./contexts/CompareContext";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <CompareProvider>
      <FavoritesProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </CompareProvider>
  );
}

export default App;
