import Ticket from './Ticket';
import TicketsRequests from './TicketsRequests';
import modalDelete from './popup/modalDelete';
import modalForm from './popup/modalForm';

export default class Tickets {
  constructor() {
    this.btnAdd = document.querySelector('.btn_add');
    this.ticketsList = document.querySelector('.tickets-list');
    this.ticketsProgress = this.ticketsList.querySelector('.tickets-list__progress');
    this.ticketsDone = this.ticketsList.querySelector('.tickets-list__done');
    this.ticketModal = document.getElementById('ticketModal');
    this.popUp = document.querySelector('.pop-up');
    this.form = this.popUp.querySelector('form');
  }

  init() {
    TicketsRequests.getTickets(this.updateList.bind(this));
    this.events();
  }

  events() {
    this.form.addEventListener('submit', (evt) => this.submitMethod(evt));
    this.btnAdd.addEventListener('click', () => {
      this.showForm('createTicket');
    });
    this.ticketsList.addEventListener('click', (e) => this.ticketEvents(e));
  }

  ticketEvents(e) {
    const currentTicket = e.target.closest('.ticket');
    const currentTicketId = currentTicket.dataset.id;
    if (e.target.closest('.name')) {
      Ticket.showTicketDescription(currentTicket, currentTicketId);
      return;
    }

    if (e.target.closest('.ticket_status')) {
      TicketsRequests.updateTicketStatus(currentTicketId, this.updateList.bind(this));
    }
    if (e.target.closest('.btn_update')) {
      this.showForm('editTicket', currentTicketId);
    }

    if (e.target.closest('.btn_delete')) {
      this.showForm('deleteTicket', currentTicketId);
    }
  }

  showForm(method, id) {
    this.popUp.classList.remove('show');
    if (method === 'editTicket') {
      TicketsRequests.ticketById(id, (data) => {
        const { name, description } = data;
        this.form.name.value = name;
        this.form.description.value = description;
      });
    }
    this.form.dataset.id = id;
    this.form.dataset.method = method;
    if (method !== 'createTicket') {
      this.form.dataset.id = id;
    }
    if (method === 'deleteTicket') {
      modalDelete(this.form);
    } else {
      modalForm(this.form);
    }
  }

  submitMethod(e) {
    e.preventDefault();
    const { method } = e.target.dataset;
    if (e.submitter.name === 'agree') {
      if (method === 'deleteTicket') {
        TicketsRequests.deleteTicket(e, this.updateList.bind(this));
      } else {
        const formName = this.form.elements.name;
        if (!formName.validity.valid) {
          Tickets.showError('Заполните, пожалуйста, поле "Краткое описание"', formName);
          return;
        }

        if (method === 'createTicket') {
          TicketsRequests.createTicket(this.updateList.bind(this));
        } else if (method === 'editTicket') {
          TicketsRequests.editTicket(e, this.updateList.bind(this));
        }
      }
    }
    this.cleanForm();
  }

  static showError(text, input) {
    const popoverDiv = document.createElement('div');
    popoverDiv.className = 'popover';

    const arrowDiv = document.createElement('div');
    arrowDiv.className = 'arrow';

    const popoverContent = document.createElement('div');
    popoverContent.className = 'popover-body';
    popoverContent.textContent = text;

    popoverDiv.append(arrowDiv);
    popoverDiv.append(popoverContent);

    input.after(popoverDiv);

    arrowDiv.style.left = `${(popoverDiv.getBoundingClientRect().width / 2) - (arrowDiv.getBoundingClientRect().width) + 3}px`;
    popoverDiv.style.top = `${input.closest('.popup-control').getBoundingClientRect().height - 2}px`;

    popoverDiv.classList.add('popover-visible');
  }

  cleanForm() {
    this.form.innerHTML = '';
    this.form.removeAttribute('data-id');
    this.form.removeAttribute('data-method');
    this.popUp.classList.add('show');
  }

  updateList(data) {
    this.ticketsProgress.innerHTML = '';
    this.ticketsDone.innerHTML = '';

    data.forEach((item) => {
      if (item.status) {
        this.ticketsDone.append(Ticket.createTicket(item));
        return;
      }
      this.ticketsProgress.append(Ticket.createTicket(item));
    });
  }
}
