import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default function TodoItem(slot) {

  return function(props, state = { editing: false }) {

    function handleDoubleClick() {
      slot.setState({ editing: true })
    }

    function handleSave(id, text) {
      if (text.length === 0) {
        props.deleteTodo(id)
      } else {
        props.editTodo(id, text)
      }

      slot.setState({ editing: false })
    }

    const { todo, completeTodo, deleteTodo } = props

    let element
    if (state.editing) {
      element = slot.init(TodoTextInput, {
        text: todo.text,
        editing: state.editing,
        onSave: (text) => handleSave(todo.id, text)
      })
    } else {
      element = `
        <div class="view">
          <input class="toggle"
                 type="checkbox"
                 ${todo.completed ? 'checked' : ''}
                 data-onchange="${slot.handler(() => completeTodo(todo.id))}" />
          <label data-ondblclick="${slot.handler(handleDoubleClick)}">${todo.text}</label>
          <button class="destroy"
                  data-onclick="${slot.handler(() => deleteTodo(todo.id))}" />
        </div>
      `
    }

    return `
      <li data-ref="${slot.ref()}" class=${classnames({
        completed: todo.completed,
        editing: state.editing
      })}>
        ${element}
      </li>
    `
  }
}
