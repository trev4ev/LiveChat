var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");

var username = 'Guest';

var authData = fb.getAuth();
if(authData) {
	fb.once('value', function(snapshot){
		username = snapshot.child('Users').child(authData.uid).val();
	});
//username = fb.child('Users').get[authData.uid];
}

var users = {
    "46c015f9-af9f-4d48-bd5b-d0671916061a" : 'Trevor',
    "8a7601d5-067f-4826-94bc-4c511bc6a5ec" : 'Henry',
    "47b14d15-4b0d-4fa6-8407-1fcbe4762fbe" : 'Andrew',
    "d06a8191-0adb-44f3-9ab3-950979ab5b38" : 'Jessica',
    "c624d110-5fa3-4f7c-b586-2f2e656ca0ab" : 'Eric',
    "4841d51e-92bd-46f7-b505-8e5e2d92df7a" : 'Aaron',
    "07b9eb6e-be58-4d34-8eae-2ac10d9083e5" : 'Bailey'
}

// CLEAR ALL MESSAGES
function end() {   
    if(confirm("All messages will be cleared permanently!")) {
        fb.child('Messages').remove();
    }
};
            
$('#messageInput').keypress( function(e) {
    if(e.keyCode == 13) {
        var message = $('#messageInput').val();
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        if(m < 10)
            m = "0" + m;
        var s = d.getSeconds();
        if(s < 10)
            s = "0" + s
        var timestamp = h + ":" + m + ":" + s;
        fb.child('Messages').push({name: username, text: message, time: timestamp});
        console.log(username);
        $('#messageInput').val('');                    
    }
});
      
// UPDATE DATABASE
fb.child('Messages').on('child_added', function(snapshot) {
    var message = snapshot.val();
	if(message.name != undefined) {
		addChatMessage(message.name, message.text, message.time);
	}
});
            
fb.child('Messages').on('child_removed', function(snapshot) {
    $('#messagesDiv').empty();
});
            
function addChatMessage(name, text, time) {
    var x = document.createElement("DIV");
    var p = document.createElement("P");
    var t = document.createTextNode(name + ": " + text + "\t\t" + time);
    p.appendChild(t);
    x.appendChild(p);
    $('#messagesDiv').append(x);
    //$('<div/>').prepend("   " + time).prepend(text).prepend( name+': ').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

