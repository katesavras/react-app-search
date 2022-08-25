import React, {useEffect, useState} from 'react';
import './index.scss';
import Dropdown from "../Dropdown";

const TextArea = () => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isDropdown, setIsDropdown] = useState(false);
    const [users, setUsers] = useState([]);

    // useEffect( () => {
    //
    // }, [textAreaValue]);

    const filteredUsers = users.filter(({name, email}) => {
        console.log(name, email)
        return (
            name.toLowerCase().includes(textAreaValue.toLowerCase()) ||
            email.toLowerCase().includes(textAreaValue.toLowerCase())
        );
    });

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

    const getAllUsers = async () => {
        const response = await fetch(`https://test-27d12-default-rtdb.firebaseio.com/.json`);
        const body = await response.json();
        console.log(body)
        setUsers(normalizeUsers(body))
        console.log(users)
    };

    const handleChange = async (event) => {
        setTextAreaValue(event.target.value);
        if (event.target.value === '@') {
            setIsDropdown(true)
             await getAllUsers()
            console.log("dropdown")
        } else if (event.target.value === '') {
            setIsDropdown(false)
        }
    };

    const handleItemChange = (email) => {
        setTextAreaValue(email)
        setIsDropdown(false)
    };

    return <div className='textarea'>
    <textarea className='textarea__field' id='person' name='person'
              value={textAreaValue} onChange={handleChange}/>
        {isDropdown && <Dropdown onItemChange={handleItemChange} users={filteredUsers}/>}
    </div>;
};

export default TextArea;
