import React, {Component} from 'react'

export default class Input extends Component {

    render() {
        return (
            <form className="read">
                <Input/>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <label><input type="text" readOnly="readonly"/></label>
                <button id="read-button" type="button" className="btn btn-primary">Read</button>
            </form>
        )
    }
}
