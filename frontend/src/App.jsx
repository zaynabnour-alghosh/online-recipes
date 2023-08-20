import { BrowserRouter,Route,Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/utilities.css";
import Authentication from "./Pages/Authentication";
function App() {
  return (
    // <div className="App">
    //   <h1>HELLO WORLD</h1>        
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
