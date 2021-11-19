$(document).ready(function () {
    var $registrationForm = $('#change-password-form');
    $registrationForm.validate({
        rules: {
            old_password :{
                required: true,
            },
            user_pass: {
                required: true,
            },
            confirm_user_pass : {
                required: true,
                noSpace:true,
                equalTo : '#change_pass_user_pass'
            },
        },
        messages: {
            old_password: {
                //error message for the required field
                required: 'Please enter  old password'
            },
            user_pass: {
                //error message for the required field
                required: 'Please enter  new password'
            },
            confirm_pass: {
                //error message for the required field
                required: 'Please confirm  New password'
            },

        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

});

function changeMyPassword() {
    var $registrationForm = $('#change-password-form');

    if ($registrationForm.valid()) {
        var request_type = 'changePasswordReturn';
        var form = $('#change-password-form');
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

function changePasswordReturn(data) {
    showAlert(data);
    $('#change-password-form').trigger('reset');
    logOut();
}


















