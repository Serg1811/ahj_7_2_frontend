const modalFormContent = `
<div class="popup-control">
    <p class="Input_text">Краткое описание</p>
    <input class="input_name" required="true" name="name">
</div>
<div class="popup-control">
  <p class="Input_text">Подробное описание</p>
  <textarea class="textarea_description" required="true" name="description"></textarea>
</div>
<div class="popup-btn">
  <button class="btn btn_agree" name="agree">Сохранить</button>
  <button class="btn btn_cancel"name="cancel">Отмена</button>
</div>
`;

export default function modalForm(element) {
  element.insertAdjacentHTML('beforeend', modalFormContent);
}
