var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");

// LOGIN
function authHandler(error, authData) {
  if (error) {
        console.log("Login Failed!", error);
    } 
    else {
        window.location = 'chat.html';        
    }
}

function login() {
    var e = $('#email').val();
    var p = $('#password').val();    
    
    fb.authWithPassword({
        email   : e,
        password: p
    }, authHandler)
}

$('#login-panel').keypress( function(e) {
    if(e.keyCode == 13) {
        login();                  
    }
});