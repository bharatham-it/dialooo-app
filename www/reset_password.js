$(document).ready(function () {
    var $registrationForm = $('#reset-password-form');
    $registrationForm.validate({
        rules: {
            //username is the name of the textbox
            user_pass: {
                required: true,
            },
            confirm_pass: {
                required: true,
            },
        },
        messages: {
            user_pass: {
                //error message for the required field
                required: 'Please enter  new password'
            },
            confirm_pass: {
                //error message for the required field
                required: 'Please enter  confirm password'
            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

});

function chagePassword() {
    var $registrationForm = $('#reset-password-form');

    if ($registrationForm.valid()) {
        var request_type = 'changePasswordReturn';
        var form = $('#reset-password-form');
        var form_data = form.serialize();
        form_data = form_data + '&user_email=' + localStorage.forgot_pass_mail;
        // var image = $("[name='screenshot']")[0];
        var total_form_data = new FormData();
        // total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);


    }

}

function changePasswordReturn(data) {
    showAlert(data);
    window.location.href = 'forgot-otp.html';
    logout();
}


















