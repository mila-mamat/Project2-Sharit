const usernameLogin = document.getElementById('usernameLogin')
const passwordLogin = document.getElementById('passwordLogin')
const usernameSignup = document.getElementById('usernameSignup')
const passwordSignup = document.getElementById('passwordSignup')


document.getElementById('loginBtn').onclick = () =>{
    let userData = {
        email: usernameLogin.value.trim(),
        password: passwordLogin.value.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData);
    usernameLogin.value = ''
    passwordLogin.value = ''
}

document.getElementById('signupBtn').onclick = () =>{
    let userData = {
        email: usernameSignup.value.trim(),
        password: passwordSignup.value.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signUpUser(userData);
    usernameSignup.value = ''
    passwordSignup.value = ''
}

function loginUser(userDataObj) {
$.post("/api/login", userDataObj)
    .then(function() {
    window.location.replace("/members");
    // If there's an error, log the error
    })
    .catch(function(err) {
    console.log(err);
    });


// fetch("/api/login", {
//     method: 'post',
//     body: JSON.stringify(userDataObj)
//     }).then(function(response) {
//     console.log(response.json())
//     }).then(function(data) {
//     console.log(data)
//     });
}

function signUpUser(userDataObj) {
    $.post("/api/signup", userDataObj)
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }