import './index.scss';
import DropdownItem from "../DropdownItem";

const Dropdown = ({onItemChange, users}) => {

    const handleItemClick = (email) => {
        onItemChange(email)
    };

    return <ul className='dropdown'>
        {users.map((user) => {
            return <DropdownItem key={user.key} user={user} onItemClick={handleItemClick}/>;
        })}
    </ul>;
};

export default Dropdown;
