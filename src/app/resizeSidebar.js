  $(window).scroll(function() {
    updateSidebarHeight();
  });

function updateSidebarHeight() {
  var documentHeight = $(document).height();
  console.log(documentHeight);
  $('#sidebar-wrapper').each(function () {
    $(this).css('height', documentHeight);
  });
}