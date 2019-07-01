// $(document).on('turbolinks:load', function(){
  $(function() {
    function buildHTML(message){
      var body = message.content ? `${ message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${body}
                      </p>
                      ${img}
                    </div>
                  </div>`
      return html;
    }
    function scroll_view() {
      var position = $('.messages').get(0).scrollHeight;
        $('.messages').animate({scrollTop: position});
    }
    $('#new_message').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr("action");
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
        })
        .done(function (data) {
            var html = buildHTML(data);
            $('.messages').append(html);
            $('.new_message').get(0).reset();
            scroll_view();
        })
        .fail(function(data){
          alert('エラーが発生したためメッセージは送信できませんでした。');
        })
        .always(function(data){
          $('.form__submit').prop('disabled', false);
        })
      })
    
    // var reloadMessages = function() {
    //   var last_message_id = $('.messages').children().last().data('id');
    //   var reload_url = window.location.href
    //   reload_url_pattern = '/messages';
    //   api_url = reload_url.replace(reload_url_pattern, '/api/messages');
    //   if (reload_url.match(/^(?=.*groups)(?=.*messages)/)) {
    //     $.ajax({
    //       url: api_url,
    //       type: 'get',
    //       dataType: 'json',
    //       data: {id: last_message_id},
    //     })
    //     .done(function(messages) {
    //       var insertHTML = '';
    //       if (messages.length !== 0){
    //         messages.forEach(function(message) {
    //           insertHTML += buildHTML(message);
    //           scroll_view();
    //         });
    //       }
    //       $('.messages').append(insertHTML);
    //     })
    //     .fail(function() {
    //       alert('自動更新に失敗しました');
    //     });
    //   }
    // };
    // setInterval(reloadMessages, 5000);
});