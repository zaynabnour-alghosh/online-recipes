import SideBar from '../../Components/SideBar';
import './style.css';

const Home=()=>{
  return (
    <div className=" home page flex">
			<SideBar
				items={["Recipe", "Search", "Shoppinglist","Mealplan"]}
				selected={"Recipe"}
			/>
			<div className="container">
				{/* <button onClick={toggleModal}>Create Meeting</button>
				<CreateMeeting showModal={showModal} toggleModal={toggleModal} />
				<div className="meetings-container">
				     {meetings.map((meeting) => (
					    <MeetingItem
						   key={meeting.id}
						   meeting={meeting}
					    />
				    ))}
				</div> */}
        <h1>Home page</h1>
			</div>
		</div>
  );
}

export default Home;