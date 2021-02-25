const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io'
const TODOS_URL = API_URL + '/todos'

class Controller {
    constructor($container) {
        this.container = $container

        this.todosCollection = new Collection(TODOS_URL)
        this.todosCollection.fetch().then(() => {
            this.renderList()
        }
        )

        this.listView = new TodoListView({
            onDelete: (id) => this.deleteTodo(id),
            onToggle: (id) => this.toggleTodo(id),
        })
        this.listView.appendTo($container)
        console.log(this.listView)
    }

    renderList() {
        this.listView.renderList(this.todosCollection.getList())
    }
    deleteTodo(id) {
        this.todosCollection.delete(id).then(() => this.listView.removeElement(id))
    }

    toggleTodo(id) {
        this.todosCollection
        .toggle(id)
        .then(() => this.listView.renderElement(this.todosCollection.get(id)))
    }
}