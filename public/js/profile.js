
// submit profile avatar if uploaded 
$("#profile_photo").change(function (e) {
 $("#avatar-form").submit();
  });

console.log("here")
  const isOwner = $("#isOwner").text().trim()
  console.log(isOwner)
console.log(isOwner=="true")

if(isOwner =="true"){
    $(".edit-option").css("display","block")
}