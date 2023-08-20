import SideBar from '../../Components/SideBar';
import Recipe from '../../Components/Recipe';
import './style.css';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import NewRecipe from '../../Components/NewRecipe';
import { sendRequest } from '../../config/request';

const Home=()=>{
  const [showModal, setShowModal] = useState(false);
  
  const [recipes, setRecipes]=useState([])
	const toggleModal = () => {
		setShowModal(!showModal);
	};
  useEffect(() => {
		const getRecipes = async () => {
			try {
				const response = await sendRequest({
          method:"POST",
          route: 'user/view-my-recipes',
          body:" ",
          includeHeaders:true
        })
        console.log(response)
			if (response.status === 'Success') {
				setRecipes(response.recipes);
				console.log(response.recipes);
			}
			} catch (error) {
				console.log(error);
			}
		}
		getRecipes();
	}, []);
  const {username} = useParams();
    const user=username;
    console.log(user);
  return (
    <div className=" home page flex">
			<SideBar
				items={["Recipe", "Search", "Shoppinglist","Mealplan"]}
				selected={"Recipe"}
			/>
			<div className="container">
        <div className="top flex row">
            <div className="username primary-bg flex ">
              username:<span className='user'>{user}</span></div>
            <button onClick={toggleModal} className='newRecipe'>New Recipe</button>
            <NewRecipe showModal={showModal} toggleModal={toggleModal}/>
        </div>
        
				
				
        {/* <Recipe showModal={showModal} toggleModal={toggleModal} /> */}
				<div className="recipes-container flex row">
				     {recipes.map((recipe) => (
					    <Recipe
						   key={recipe.id}
						   recipe={recipe}
					    />
				    ))}
            
				</div>
        
			</div>
		</div>
  );
}

export default Home;