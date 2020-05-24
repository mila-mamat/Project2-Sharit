console.log(window);

var file;

//form adding img
//display the img selected for user review
$("#files").change(function (e) {
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

let postText = $("#post-text");
let postImg = $("#files");

$("form").on("submit", handlePostFormSubmit);

// create new post
function handlePostFormSubmit(event) {
  event.preventDefault();
  // Don't do anything if the name fields hasn't been filled out
  if (!postText.val().trim().trim()) {
    return;
  }
  // Calling the upsertAuthor function and passing in the value of the name input
  createPost({
    text: postText.val().trim(),
    post_photo: file,
    // userId:
  });
  // $("#post-text").val("");
  location.reload();
}

// A function for creating an author. Calls getAuthors upon completion
function createPost(data) {
  console.log(data);
  $.post("/api/posts", data);
}
