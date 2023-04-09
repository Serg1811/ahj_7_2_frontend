const modalDeleteContent = `
  <h1>Удалить тикет</h1>
  <p class="Input_text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
  <div class="popup-btn">
    <button class="btn btn_cancel" name="cancel">Отмена</button>
    <button type="submit" class="btn btn_agree" name="agree">Ok</button>
  </div>
  `;

export default function modalDelete(element) {
  element.insertAdjacentHTML('beforeend', modalDeleteContent);
}
