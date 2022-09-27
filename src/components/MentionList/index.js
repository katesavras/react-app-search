import React from "react";

const MentionList = ({cursorPos, mentions, onSelect, textWidth}) => {
    console.log(textWidth)
    const usersLi = mentions.map(u =>
        <li onClick={_ => onSelect(u)} key={u.login}>
            <img src={u.avatar_url}/>
            <span>{u.login}</span>
        </li>);

    return <ul className="mentions" style={{left: `${cursorPos.left - textWidth}px`, top: `${cursorPos.top + cursorPos.height}px`,}}>
        {usersLi.length === 0 ? <li className="no-match">No match found</li> : usersLi}
    </ul>;
}

export default MentionList;
