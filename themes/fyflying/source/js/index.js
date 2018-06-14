$('.sidebar-nav-search').on('click', function () {
  $('.search-input-el input[type=search]').attr('placeholder', '请输入').focus();
  $('.search-input-el input[type=search]').css('opacity', 1)
  return false
})

$('.fa-align-justify').on('click', function () {
  $('.sidebar').css('opacity', 0).hide()
  $('.layer').css('opacity', 1).show()
  $('.fa-align-justify').hide()
  return false
})

$('.fa-times').on('click', function () {
  $('.sidebar').css('opacity', 1).show()
  $('.layer').css('opacity', 0).hide()
  $('.fa-align-justify').show()
  return false
})

$('.up-down-toggle').on('click', function () {
  $('.left-sidebar-tags').toggle()
  $('.fa-angle-up').toggle()
  $('.fa-angle-down').toggle()
  return false
})














































































































































































































