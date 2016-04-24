import App from './containers/App'
import configureStore from './store/configureStore'
import 'todomvc-app-css/index.css'

import Root from 'slot-ui'

const store = configureStore()

const root = new Root(App, { store })

root.mount(
  document.getElementById('root')
)

store.subscribe(() => root.slot.rerender({ store }))

window._root = root
