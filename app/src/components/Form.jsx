import React, {Component} from 'react'

export default class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buffer: props.buffer
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.buffer !== nextProps.buffer) {
            this.setState({
                buffer: nextProps.buffer
            })
        }
    }

    onChange(e, index) {
        let buffer = [...this.state.buffer]
        let value = e.target.value.toUpperCase()
        if (value === '' || /^[0-9A-F]{1,2}$/gm.test(value)) {
            buffer[index] = value
            this.props.changeAction(buffer)
            this.setState({
                buffer
            })
        }
    }

    render() {
        const itemsRender = this.state.buffer.map((item, index) => {
            return (
                <label key={this.props.className + index}>
                    <input type="text" maxLength="2" value={item} pattern="[A-F\d]+" readOnly={this.props.readOnly}
                           onChange={(e) => this.onChange(e, index).bind(this)}/>
                </label>
            )
        })

        return (
            <form>
                {itemsRender}
            </form>
        )
    }
}
