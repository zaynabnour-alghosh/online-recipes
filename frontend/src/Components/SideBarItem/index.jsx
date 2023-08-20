import React, { useState } from "react";
import "./style.css";
import {BiFoodMenu} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BsCalendarDate} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItem = ({ label, selected, onSelected }) => {
	const navigation = useNavigate();
	const location = useLocation();
	const base_location = location.pathname.split("/")[1];
	const clickHandler = () => {
		onSelected(label);
		if (label==="Recipe"){
			navigation(`/home`);
		}
		else if (label==="Search"){
			navigation(`/search`);
			
		}
		else if (label==="Shoppinglist"){
			navigation(`/shoppinglist`);
			
		}
		else if (label==="Mealplan"){
			navigation(`/mealplan`);
			
		}
	};

	let icon;
	if (label === "Recipe") {
		icon = <BiFoodMenu />;
	} else if (label === "Search") {
		icon = < AiOutlineSearch/>;
	} else if (label === "Shoppinglist") {
		icon = <AiOutlineShoppingCart />;
	} else if (label === "Mealplan") {
		icon = <BsCalendarDate />;
	} 
	return (
		<div
			className={selected ? `sidebar-item active` : `sidebar-item`}
			onClick={() => clickHandler()}
		>
			{icon}
			{label}
		</div>
	);
}

export default SideBarItem;
