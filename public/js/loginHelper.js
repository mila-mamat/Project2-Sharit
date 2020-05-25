const usernameLogin = document.getElementById('usernameLogin')
const passwordLogin = document.getElementById('passwordLogin')
const usernameSignup = document.getElementById('usernameSignup')
const passwordSignup = document.getElementById('passwordSignup')
const firstNameSignup = document.getElementById('firstNameSignup')
const lastNameSignup = document.getElementById('lastNameSignup')


document.getElementById('loginBtn').onclick = () =>{
    let userData = {
        username: usernameLogin.value,
        password: passwordLogin.value
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    usernameLogin.value = ''
    passwordLogin.value = ''
}

document.getElementById('signupBtn').onclick = () =>{
    let userData = {
        username: usernameSignup.value,
        password: passwordSignup.value,
        first_name: firstNameSignup.value,
        last_name: lastNameSignup.value
    };

    if (!userData.username || !userData.password || !userData.first_name || !userData.last_name) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signUpUser(userData);
    usernameSignup.value = ''
    passwordSignup.value = ''
    firstNameSignup.value = ''
    lastNameSignup.value = ''

}

function loginUser(userDataObj) {
$.post("/api/login", userDataObj)
    .done(function() {
    window.location.replace("/");
    })
    .fail(function() {
      alert( "Login Fail, invalid user name or password" );
    })

}

function signUpUser(userDataObj) {
  $.post("/api/users", userDataObj)
    .done(function() {
      window.alert('Signup succeeded, ready to login!')
    })
    .fail(function() {
      alert( "Fail to create a new user" );
    })
}