import './App.scss';
import React from 'react';
import TextInput from "./components/TextInput";
import MentionList from "./components/MentionList";
import {findMentionQuery, findMentionQueryStart, findMentionQueryEnd, debounce, searchGithubUsers, isValidUserIDChar} from "./components/Utils/index";
// import React from "@types/react";
// import TextArea from "./components/TextArea";
// import Mentions from "./components/Mentions";

// function App() {
//     return (
//         <div className="App">
//             {/*<TextArea/>*/}
//             {/*<Mentions/>*/}
//         </div>
//     );
// }


class App extends React.Component{
    constructor(){
        super();
        this.state = {text: '', queryStart: null, mentions:[]};
        this.queryUsers = debounce(this.queryUsers, 400);
    }

    onTextChange(text, pos){
        const queryStart = findMentionQueryStart(text, pos);
        this.setState({text,queryStart}, () =>{
            if(queryStart){
                const query = findMentionQuery(text, queryStart);
                if(query)
                    this.queryUsers(query);
            }
        });
    }

    queryUsers(query){
        searchGithubUsers(query)
            .then(mentions => {
                mentions && this.setState({mentions});
            });
    }

    onMentionSelect(user){
        this.completeMention(user);
    }

    completeMention(user){
        const {text, queryStart} = this.state;
        const queryEnd = findMentionQueryEnd(text, queryStart);
        const left = text.substring(0, queryStart);
        const right = text.substring(queryEnd);
        this.setState({text: left + user.login + right, queryStart: null});
        this.textInput.focus(left.length + user.login.length);
    }

    onTabPress(){
        const {text, queryStart, mentions} = this.state;
        if(queryStart && mentions && mentions.length > 0){
            this.completeMention(mentions[0]);
        }
    }

    render(){
        const {text, mentions, queryStart} = this.state;
        return <div className="container">
            <div className="input-wrapper">
                {queryStart ?
                    <MentionList
                        mentions ={mentions}
                        onSelect={this.onMentionSelect.bind(this)}/>: null}
                <TextInput text={text}
                           ref={_ => this.textInput = _}
                           onChange={this.onTextChange.bind(this)}
                           onTabPress={this.onTabPress.bind(this)}/>
            </div>
        </div>
    }
}

export default App;


// class TextInput extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {text: ''};
//         this.onKeyDown = this.onKeyDown.bind(this);
//     }
//     render(){
//         return <textarea value={this.props.text}
//                          onChange={this.onChange.bind(this)}
//                          onKeyDown={this.onKeyDown}
//                          ref={_ => this.textarea = _}
//                          className="textinput" placeholder="Type message here"/>
//     }
//
//     onKeyDown(evt){
//         if(evt.keyCode === 9){
//             evt.preventDefault();
//             this.props.onTabPress();
//         }
//     }
//
//     onChange(evt){
//         const text = evt.target.value;
//         this.props.onChange(text, evt.target.selectionStart);
//     }
//
//     focus(pos){
//         if(this.textarea){
//             this.textarea.focus();
//         }
//         if(pos){
//             this.textarea.selectionEnd = pos;
//         }
//     }
// }

// function MentionList({mentions, onSelect}){
//     const usersLi = mentions.map(u =>
//         <li onClick={_ => onSelect(u)} key={u.login}>
//             <img src={u.avatar_url}/>
//             <span>{u.login}</span>
//         </li>);
//
//     return <ul className="mentions">
//         {usersLi.length === 0 ? <li className="no-match">No match found</li> : usersLi}
//     </ul>;
// }

// function findMentionQueryStart(text, pos){
//     var i = pos-1;
//     while(i>=0 && isValidUserIDChar(text[i])){
//         i--;
//     }
//
//     if(i<0)return null;
//
//     if(text[i] === '@') return i+1;
//     return null;
// }
//
// function findMentionQueryEnd(text, start){
//     let i=start;
//     while(i<text.length && isValidUserIDChar(text[i])){
//         i++;
//     }
//     return i;
// }
//
// function findMentionQuery(text, start){
//     const end = findMentionQueryEnd(text, start);
//     return text.substring(start, end);
// }
//
// function isValidUserIDChar(char){
//     return char.match(/[a-z]/i);
// }
//
// function searchGithubUsers(q){
//     return fetch('https://api.github.com/search/users?q=' + q)
//         .then(res => res.json())
//         .then(json => json.items)
// }
//
// function debounce(func, wait, immediate) {
//     var timeout;
//     return function() {
//         var context = this, args = arguments;
//         var later = function() {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// };