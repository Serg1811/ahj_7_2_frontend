(()=>{"use strict";function t(t,e){const s=new XMLHttpRequest,i=new URL("http://localhost:7075/");let c;Object.entries(t.data).forEach((t=>{i.searchParams.set(t[0],t[1])})),"POST"!==t.methodRequest&&"PUT"!==t.methodRequest||(c=new FormData(e));try{s.open(t.methodRequest,i),s.responseType="json",s.send(c)}catch(t){console.log(t)}s.addEventListener("load",(()=>{if(s.status>=200&&s.status<300)try{t.callback(s.response)}catch(t){console.error(t)}}))}class e{static createTicket(e){t({methodRequest:"POST",data:{method:"createTicket"},callback:e},document.forms[0]),document.forms[0].reset()}static deleteTicket(e,s){t({methodRequest:"DELETE",data:{method:"deleteTicket",id:e.currentTarget.dataset.id},callback:s})}static editTicket(e,s){t({methodRequest:"PUT",data:{method:"editTicket",id:e.currentTarget.dataset.id},callback:s},document.forms[0]),document.forms[0].reset()}static getTickets(e){t({methodRequest:"GET",data:{method:"allTickets"},callback:e})}static ticketById(e,s){t({methodRequest:"GET",data:{method:"ticketById",id:e},callback:s})}static updateTicketStatus(e,s){t({methodRequest:"GET",data:{method:"updateStatus",id:e},callback:s})}}class s{static createTicket(t){const e=document.createElement("div");e.className="ticket",e.dataset.id=t.id;const s=document.createElement("div");s.className="ticket__content status";const i=document.createElement("div");i.className="ticket_btn ticket_status",i.setAttribute("status",t.status),"true"===i.getAttribute("status")&&(i.textContent="✓"),s.append(i);const c=`\n            <div class="ticket__content name">\n                <p class="name_title">${t.name}</p>\n                <p class="description show"></p>                            \n            </div>\n            <div class="ticket__content .created">\n              <p class="date_of_creation">${t.created}</p>\n            </div>\n            <div class="ticket__content action_edit">\n              <div class="btn_update" data-title="Изменить тикет" data-method="editTicket">\n                <p class="ticket_btn btn_update_img"></p>   \n                <p class="show">Edit</p>\n              </div>\n\n              <div class="btn_delete data-title="Удалить тикет" data-method="deleteTicket">\n              <p class="ticket_btn">x</p>   \n              <p class="show">Delete</p>\n              </div>\n            </div>            \n        `;return e.append(s),e.insertAdjacentHTML("beforeend",c),e}static getTicketData(t,s){const i=t.relatedTarget.closest(".ticket").dataset.id;t.target.querySelector("form").dataset.ticketId=i,"editTicket"===s&&e.ticketById(i,(t=>{const{name:e,description:s}=t;document.forms[0].name.value=e,document.forms[0].description.value=s}))}static showTicketDescription(t,s){const i=t.querySelector(".description");i.classList.toggle("show"),""===i.textContent&&e.ticketById(s,(t=>{i.textContent="Загрузка...";const{description:e}=t;setTimeout((()=>{i.textContent=e||"Описание задачи отсутствует"}),1e3)}))}}class i{constructor(){this.btnAdd=document.querySelector(".btn_add"),this.ticketsList=document.querySelector(".tickets-list"),this.ticketsProgress=this.ticketsList.querySelector(".tickets-list__progress"),this.ticketsDone=this.ticketsList.querySelector(".tickets-list__done"),this.ticketModal=document.getElementById("ticketModal"),this.popUp=document.querySelector(".pop-up"),this.form=this.popUp.querySelector("form")}init(){e.getTickets(this.updateList.bind(this)),this.events()}events(){this.form.addEventListener("submit",(t=>this.submitMethod(t))),this.btnAdd.addEventListener("click",(()=>{this.showForm("createTicket")})),this.ticketsList.addEventListener("click",(t=>this.ticketEvents(t)))}ticketEvents(t){const i=t.target.closest(".ticket"),c=i.dataset.id;t.target.closest(".name")?s.showTicketDescription(i,c):(t.target.closest(".ticket_status")&&e.updateTicketStatus(c,this.updateList.bind(this)),t.target.closest(".btn_update")&&this.showForm("editTicket",c),t.target.closest(".btn_delete")&&this.showForm("deleteTicket",c))}showForm(t,s){this.popUp.classList.remove("show"),"editTicket"===t&&e.ticketById(s,(t=>{const{name:e,description:s}=t;this.form.name.value=e,this.form.description.value=s})),this.form.dataset.id=s,this.form.dataset.method=t,"createTicket"!==t&&(this.form.dataset.id=s),"deleteTicket"===t?this.form.insertAdjacentHTML("beforeend",'\n  <h1>Удалить тикет</h1>\n  <p class="Input_text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>\n  <div class="popup-btn">\n    <button class="btn btn_cancel" name="cancel">Отмена</button>\n    <button type="submit" class="btn btn_agree" name="agree">Ok</button>\n  </div>\n  '):this.form.insertAdjacentHTML("beforeend",'\n<div class="popup-control">\n    <p class="Input_text">Краткое описание</p>\n    <input class="input_name" required="true" name="name">\n</div>\n<div class="popup-control">\n  <p class="Input_text">Подробное описание</p>\n  <textarea class="textarea_description" required="true" name="description"></textarea>\n</div>\n<div class="popup-btn">\n  <button class="btn btn_agree" name="agree">Сохранить</button>\n  <button class="btn btn_cancel"name="cancel">Отмена</button>\n</div>\n')}submitMethod(t){t.preventDefault();const{method:s}=t.target.dataset;if("agree"===t.submitter.name)if("deleteTicket"===s)e.deleteTicket(t,this.updateList.bind(this));else{const c=this.form.elements.name;if(!c.validity.valid)return void i.showError('Заполните, пожалуйста, поле "Краткое описание"',c);"createTicket"===s?e.createTicket(this.updateList.bind(this)):"editTicket"===s&&e.editTicket(t,this.updateList.bind(this))}this.cleanForm()}static showError(t,e){const s=document.createElement("div");s.className="popover";const i=document.createElement("div");i.className="arrow";const c=document.createElement("div");c.className="popover-body",c.textContent=t,s.append(i),s.append(c),e.after(s),i.style.left=s.getBoundingClientRect().width/2-i.getBoundingClientRect().width+3+"px",s.style.top=e.closest(".popup-control").getBoundingClientRect().height-2+"px",s.classList.add("popover-visible")}cleanForm(){this.form.innerHTML="",this.form.removeAttribute("data-id"),this.form.removeAttribute("data-method"),this.popUp.classList.add("show")}updateList(t){this.ticketsProgress.innerHTML="",this.ticketsDone.innerHTML="",t.forEach((t=>{t.status?this.ticketsDone.append(s.createTicket(t)):this.ticketsProgress.append(s.createTicket(t))}))}}(new i).init()})();