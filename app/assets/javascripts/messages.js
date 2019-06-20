$(function () {
    function buildHTML(message) {
        var insertImage = (message.image != null) ? `<img class ="lower-message__imag", src="${message.image}">` : "";

        var html =
            `<div class="message">
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${ message.name }
                </div>
                <div class="upper-message__date">
                ${ message.date }
                </div>
              </div>
              <div class="lower-meesage">
                <p class="lower-message__content">
                  ${ message.content }
                </p>
                  ${ insertImage }
              </div>
            </div>`;
        return html;
    }
    function scroll_view() {
        $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 1500);
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
            contentType: false
        })

        .done(function (data) {
            var html = buildHTML(data);
            $('.messages').append(html);
            scroll_view()
            $('#new_message')[0].reset();
            $('.form__submit').prop('disabled', false);
        })
        .fail(function () {
            alert('error');
        });
    })
}); 