var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");
var username = 'Guest';
var users = {
    "46c015f9-af9f-4d48-bd5b-d0671916061a" : 'Trevor',
    "8a7601d5-067f-4826-94bc-4c511bc6a5ec" : 'Henry',
    "47b14d15-4b0d-4fa6-8407-1fcbe4762fbe" : 'Andrew',
    "d06a8191-0adb-44f3-9ab3-950979ab5b38" : 'Jessica',
    "c624d110-5fa3-4f7c-b586-2f2e656ca0ab" : 'Eric'
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
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var timestamp = h + ":" + m + ":" + s;
        fb.push({name: username, text: message, time: timestamp});
        $('#messageInput').val('');                    
    }
});
      
// UPDATE DATABASE
fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    addChatMessage(message.name, message.text, message.time);
});
            
fb.on('child_removed', function(snapshot) {
    $('#messagesDiv').empty();
});
            
function addChatMessage(name, text, time) {
    $('<div/>').prepend("   " + time).prepend(text).prepend( name+': ').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

