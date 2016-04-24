import classnames from 'classnames'

export default function TodoTextInput(slot) {
  return function(props, state = { text: props.text || '' }) {
    function handleSubmit(e) {
      const text = e.target.value.trim()
      if (e.which === 13) {
        if (props.newTodo) {
          slot.setState({ text: '' })
        }

        props.onSave(text)
      }
    }

    function handleChange(e) {
      slot.setState({ text: e.target.value })
    }

    function handleBlur(e) {
      if (!props.newTodo) {
        props.onSave(e.target.value)
      }
    }

    const onBlur = slot.handler(handleBlur)
    const onChange = slot.handler(handleChange)
    const onKeydown = slot.handler(handleSubmit)

    return `
      <input class="${classnames({
          edit: props.editing,
          'new-todo': props.newTodo
        })}
        type="text"
        placeholder="${props.placeholder}"
        autoFocus="true"
        value="${state.text}"
        data-onblur="${onBlur}"
        data-oninput="${onChange}"
        data-onkeydown="${onKeydown}"
        data-ref="${slot.ref()}" />
    `
  }
}
