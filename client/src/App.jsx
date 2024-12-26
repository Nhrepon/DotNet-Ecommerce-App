import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/style/App.css";
import HomePage from "./page/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
