
// submit profile avatar if uploaded 
$("#profile_photo").change(function (e) {
 $("#avatar-form").submit()
  });

console.log("here")
  const isOwner = $("#isOwner").text().trim()
  console.log(isOwner)
console.log(isOwner=="true")

if(isOwner =="true"){
    $(".edit-option").css("display","block")
}

$( "#profileUpdateBtn").click(function() {
  console.log($("#usernameInfo").val())
  let userObj = {
    username : $("#usernameInfo").val(),
    first_name : $("#firstnameInfo").val(),
    last_name : $("#lastnameInfo").val(),
    birthdate : $("#birthdateInfo").val(),
    sex : $("#sexInfo").val(),
    city : $("#cityInfo").val(),
    province_state : $("#provinceInfo").val(),
    country: $("#countryInfo").val()
  }

  $.post("/api/users/profile", userObj)
  .done(function() {
  console.log('update successfully')
  alert( "update successfully" );
  })
  .fail(function() {
    alert( "profile update failed" );
  })

});