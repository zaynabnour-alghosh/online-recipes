import './style.css';
import { FaHeart,FaRegHeart, FaComment } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useParams } from "react-router-dom";
import { sendRequest } from '../../config/request';
import { useNavigate } from "react-router-dom";


const RecipeDetails=()=>{
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [isLikedClicked, setIsLikedClicked] = useState(false);


    const {recipeId}=useParams();
    // const recipe_id=id;
    const [detail,setDetail]=useState({
        id: null, 
        name: '', 
        cuisine: '', 
        nb_likes: 0, 
        ingredients: [], 
        owner: '', 
        comment: [],
        images: []});
    const{id,name,cuisine,nb_likes,ingredients,owner,comment,images}=detail;
    const [likes, setLikes] = useState(detail.nb_likes);
    
    // "comment": [
    //     {
    //         "id": 1,
    //         "user_id": 1,
    //         "recipe_id": 44,
    //         "comment_text": "Divine!! looks yummy",
    //         "created_at": "2023-08-19T18:15:03.000000Z",
    //         "updated_at": "2023-08-19T18:15:03.000000Z",
    //         "user": {
    //             "id": 1,
    //             "username": "johnDoe_01",
    //             "email": "john@gmail.com",
    //             "created_at": "2023-08-19T10:33:31.000000Z",
    //             "updated_at": "2023-08-19T10:33:31.000000Z"
    //         }
    //     }
    // ],
   
   
    const viewRecipeDetails=async()=>{
        const data = new FormData();
        data.append('id', recipeId);
        try {
            const response = await sendRequest({
            method:"POST",
            route: 'user/view-recipe',
            body:data,
            includeHeaders:true
            })
            
            console.log(response.recipe)
			
            setDetail(response.recipe);

        }catch(error){
            console.log(error)
        }

    }
    const like = async () => {
        const data = new FormData();
        data.append('recipe_id', recipeId);
        try {
            const response=await sendRequest({
                method:"POST",
                route:"/user/like-recipe",
                body:data,
                includeHeaders:true
            })
            console.log(response)
            if (response.status === 'Successful like' || response.status === 'Successful ulike') {
                setIsLiked(!isLiked); 
                setLikes(response.likes); 
              }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        viewRecipeDetails();
    },[]);
  
   
    const addComment=async()=>{
        const formData = new FormData();
        formData.append('recipe_id', recipeId);
        formData.append('comment', commentText);
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/user/add-comment",
                body:formData,

            })
            if(response){
                setCommentText(' ');
                navigate(`/recipe/${recipeId}`)
                console.log(response.comment)
                
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className=" recipe-detail flex">
			<div className="recipe-detail-container flex column">
				<div className="recipe-detail-card flex row">
                    <Carousel>
                    {detail?.images?.map((image, index) => (
                        <div>
                            <img
                            key={index}
                            src={`http://localhost:8000/storage/recipe_images/${image}`}
                            alt={`Recipe ${index}`}
                        />
                        </div>
                    ))}
                    </Carousel> 
                    <div className="recipe-details-info">
                        <h2>{detail.name}</h2>
                        <p>Cuisine: <span>{detail.cuisine}</span></p>
                        <div className="card-details-ing visible">
                            <div className="detail-recipe flex column">
                                <span>Ingredients:</span>
                                <ul>
                                    {detail?.ingredients?.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>        
                            </div>
                        </div>
                        <div className="interaction-icons flex row">
                            <div className="icons flex">
                                {/* <FaHeart className="icon like-icon"  onClick={() => like()}/> {detail.nb_likes} */}
                                {isLiked ? (
                                <FaHeart className="icon like-icon liked" onClick={() => like()} />
                                    ) : (
                                <FaRegHeart className="icon like-icon" onClick={() => like()} />
                                    )}
                            {likes}
                            </div>
                            <div className="icons flex">
                                <FaComment className="icon comment-icon" />{detail.comment.length}
                            </div>
                        </div>
                    </div>
                    <div className="comments-info flex column">
                        <h2>Comments:</h2>
                        <div className="cmnts flex column">
                            
                            {detail?.comment?.map((c, index) => (
                                        
                                    
                                        <div key={index} className="comment">
                                            <span>{c.user.username} <strong>{c.comment_text}</strong></span>
                                        </div> ))}
                        </div>
                    
                    </div>
            </div>
            <div className='add-comment'>
                <input 
                    type="text" 
                    placeholder='Add comment..'
                    name="commentText"
                    value={commentText}
                    onChange={(e)=>setCommentText(e.target.value)}
                    />
                <button onClick={addComment}>Post</button>
                </div>
        </div>
	</div>
  );
}

export default RecipeDetails;