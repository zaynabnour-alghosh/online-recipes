import './style.css';
import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Recipe=()=>{
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
                
                    {/* {recipe.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Recipe ${index}`}
                        className={index === currentImageIndex ? 'active' : ''}
                    />
                    ))} */}

                <Carousel>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSameQDIUO8yGlvEjFPAScLquCTlLBW_uRgQg&usqp=CAU" alt="img3" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTREbMjlXCnsEMbWw0YciweFqcyIiLf_CqgYA&usqp=CAU" alt="img2" />
                    </div>
                </Carousel> 
                <div className="recipe-details">
                    {/* <h2>{recipe.name}</h2> */}
                    <h2>Kafta</h2>

                    <p>Cuisine: <span>Lebanese</span></p>
                    {/* <p>Cuisine: {recipe.cuisine}</p> */}
                </div>
                {isHovered && 
                <div className={`card-details ${isHovered ? 'visible' : ''}`}>
                    <div className="details-recipe flex column">
                        <span>Ingredients:</span>
                        <ul>
                            <li>basal</li>
                            <li>la7me</li>
                            <li>banadoura</li>
                        </ul>        
                    </div>
                </div>}
                <div className="interaction-icons flex row">
                    <div className="icons flex">
                        <FaHeart className="icon like-icon" /> 12
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