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
    content.replaceWith('<textarea class="form-control" rows="10" id="article-content">' + content.html() + '</textarea>');
    $('textarea#article-content').wysihtml5();
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

  $('textarea#article-content').wysihtml5();

  $(function() {
    $('div.article-body').each(function(index, articleBody) {
      var content = $.parseHTML($(articleBody).text());
      $(articleBody).text('').append(content);
    })
  });

  $('.nav.navbar-nav li').filter(function(index, element) {
    $(element).removeClass('active')
    return $('a', this).attr('href') === window.location.pathname;
  }).addClass('active')

  $(function() {
    var currentPage = $('.pagination').data('current-page');
    var pagesAmount = $('.pagination').data('pages-amount');

    $('.pagination').bootpag({
      total: pagesAmount,
      page: currentPage,
      maxVisible: 10
    }).on("page", function(event, selectedPage){
      location.search='page=' + selectedPage;
    });
  });



})(jQuery)
