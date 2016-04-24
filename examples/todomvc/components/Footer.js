import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

export default function Footer(slot) {

  return function(props) {

    function renderTodoCount() {
      const { activeCount } = props
      const itemWord = activeCount === 1 ? 'item' : 'items'

      return `
        <span class="todo-count">
          <strong>${activeCount || 'No'}</strong> ${itemWord} left
        </span>
      `
    }

    function renderFilterLink(filter) {
      const title = FILTER_TITLES[filter]
      const { filter: selectedFilter, onShow } = props

      return `
        <a class="${classnames({ selected: filter === selectedFilter })}"
           style="cursor: pointer"
           data-onclick="${slot.handler(() => onShow(filter))}">
          ${title}
        </a>
      `
    }

    function renderClearButton() {
      const { completedCount, onClearCompleted } = props
      if (completedCount > 0) {
        return `
          <button class="clear-completed"
                  data-onclick="${slot.handler(onClearCompleted)}">
            Clear completed
          </button>
        `
      }

      return ''
    }

    return `
      <footer class="footer">
        ${renderTodoCount()}
        <ul class="filters">
          ${[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
            `<li>
              ${renderFilterLink(filter)}
            </li>`
          ).join('')}
        </ul>
        ${renderClearButton()}
      </footer>
    `
  }
}
