import './index.scss';
import DropdownItem from "../DropdownItem";
import {useEffect, useState} from "react";


const Dropdown = ({onItemChange, users, topPos, leftPos, getDropdownEl}) => {
    const [dropDown, setDropDown] = useState();

    useEffect( () => {
        setDropDown(document.querySelector('.dropdown'))
        getDropdownEl(dropDown)
    }, );

    const handleItemClick = (email) => {
        onItemChange(email)
    };

    return <ul className='dropdown' style={{top: `${topPos}px`, left: `${leftPos}px`}}>
        {users.map((user) => {
            return <DropdownItem key={user.key} user={user} onItemClick={handleItemClick}/>;
        })}
    </ul>;
};

export default Dropdown;
