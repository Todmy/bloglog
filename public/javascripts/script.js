(function($) {
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

})(jQuery)
