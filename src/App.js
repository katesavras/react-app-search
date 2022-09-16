import './App.scss';
import React from 'react';
import TextInput from "./components/TextInput";
import MentionList from "./components/MentionList";
import {findMentionQuery, findMentionQueryStart, findMentionQueryEnd, debounce, searchGithubUsers} from "./components/Utils/index";

class App extends React.Component{
    constructor(){
        super();
        this.state = {text: '', queryStart: null, mentions:[], cursorPos: {}};
        this.queryUsers = debounce(this.queryUsers, 400);
    }

    onTextChange(text, pos, cursorPos){
        const queryStart = findMentionQueryStart(text, pos);
        this.setState({text,queryStart, cursorPos}, () =>{
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
        console.log(text, queryStart, mentions)
        if(queryStart && mentions && mentions.length > 0){
            this.completeMention(mentions[0]);
        }
    }

    render(){
        const {text, mentions, queryStart, cursorPos} = this.state;
        return <div className="container">
            <div className="input-wrapper">
                {queryStart ?
                    <MentionList
                        cursorPos={cursorPos}
                        mentions ={mentions}
                        onSelect={this.onMentionSelect.bind(this)}/>
                    : null}
                <TextInput text={text}
                           ref={_ => this.textInput = _}
                           onChange={this.onTextChange.bind(this)}
                           onTabPress={this.onTabPress.bind(this)}
                />
            </div>
        </div>
    }
}

export default App;