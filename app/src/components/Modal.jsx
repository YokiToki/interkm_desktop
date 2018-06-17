import React, {Component} from 'react'
import Form from './Form.jsx'

export default class Modal extends Component {

    onChangeName(e) {
        this.props.data.name = e.target.value
        this.forceUpdate()
    }

    onChangeBuffer(buffer) {
        this.props.data.buffer = buffer
        this.forceUpdate()
    }

    render() {
        const {title, index, name, buffer} = this.props.data
        const className = title.toLowerCase().replace(' ', '-')

        // changeAction={this.props.changeAction}
        return (
            <div className="overlay hidden">
                <div className="modal">
                    <h3>{title} item</h3>
                    <div className="view-form">
                        <label>
                            <input type="text" placeholder="Type name..." value={name}
                                   onChange={(e) => this.onChangeName(e).bind(this)}/>
                        </label>
                        <Form className={className} buffer={buffer} readOnly={false}
                              changeAction={this.onChangeBuffer.bind(this)}/>
                        <div className="modal-buttons">
                            <button onClick={() => this.props.saveAction(name, buffer, index)} type="button"
                                    className="btn btn-positive">Save
                            </button>
                            <button onClick={this.props.cancelAction} type="button" className="btn btn-default">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}