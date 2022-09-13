import React from "react";

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
        const text = evt.target.value;
        this.props.onChange(text, evt.target.selectionStart);
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
        return <textarea value={this.props.text}
                         onChange={this.onChange.bind(this)}
                         onKeyDown={this.onKeyDown}
                         ref={_ => this.textarea = _}
                         className="textinput"
                         placeholder="Type message here"
        />
    }
}

export default TextInput;