import './style.css';
import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Recipe=({recipe})=>{
    const { id, name,cuisine,owner,ingredients,images,nb_likes} = recipe;
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
  return (
    <div className=" recipe flex">
			<div className="recipe-container">
				<div className="recipe-card flex column"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                <Carousel>
                    {recipe.images.map((image, index) => (
                        <div>
                            <img
                            key={index}
                            src={`http://localhost:8000/storage/recipe_images/${image}`}
                            alt={`Recipe ${index}`}
                        />
                        </div>
                    ))}
                </Carousel> 
                <div className="recipe-details">
                    <h2>{recipe.name}</h2>
                    <p>Cuisine: <span>{recipe.cuisine}</span></p>
                </div>
                {isHovered && 
                <div className={`card-details ${isHovered ? 'visible' : ''}`}>
                    <div className="details-recipe flex column">
                        <span>Ingredients:</span>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                            ))}
                        </ul>        
                    </div>
                </div>}
                <div className="interaction-icons flex row">
                    <div className="icons flex">
                        <FaHeart className="icon like-icon" /> {recipe.nb_likes}
                    </div>
                    <div className="icons flex">
                        <FaComment className="icon comment-icon" />3
                    </div>
                </div>
            </div>
        </div>
	</div>
  );
}

export default Recipe;