import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default function MainSection(slot) {
  return function(props, state = { filter: SHOW_ALL }) {
    function handleClearCompleted() {
      props.actions.clearCompleted()
    }

    function handleShow(filter) {
      slot.setState({ filter })
    }

    function renderToggleAll(completedCount) {
      const { todos, actions } = props
      if (todos.length > 0) {
        return `
          <input class="toggle-all"
                 type="checkbox"
                 ${completedCount === todos.length ? 'checked' : ''}
                 data-onChange="${slot.handler(actions.completeAll)}" />
        `
      }

      return '';
    }

    function renderFooter(completedCount) {
      const { todos } = props
      const { filter } = state
      const activeCount = todos.length - completedCount

      if (todos.length) {
        return slot.init(Footer, {
          completedCount,
          activeCount,
          filter,
          onClearCompleted: handleClearCompleted,
          onShow: handleShow
        })
      }

      return '';
    }

    const { todos, actions } = props
    const { filter } = state

    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    const toggleAll = renderToggleAll(completedCount)
    const footer = renderFooter(completedCount)

    const filteredTodos = todos.filter(TODO_FILTERS[filter]).map(todo => slot.init(TodoItem, { todo, ...actions }, todo.id))

    return `
      <section class="main" data-ref="${slot.ref()}">
        ${toggleAll}
        <ul class="todo-list">
          ${filteredTodos.join('')}
        </ul>
        ${footer}
      </section>
    `
  }
}
