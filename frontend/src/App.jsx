import { BrowserRouter,Route,Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/utilities.css";
import Authentication from "./Pages/Authentication";
import { useState } from "react";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import RecipeDetails from "./Components/RecipeDetails";
function App() {
  const [user, setUser] = useState({
		username: ""
	});

  return (
    // <div className="App">
    //   <h1>HELLO WORLD</h1>        
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication user={user} setUser={setUser} />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
