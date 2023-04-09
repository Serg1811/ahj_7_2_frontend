/* eslint-disable no-console */
export default function createRequest(options, form) {
  const xhr = new XMLHttpRequest();
  const url = new URL('http://localhost:7075/');
  let formData;

  Object.entries(options.data).forEach((item) => {
    url.searchParams.set(item[0], item[1]);
  });

  if ((options.methodRequest === 'POST') || (options.methodRequest === 'PUT')) {
    formData = new FormData(form);
  }

  try {
    xhr.open(options.methodRequest, url);
    xhr.responseType = 'json';
    xhr.send(formData);
  } catch (e) {
    console.log(e);
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        options.callback(xhr.response);
      } catch (e) {
        console.error(e);
      }
    }
  });
}
