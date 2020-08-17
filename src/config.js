
const ticketStatusesList = {
    1: { label: 'Новая', type: 'warning'}
}

const statusesList = {
    1: { id: 1, text: 'Новая', className: 'status-new'},
    2: { id: 2, text: 'В работе', className: 'status-inwork'},
    3: { id: 3, text: 'Отложена', className: 'status-pending'},
    4: { id: 4, text: 'Ожидает ответа', className: 'status-wait'},
    5: { id: 5, text: 'Успешно закрыта', className: 'status-close'},
    6: { id: 6, text: 'Закрыта с отказом', className: 'status-fail'},
}


export default {
    ticketStatusesList,
    statusesList,
    attachmentsUrl: 'http://api01.start.local/uploads/'
}