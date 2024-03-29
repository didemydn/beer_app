import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useState, useEffect, useContext } from "react";
import beerAppService from "../../services/beerApp.service";
import { useNavigate } from "react-router-dom";
import Mylist from "../MyListPage/MyList";

const Profile = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Hello {user.name}!</h1>
            <Mylist/>
        </div>
    )
}

export default Profile;
