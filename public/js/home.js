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

// $(".author-name").on('click', function(event){
//   let userName = event.target.innerText
//   if(userName)
//   {
//     window.location.replace(`/profile/${userName}`);
//   }
// });

$(".like").on("click", function () {
  const postId = $(this).attr("id");
  const isLiked = $(this).children("i").hasClass("liked");
  let numContainer = $(this).children("span");
  let likeNum = parseInt(numContainer.text());

  //check if user marked "like" on this post before
  if (isLiked) {
    //if it was liked, delete the like
    try {
      $.ajax({
        method: "DELETE",
        url: "/api/post-likes",
        data: { PostId: postId },
      });
      // decrease the like numbers and change the color back to black
      $(this).children("i").removeClass("liked");
      numContainer.text(likeNum - 1);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      //if haven't, mark like on the post
      $.post("/api/post-likes", { PostId: postId });
      //increase the number of likes and change the color to red
      $(this).children("i").addClass("liked");
      numContainer.text(likeNum + 1);
    } catch (err) {
      console.log(err);
    }
  }
});
