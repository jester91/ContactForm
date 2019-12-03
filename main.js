


(function ($) {
    "use strict";



  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);


var config = {
    apiKey: "AIzaSyAPUZAf3eFPD7a43OQl4aa5ylKgRBTjV6E",
    authDomain: "myusers-3816e.firebaseapp.com",
    databaseURL: "https://myusers-3816e.firebaseio.com",
    projectId: "myusers-3816e",
    storageBucket: "myusers-3816e.appspot.com",
    messagingSenderId: "304540760585"
  };
  firebase.initializeApp(config);



// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var fname = getInputVal('fname');
  var lname = getInputVal('lname');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var address = getInputVal('address');
  var comment = getInputVal('comment');

  // Save message
  saveMessage(fname, lname, email, phone, address,comment);

}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, lname, email, phone, address,comment){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    fname: fname,
    lname: lname,
    email:email,
    phone:phone,
    address:address,
    comment:comment
  });
}