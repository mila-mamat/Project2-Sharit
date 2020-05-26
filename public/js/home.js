
var file;

//form adding img
//display the img selected for user review
$("#post_photo").change(function (e) {
  for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
    file = e.originalEvent.srcElement.files[i];
    var img = document.createElement("img");
    var reader = new FileReader();
    reader.onloadend = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
    $("#selected-img").append(img);
  }
});

//delete the img displayed if user resets the form
$("form").on("reset", function () {
  $("#selected-img").empty();
});

// masonry
// init Masonry
var $grid = $(".grid").masonry({
  itemSelector: ".grid-item",
  percentPosition: true,
  columnWidth: ".grid-sizer",
});

// layout Masonry after each image loads
$grid.imagesLoaded().progress(function () {
  $grid.masonry();
});



$(".author-name").on('click', function(event){
  let userName = event.target.innerText
  if(userName)
  {
    window.location.replace(`/profile/${userName}`);
  }
  // $.post("/api/users", userDataObj)
  // .done(function() {
  //   window.alert('Signup succeeded, ready to login!')
  // })
  // .fail(function() {
  //   alert( "Fail to create a new user" );
  // })

});

