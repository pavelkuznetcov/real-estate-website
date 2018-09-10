(function(){
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);

    xhr.addEventListener('load', function() {
      var json_content;
      var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          // json_content = xhr.response;
          // for( var i = 0; i < json_content.articles.length; i++)
          // {
          //   var newItem = createCard(json_content.articles[i]);
          //   list_of_appartments.appendChild(newItem);
          // }
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
           error = 'Статус ответа: ' + xhr.status + ': ' + xhr.statusText;
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;//10sec

    xhr.send();
  }
})();
