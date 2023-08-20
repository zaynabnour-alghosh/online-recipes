import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BiLogOut } from "react-icons/bi";
import {BiLeaf} from "react-icons/bi";

import SideBarItem from "../SideBarItem";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ items, selected = items[0] }) => {
	const [selectedTab, setSelectedTab] = useState(selected);
	const location = useLocation();

	const selectHandler = (label) => {
		setSelectedTab(label);
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}
	}, []);

	const logoutButton = useRef();

	const handleLogout = () => {
		logoutButton.current.textContent = "Logging Out...";
		setTimeout(() => {
			localStorage.removeItem("token");
			navigate("/");
		}, 1000);
	};

	return (
		<div className="sidebar">
			<div className="logo">
				<BiLeaf size={40}/>
			</div>
			<div className="items">
				{items?.map((item, index) => {
					return (
						<SideBarItem
							key={index}
							label={item}
							selected={selectedTab === item}
							onSelected={(label) => selectHandler(label)}
						/>
					);
				})}
			</div>
			<div
				className="logout"
				onClick={() => handleLogout()}
				ref={logoutButton}
			>
				<BiLogOut />
				Logout
			</div>
		</div>
	);
};

export default SideBar;
