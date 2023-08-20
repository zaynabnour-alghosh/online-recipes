import SideBar from '../../Components/SideBar';
import Recipe from '../../Components/Recipe';
import './style.css';
import { useParams } from "react-router-dom";

const Home=()=>{
  
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
            <button  className='newRecipe'>New Recipe</button>

        </div>
        
				
				
        {/* <Recipe showModal={showModal} toggleModal={toggleModal} /> */}
				<div className="recipes-container flex row">
				     {/* {meetings.map((meeting) => (
					    <MeetingItem
						   key={meeting.id}
						   meeting={meeting}
					    />
				    ))} */}
            <Recipe />
				</div>
        
			</div>
		</div>
  );
}

export default Home;