import TodoTextInput from './TodoTextInput'

export default function Header(slot) {

  return function(props) {

    function handleSave(text) {
      if (text.length !== 0) {
        props.addTodo(text)
      }
    }

    const todoTextInput = slot.init(TodoTextInput, {
      newTodo: true,
      onSave: handleSave,
      placeholder: 'What needs to be done?'
    })

    return `
      <header class="header">
          <h1>todos</h1>
          ${todoTextInput}
      </header>
    `
  }
}
