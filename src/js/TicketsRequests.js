import createRequest from './createRequest';

export default class TicketsRequests {
  static createTicket(callback) {
    createRequest(
      {
        methodRequest: 'POST',
        data: {
          method: 'createTicket',
        },
        callback,
      },
      document.forms[0],
    );

    document.forms[0].reset();
  }

  static deleteTicket(e, callback) {
    createRequest({
      methodRequest: 'DELETE',
      data: {
        method: 'deleteTicket',
        id: e.currentTarget.dataset.id,
      },
      callback,
    });
  }

  static editTicket(e, callback) {
    createRequest(
      {
        methodRequest: 'PUT',
        data: {
          method: 'editTicket',
          id: e.currentTarget.dataset.id,
        },
        callback,
      },
      document.forms[0],
    );

    document.forms[0].reset();
  }

  static getTickets(callback) {
    createRequest({
      methodRequest: 'GET',
      data: {
        method: 'allTickets',
      },
      callback,
    });
  }

  static ticketById(id, callback) {
    createRequest({
      methodRequest: 'GET',
      data: {
        method: 'ticketById',
        id,
      },
      callback,
    });
  }

  static updateTicketStatus(id, callback) {
    createRequest({
      methodRequest: 'GET',
      data: {
        method: 'updateStatus',
        id,
      },
      callback,
    });
  }
}
