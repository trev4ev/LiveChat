var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");
if(!localStorage.getItem('name') == ""){
    window.location = 'chat.html'; 
};
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
    localStorage.setItem('name', e);
    window.location = 'chat.html';
    //var p = $('#password').val();    
    
    //fb.authWithPassword({
    //    email   : e,
    //    password: p
    //}, authHandler)
    
    
}

function guestLogin() {
    fb.unauth();
    window.location = 'chat.html';
}

$('#login-panel').keypress( function(e) {
    if(e.keyCode == 13) {
        login();                  
    }
});