$(document).ready(function () {    
    
    var $registrationForm = $('#forgot-password-verify');
    $registrationForm.validate({
        rules:{
            //username is the name of the textbox
            otp: {
                required: true,
            },
        },
        messages:{
            otp: {
                //error message for the required field
                required: 'Please enter OTP'
            },
            
        },
        errorPlacement: function(error, element) 
        {
            error.insertAfter( element );
        }
    });
    
});

function verifyOtp(){
     var $registrationForm = $('#forgot-password-verify');
    
     if($registrationForm.valid()){
        var request_type = 'ForgotPasswordVerifyReturn';
        var form = $('#forgot-password-verify');
        var form_data = form.serialize();
        form_data = form_data + '&user_email='+localStorage.forgot_pass_mail;
       // var image = $("[name='screenshot']")[0];
        var total_form_data = new FormData();
       // total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
    
}

function ForgotPasswordVerifyReturn(data){
    showAlert(data);   
    window.location.href = 'reset_password.html';
}


















