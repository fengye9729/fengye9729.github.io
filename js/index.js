$('.sidebar-nav-search').on('click', function () {
  $('.search-input-el input[type=search]').attr('placeholder', '请输入').focus();
  $('.search-input-el input[type=search]').css('opacity', 1)
  return false
})

// $('.fa-align-justify').on('click', function () {
//   $('.leftcol').toggleClass('active')
//   $('.sidebar').toggleClass('active')
//   return false
// })

$('.up-down-toggle').on('click', function () {
  $('.left-sidebar-tags').toggle()
  $('.fa-angle-up').toggle()
  $('.fa-angle-down').toggle()
  return false
})

// $('.post-card').on('click', function () {
//   debugger
//   $('.sidebar').toggle('active')
// })

// $(document).ready(function() {
//   if ($('.leftcol').length === 0) {
//     $('.sidebar').addClass('active')
//   }
// })
















































































































































































































