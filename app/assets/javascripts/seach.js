// $(document).on('turbolinks:load', function(){
$(function() {

    var search_list = $("#user-search-result");
  
    function appendUserSearchHTML(user_name) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user_name.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_name.id}" data-user-name="${user_name.name}" >追加</div>
                  </div>`
      search_list.append(html);
    }
  
    function appendErrMsgToHTML() {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                  </div>`
      search_list.append(html);
    }
  
    $('#user-search-field').on('keyup', function() {
      var input = $('#user-search-field').val();
      var cntMembers = $('#chat-group-users').children().length;
      var member_ids = [];
      for (var i = 0; i < cntMembers; i++) {
        var member_id = $('.chat-group-user input').eq(i).val();
        member_ids.push(member_id);
      }
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input,
          member_ids: member_ids
        },
        dataType: 'json',
      })
  
      .done(function(user_names) {
        $("#user-search-result").empty();
        if (user_names.length !== 0) {
          user_names.forEach(function(user_name){
            appendUserSearchHTML(user_name);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーが存在しません");
        };
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });
    $(document).on('click', ".user-search-add", function(){
      $('#chat-group-users').val();
        var user_id = $(this).data('user-id');
        var user_name = $(this).data('user-name');
        var html = `<div class='chat-group-user clearfix js-chat-member'  id='${user_id}'>
                      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                      <p class='chat-group-user__name'>${user_name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
        $("#chat-group-users").append(html);
      $(this).parent().remove();
    });
    
    $(document).on('click', ".user-search-remove", function(){
        $(this).parent().empty();
    });;
}); 