import './index.scss';
import {useState} from "react";

const DropdownItem = ({user: {key, name, email}, onItemClick}) => {
    const handleItemClick = () => {
        onItemClick(email)
    };

    return <li className='dropdown-item' onClick={handleItemClick}>
        <div className='dropdown-item__img'>
            {/*<img src="" alt="picture"/>*/}
        </div>
        <h2 className='dropdown-item__name'>{name}</h2>
        <p className='dropdown-item__email'>{email}</p>
    </li>;
};

export default DropdownItem;
