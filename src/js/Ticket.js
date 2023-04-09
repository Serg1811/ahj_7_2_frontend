import TicketsRequests from './TicketsRequests';

export default class Ticket {
  static createTicket(item) {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.dataset.id = item.id;

    const ticketStatus = document.createElement('div');
    ticketStatus.className = 'ticket__content status';

    const statusBox = document.createElement('div');
    statusBox.className = 'ticket_btn ticket_status';
    statusBox.setAttribute('status', item.status);
    if (statusBox.getAttribute('status') === 'true') {
      statusBox.textContent = '\u2713';
    }

    ticketStatus.append(statusBox);

    const ticketData = `
            <div class="ticket__content name">
                <p class="name_title">${item.name}</p>
                <p class="description show"></p>                            
            </div>
            <div class="ticket__content .created">
              <p class="date_of_creation">${item.created}</p>
            </div>
            <div class="ticket__content action_edit">
              <div class="btn_update" data-title="Изменить тикет" data-method="editTicket">
                <p class="ticket_btn btn_update_img"></p>   
                <p class="show">Edit</p>
              </div>

              <div class="btn_delete data-title="Удалить тикет" data-method="deleteTicket">
              <p class="ticket_btn">x</p>   
              <p class="show">Delete</p>
              </div>
            </div>            
        `;

    ticketDiv.append(ticketStatus);
    ticketDiv.insertAdjacentHTML('beforeend', ticketData);

    return ticketDiv;
  }

  static getTicketData(e, method) {
    const currentTicketId = e.relatedTarget.closest('.ticket').dataset.id;
    e.target.querySelector('form').dataset.ticketId = currentTicketId;

    if (method !== 'editTicket') return;

    TicketsRequests.ticketById(currentTicketId, (data) => {
      const { name, description } = data;
      document.forms[0].name.value = name;
      document.forms[0].description.value = description;
    });
  }

  static showTicketDescription(ticket, id) {
    const detailDesc = ticket.querySelector('.description');
    detailDesc.classList.toggle('show');

    if (detailDesc.textContent !== '') return;

    TicketsRequests.ticketById(id, (data) => {
      detailDesc.textContent = 'Загрузка...';
      const { description } = data;

      setTimeout(() => {
        if (!description) {
          detailDesc.textContent = 'Описание задачи отсутствует';
          return;
        }
        detailDesc.textContent = description;
      }, 1000);
    });
  }
}
