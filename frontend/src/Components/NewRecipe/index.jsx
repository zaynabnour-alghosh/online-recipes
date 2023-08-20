import "./style.css"
import ModalComponent from "../Modal";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendRequest } from "../../config/request";

const NewRecipe=({showModal , toggleModal})=>{
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState([]);
    const [isAddIngredientClicked, setIsAddIngredientClicked] = useState(false);
    const handleIngredientChange = (e) => {
        e.preventDefault();
        const newIngredient =ingredient.trim();
        if (newIngredient) {
            setIngredients([...ingredients, newIngredient]);
            setIngredient('');
          }
      };
    const handleImageChange = (e) => {
    const selectedImage = Array.from(e.target.files);
    setImage([...image, ...selectedImage]);
    };
    const handlePostRecipe=async(e)=>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('cuisine', cuisine);

        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}]`, ingredient);
        });
        
        image.forEach((img, index) => {
            formData.append(`image[${index}]`, img);
        });
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/user/post-recipe",
                body:formData,
            });

            if(response){
                setName('');
                setCuisine('');
                setIngredients([]);
                setImage([]);
                console.log(response);
                navigate(`/home`)
                toggleModal();
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        if (isAddIngredientClicked) {
          handlePostRecipe();
          setIsAddIngredientClicked(false);
        }
      }, [isAddIngredientClicked]);
    return(
        <ModalComponent showModal={showModal} onRequestClose={toggleModal}>
            <div className="create-recipe">
                <h1>New Recipe</h1>
                <div className="create-recipe__input">
                   <label htmlFor="name">Name</label>
                   <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="create-recipe__input">
                   <label htmlFor="cuisine">Cuisine</label>
                   <input 
                        type="text" 
                        name="cuisine" 
                        id="cuisine" 
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        />
                </div>
                <div className="create-recipe__input">
                    <label htmlFor="ingredients">Ingredients</label>
                    <input
                        type="text"
                        name="ingredient"
                        id="ingredients"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleIngredientChange(e);
                            }
                          }}
                    />
                    <ul>
                        {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="create-recipe__input">
                    <label htmlFor="images">Images</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <ul>
                        {image.map((img, index) => (
                        <li key={index}>{img.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="create-recipe__buttons">
                  <button className="cancel-button" onClick={toggleModal}>Cancel</button>
                  <button className="confirm-button" onClick={() => setIsAddIngredientClicked(true)}>Add</button>
                </div>
            </div>
        </ModalComponent>
    );
}
export default NewRecipe;