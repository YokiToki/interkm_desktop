export default class Storage {
    get items() {
        let keys = JSON.parse(localStorage.getItem('keys'))

        if (keys === null) {
            return []
        }

        return keys
    }

    set items(item) {
        let keys = this.items

        if (typeof item !== 'object') {
            return
        }

        keys.push(item)
        localStorage.setItem('keys', JSON.stringify(keys))
    }

    edit(item, index) {
        let keys = this.items
        if (index in keys) {
            keys[index] = item
            localStorage.setItem('keys', JSON.stringify(keys))
        }
    }

    del(index) {
        let keys = this.items
        if (index in keys) {
            keys.splice(index, 1)
            localStorage.setItem('keys', JSON.stringify(keys))
        }
    }
}