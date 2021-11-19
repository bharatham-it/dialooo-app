$(document).ready(function() {
    var $registrationForm = $('#forgot-password');
    jQuery.validator.addMethod("customEmail", function(value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Please enter valid email address!");
    $registrationForm.validate({
        rules: {
            //username is the name of the textbox
            user_email: {
                required: true,
                customEmail: true
            },
        },
        messages: {
            user_email: {
                //error message for the required field
                required: 'Please enter Email',
                customEmail: 'Please enter valid email!'
            },

        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });
})

function sendForgotPasswordRequest() {

    var $registrationForm = $('#forgot-password');

    if ($registrationForm.valid()) {
        var request_type = 'ForgotPasswordReturn';
        var form = $('#forgot-password');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
        // var image = $("[name='screenshot']")[0];
        var total_form_data = new FormData();
        // total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);

    }


}

function ForgotPasswordReturn(data) {
    showAlert(data);
    localStorage.forgot_pass_mail = $("#forgot-password [name=user_email]").val();
    window.location.href = 'forgot-otp.html';
}
