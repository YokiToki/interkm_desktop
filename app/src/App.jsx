import React, {Component} from 'react'
import Storage from './Storage'
import Serial from './Serial'
import {} from './assets/css/photon.min.css'
import {} from './assets/css/app.css'
import Form from './components/Form.jsx'
import Tr from './components/Tr.jsx'
import Modal from './components/Modal.jsx'

// [{"name":"Metacom","value":"01:FF:FF:FF:FF:FF:FF:2F"},{"name":"Cyfral","value":"01:00:00:00:00:00:00:3D"},{"name":"Visit","value":"01:BE:40:11:5A:36:00:1E"}]

export default class App extends Component {

    constructor() {
        super()

        this.serial = new Serial((m, d) => {
            this.setStatus(m, d)
        })
        this.storage = new Storage()
        this.state = {
            items: this.storage.items,
            writeBuffer: App.getEmptyBuffer(),
            readBuffer: App.getEmptyBuffer(),
            selectedItem: null,
            status: 'Loading...',
            loading: true,
            buttonsDisabled: {
                read: true,
                write: true,
                edit: true,
                delete: true,
            },
            modal: {
                title: '',
                index: null,
                name: '',
                buffer: App.getEmptyBuffer(),
            }
        }
    }

    read() {
        this.setStatus('Reading...', true)
        this.serial.cmd('read').then(data => {
            if ('reply' in data) {
                this.setState({
                    readBuffer: data.reply.split(":")
                })
                this.setStatus('Ready', false)
            }
        })
    }

    write() {
        let prop = this.state.writeBuffer.join(":")
        this.setStatus('Writing...', true)
        this.serial.cmd('write', prop).then(() => {
            this.setStatus('Ready', false)
        })
    }

    clear() {
        this.setState({
            readBuffer: App.getEmptyBuffer()
        })
    }

    selectItem(e, index) {
        App.unselectAllItems()
        e.currentTarget.className = 'active'

        this.setState({
            buttonsDisabled: {
                ...this.state.buttonsDisabled,
                write: this.state.loading,
                edit: false,
                delete: false,
            },
            selectedItem: index,
            writeBuffer: this.getBufferByItemIndex(index)
        })
    }

    addItem() {
        this.setState({
            modal: {
                title: 'Add',
                index: null,
                name: '',
                buffer: this.state.readBuffer
            }
        })
        App.toggleModalShow()
    }

    addNewItem() {
        this.setState({
            modal: {
                title: 'Add new',
                index: null,
                name: '',
                buffer: App.getEmptyBuffer()
            }
        })
        App.toggleModalShow()
    }

    editItem() {
        let index = this.state.selectedItem

        this.setState({
            modal: {
                title: 'Edit',
                index: index,
                name: this.getNameByItemIndex(index),
                buffer: this.state.writeBuffer
            }
        })
        App.toggleModalShow()
    }

    saveItem(name, buffer, index = null) {
        name = name === '' ? 'Default item' : name

        const item = {
            name: name,
            value: buffer.join(':').toUpperCase()
        }

        if (index === null) {
            this.storage.items = item
        } else {
            this.storage.edit(item, index)
        }

        this.setState({items: this.storage.items})

        App.toggleModalShow()
    }

    deleteItem() {
        this.storage.del(this.state.selectedItem)

        this.setState({
            buttonsDisabled: {
                ...this.state.buttonsDisabled,
                write: true,
                edit: true,
                delete: true,
            },
            selectedItem: null,
            writeBuffer: App.getEmptyBuffer(),
            items: this.storage.items
        })

        App.unselectAllItems()
    }

    setStatus(status, loading = null) {
        loading = loading === null ? this.state.loading : loading
        this.setState({
            buttonsDisabled: {
                ...this.state.buttonsDisabled,
                read: loading,
                write: this.state.selectedItem === null ? true : loading,
            },
            status: status,
            loading: loading
        })
    }

    getBufferByItemIndex(index) {
        if (index in this.state.items) {
            return this.state.items[index].value.split(":")
        }

        return App.getEmptyBuffer()
    }

    getNameByItemIndex(index) {
        if (index in this.state.items) {
            return this.state.items[index].name
        }

        return null
    }

    static getEmptyBuffer() {
        return [...Array(8)].map(() => '')
    }

    static unselectAllItems() {
        let elements = document.querySelectorAll('tbody tr')

        Array.prototype.forEach.call(elements, function (el) {
            el.classList.remove('active')
        })
    }

    static toggleModalShow() {
        let overlay = document.querySelector('.overlay')
        overlay.classList.toggle('hidden')
    }

    render() {
        const itemsRender = this.state.items.map((item, index) => {
            return <Tr action={(e) => this.selectItem(e, index)} key={index} index={index} name={item.name}
                       value={item.value}/>
        })

        return (
            <div className="window">
                <div className="view-form">
                    <Form className="read" buffer={this.state.readBuffer} readOnly={true}/>
                    <button onClick={this.read.bind(this)} type="button" className="btn btn-primary"
                            disabled={this.state.buttonsDisabled.read}>Read
                    </button>
                    <button onClick={this.clear.bind(this)} type="button" className="btn btn-default">Clear</button>
                    <button onClick={this.addItem.bind(this)} type="button" className="btn btn-default">Add</button>
                </div>
                <div className="view-form">
                    <Form className="write" buffer={this.state.writeBuffer} readOnly={true}/>
                    <button onClick={this.write.bind(this)} type="button" className="btn btn-negative"
                            disabled={this.state.buttonsDisabled.write}>Write
                    </button>
                </div>
                <div className="view-table">
                    <button onClick={this.addNewItem.bind(this)} type="button" className="btn btn-default">New</button>
                    <button onClick={this.editItem.bind(this)} type="button" className="btn btn-default"
                            disabled={this.state.buttonsDisabled.edit}>Edit
                    </button>
                    <button onClick={this.deleteItem.bind(this)} type="button" className="btn btn-default"
                            disabled={this.state.buttonsDisabled.delete}>Delete
                    </button>
                    <table className="table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Serial number</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemsRender}
                        </tbody>
                    </table>
                </div>
                <footer className="toolbar toolbar-footer">{this.state.status}</footer>
                <Modal saveAction={this.saveItem.bind(this)} cancelAction={() => App.toggleModalShow()}
                       data={this.state.modal}/>
            </div>
        )
    }
}
