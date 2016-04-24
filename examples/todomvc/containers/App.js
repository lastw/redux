import { bindActionCreators } from 'redux'

import Header from '../components/Header'
import MainSection from '../components/MainSection'

import * as TodoActions from '../actions'

export default function App(slot) {
  return function(props) {
    const store = props.store
    const state = store.getState()
    const actions = bindActionCreators(TodoActions, store.dispatch.bind(store))

    const header = slot.init(Header, { addTodo: actions.addTodo })
    const mainSection = slot.init(MainSection, { todos: state.todos, actions })

    return `
      ${header}
      ${mainSection}
    `
  }
}
