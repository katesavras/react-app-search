import React, {useEffect, useState, useRef} from 'react';
import './index.scss';
import Dropdown from "../Dropdown";
import {position, offset} from "caret-pos";
let prevValue = '';

const TextArea = () => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isDropdown, setIsDropdown] = useState(false);
    const [textArea, setTextArea] = useState();
    const [dropDown, setDropDown] = useState();
    const [users, setUsers] = useState([]);
    const [topCursor, setTopCursor] = useState(0);
    const [leftCursor, setLeftCursor] = useState(0);


    useEffect(() => {
        setTextArea(document.querySelector('.textarea__field'))

        const getAllUsers = async () => {
            const response = await fetch(`https://test-27d12-default-rtdb.firebaseio.com/.json`);
            const body = await response.json();
            setUsers(normalizeUsers(body))
        };

        getAllUsers()
            .catch(console.error);
    }, []);

    const normalizeUsers = (users) => {
        const usersArr = [];

        for (const key in users) {
            usersArr.push({
                key,
                ...users[key],
            });
        }
        return usersArr;
    };

    const handleChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const filteredUsers = users.filter(({name, email}) => {
        return (
            name.toLowerCase().includes(textAreaValue.toLowerCase()) ||
            email.toLowerCase().includes(textAreaValue.toLowerCase())
        );
    });

    const handleItemChange = (email) => {
        let newValue = prevValue + ' ' + email;
        setTextAreaValue(newValue);
        prevValue = newValue;
        setIsDropdown(false)
    };

    const handleLKeyUp = (e) => {
        let pos = position(textArea);

        if (e.key === '@') {
            setTopCursor(pos.top + 55)
            setLeftCursor(pos.left - 21)
            setIsDropdown(true)
        }
    };

    const handleDropdownElement = (el) => {
        setDropDown(el)
    }

    return <div className='textarea'>
    <textarea className='textarea__field'
              value={textAreaValue} onChange={handleChange} onKeyUp={handleLKeyUp}/>
        {isDropdown &&
            <Dropdown onItemChange={handleItemChange} users={users} topPos={topCursor} leftPos={leftCursor}
                      getDropdownEl={handleDropdownElement}/>}
    </div>;
};

export default TextArea;
