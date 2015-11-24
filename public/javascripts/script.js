(function($) {
  $('#edit-article').click(function(event) {
    var isEditMode = $(event.target).hasClass('confirm');
    if (!isEditMode) {
      toggleEditMode();
      return;
    }

    var articleId = $(event.target).data('articleId');
    var title = $('#article-title').val();
    var content = $('#article-content').val();

    $.ajax({
      url: '/article/' + articleId,
      type: 'PUT',
      data: {
        title: title,
        body: content
      },
      success: function(message, status) {
        if (status === 'success') {
          window.location.replace('/article/' + articleId);
        }
      }
    })
  })

  function toggleEditMode() {
    var title = $('#article-title');
    var content = $('#article-content');

    $(event.target).addClass('confirm').text('Update article')
    title.replaceWith('<input type="text" class="form-control" id="article-title" value="' + title.text() + '">')
    content.replaceWith('<textarea class="form-control" rows="10" id="article-content">' + content.text() + '</textarea>')
  }

  $('#remove-article').click(function(event) {
    var shouldRemove = confirm('Are you really want to remove this article?');
    if (!shouldRemove) {
      return;
    }
    var articleId = $(event.target).data('articleId');
    $.ajax({
        url: '/article/' + articleId,
        type: 'DELETE',
        success: function(message, status) {
          if (status === 'success') {
            window.location.replace('/');
          }
        }
    });
  })

  $('#comment-article').click(function(event) {
    $('#comment-form').toggleClass('hidden');
  })
  $('#comment-form').submit(function(event) {
    $(event.target).addClass('hidden');
  })

  $(document).ready(function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd<10) {
      dd='0'+dd;
    }
    if (mm<10) {
      mm='0'+mm;
    }
    today = yyyy + '/' + mm + '/' + dd;

    $('#todayDate').val(today);
  })

  $('.nav.navbar-nav li').filter(function(index, element) {
    $(element).removeClass('active')
    return $('a', this).attr('href') === window.location.pathname;
  }).addClass('active')

})(jQuery)
