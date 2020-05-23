const usernameLogin = document.getElementById('usernameLogin')
const passwordLogin = document.getElementById('passwordLogin')
const usernameSignup = document.getElementById('usernameSignup')
const passwordSignup = document.getElementById('passwordSignup')
const firstNameSignup = document.getElementById('firstNameSignup')
const lastNameSignup = document.getElementById('lastNameSignup')


document.getElementById('loginBtn').onclick = () =>{
    let userData = {
        username: usernameLogin.value.trim(),
        password: passwordLogin.value.trim()
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
        username: usernameSignup.value.trim(),
        password: passwordSignup.value.trim(),
        first_name: firstNameSignup.value.trim(),
        last_name: lastNameSignup.value.trim()
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
    .then(function() {
    window.location.replace("/home");
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
    $.post("/api/users", userDataObj)
      .then(function(data) {
        console.log(data)
        // window.location.replace("/signup-login");
        window.alert('Signup successed')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      // .catch(handleLoginErr);
}