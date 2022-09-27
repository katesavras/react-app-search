import React from "react";
// import {useState, useRef, useEffect} from "react";
import {offset, position} from "caret-pos";

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(evt) {
        if (evt.keyCode === 9) {
            evt.preventDefault();
            this.props.onTabPress();
        }
    }

    onChange(evt) {
        let cursorPos = position(this.textarea)
        const text = evt.target.value;
        let beforeText = text.substring(0, evt.target.selectionStart)
        let arrayText = beforeText.split(' ');
        let lastArrayElement = arrayText[arrayText.length - 1]
        let spanObj = document.createElement('span');
        spanObj.innerHTML = lastArrayElement;
        this.textWrap.appendChild(spanObj);
        console.log(this.textWrap.clientWidth)
        this.props.onChange(text, evt.target.selectionStart, cursorPos, this.textWrap.offsetWidth);
        spanObj.innerHTML = '';
    }

    focus(pos) {
        if (this.textarea) {
            this.textarea.focus();
        }
        if (pos) {
            this.textarea.selectionEnd = pos;
        }
    }

    render() {
        return<div>
               <div  className="textwrap"  ref={_ => this.textWrap = _}></div>
                 <textarea value={this.props.text} maxLength='100'
                           onChange={this.onChange.bind(this)}
                           onKeyDown={this.onKeyDown}
                           ref={_ => this.textarea = _}
                           className="textinput"
                 />
        </div>

    }
}

// const TextInput = (props) => {
//     const [text, setText] = useState('');
//     let textareaRef = useRef() ;
//     console.log(textareaRef)
//
//     const onKeyDown = (evt) => {
//         if (evt.keyCode === 9) {
//             evt.preventDefault();
//             props.onTabPress();
//         }
//     }
//
//     const onChange = (evt) => {
//         setText(evt.target.value)
//         props.onChange(text, evt.target.selectionStart);
//     }
//
//     const focus = (pos) => {
//         if (textareaRef) {
//             textareaRef.focus();
//         }
//         if (pos) {
//             textareaRef.selectionEnd = pos;
//         }
//     }
//
//
//     return <textarea value={props.text}
//                      onChange={onChange}
//                      onKeyDown={onKeyDown}
//                      ref={textareaRef}
//                      className="textinput"
//                      placeholder="Type message here"
//     />
// }
export default TextInput;