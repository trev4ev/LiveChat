var fb = new Firebase("https://intense-inferno-1365.firebaseio.com");
var username = 'Guest ' + Math.floor(Math.random()*1000);
if(localStorage.getItem('name') != ""){
    username = localStorage.getItem('name');
};
//var authData = fb.getAuth();
//if(authData) {
	//fb.once('value', function(snapshot){
	//	username = snapshot.child('Users').child(authData.uid).val();
    //    convert();
	//});
//username = fb.child('Users').get[authData.uid];
//}

//var username = 'Guest ' + Math.floor(Math.random()*100);

function convert() {
    $('.' + username).each(function(i, obj) {
        obj.className = 'selfMessageContainer ' + username;
        obj.firstChild.className = 'selfMessage';
        var x = obj.firstChild.innerHTML;
        obj.firstChild.innerHTML = x.substring(username.length + 2);
    });
}

// CLEAR ALL MESSAGES
function end() {   
    if(confirm("All messages will be cleared permanently!")) {
        fb.child('Messages').remove();
    }
};

function send() {
    var message = $('#messageInput').val();
    if(message.trim()){
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
    }
        $('#messageInput').val('');  
};
            
$('#messageInput').keypress( function(e) {
    if(e.keyCode == 13) {
        send(); 
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
    if(username == name) {
        x.className = 'selfMessageContainer ' + name;
        p.className = 'selfMessage';
        var t = document.createTextNode(text);
    }
    else{
        x.className = 'messageContainer ' + name;
        p.className = 'message';
        var t = document.createTextNode(name + ": " + text);// + "\t\t" + time);
    }
    //x.className = name;
    p.appendChild(t);
    x.appendChild(p);
    $('#messagesDiv').append(x);
    //$('<div/>').prepend("   " + time).prepend(text).prepend( name+': ').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

