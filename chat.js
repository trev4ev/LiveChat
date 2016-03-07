var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");
var username = 'Guest';
var users = {
    "46c015f9-af9f-4d48-bd5b-d0671916061a" : 'Trevor',
    "8a7601d5-067f-4826-94bc-4c511bc6a5ec" : 'Henry',
    "47b14d15-4b0d-4fa6-8407-1fcbe4762fbe" : 'Andrew'
}

// CLEAR ALL MESSAGES
function end() {   
    if(confirm("All messages will be cleared permanently!")) {
        fb.remove();
    }
};
            
$('#messageInput').keypress( function(e) {
    if(e.keyCode == 13) {
        var message = $('#messageInput').val();
        var authData = fb.getAuth();
        if(authData) {
            username = users[authData.uid];
        }
        fb.push({name: username, text: message});
        $('#messageInput').val('');                    
    }
});
      
// UPDATE DATABASE
fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    addChatMessage(message.name, message.text);
});
            
fb.on('child_removed', function(snapshot) {
    $('#messagesDiv').empty();
});
            
function addChatMessage(name, text) {
    $('<div/>').text(text).prepend( name+': ').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

