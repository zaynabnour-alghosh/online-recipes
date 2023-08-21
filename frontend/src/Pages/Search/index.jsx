import SideBar from '../../Components/SideBar';
import Recipe from '../../Components/Recipe';
import './style.css';
import {AiOutlineSearch,AiOutlineArrowRight} from "react-icons/ai";
import { useNavigate } from "react-router-dom";


import { useState,useEffect } from 'react';
import { sendRequest } from '../../config/request';
const Search=()=>{
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter]=useState('');
    const [type, setType]=useState('');

    const handleSearch = async () => {
        const data = new FormData();
        data.append('search', search);
        try {
            const response = await sendRequest({
            method:"POST",
            route: 'user/search-recipe',
            body:data,
            includeHeaders:true
            })
            
            console.log(response)
			setSearch(' ')
				setSearchResults(response.recipes);
                setFilter(response.filter)
                setType(response.type)

			
			} catch (error) {
				console.log(error);
			}
	}
    return(
        <div className=" home page flex">
            <SideBar
                items={["Recipe", "Search", "Shoppinglist","Mealplan"]}
                selected={"Search"}
            />
            <div className="container">
                <div className="top-search flex row">
                    <div className="search primary-bg flex row">
                        <input 
                            type="text" 
                            placeholder='Seach Recipes...' 
                            name="search" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSearch(e);
                                }
                              }}
                            />
                        <AiOutlineSearch  size={50}/>
                    </div>                        
                </div>
                <div className="search-results flex row">
                    {searchResults && <h2>Filter by<AiOutlineArrowRight sixe={20}  className='arrow'/> <span>{type}</span>:<span className="filter">{filter}</span></h2>}
                    <div className="search-container flex row">
                        
                        {searchResults.map((recipe) => (
                            console.log("id: ",recipe.id),
                            <div className="detail" onClick={()=>navigate(`/recipe/${recipe.id}`)}>
                                <Recipe
                                    key={recipe.id}
                                    recipe={recipe}
                                />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;