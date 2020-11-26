
const basesStatusesList = {
  0: { id: 0, text: 'Создается', className: 'status-pending'},
  1: { id: 1, text: 'Активна', className: 'status-active'},
}

const userStatusesList = {
  0: { id: 0, text: 'Создается', className: 'status-pending'},
  1: { id: 1, text: 'Активен', className: 'status-active'},
}

const companyStatusesList = {
  0: { id: 0, text: 'Создается', className: 'company-status-pending' },
  1: { id: 1, text: 'Активена', className: 'company-status-active' },
  2: { id: 2, text: 'Ошибка', className: 'company-status-warning' },
}


export default {
  companyStatusesList,
  basesStatusesList,
  userStatusesList
}