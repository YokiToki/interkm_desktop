import React, {Component} from 'react';

export default class Tr extends Component {
    render() {
        return (
            <tr onClick={this.props.action}>
                <td>{this.props.index + 1}</td>
                <td>{this.props.name}</td>
                <td>{this.props.value}</td>
            </tr>
        );
    }
}
