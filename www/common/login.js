function login(){
    var $login_form =$('#login-form');
    $login_form.validate({
        rules:{
            //username is the name of the textbox
            user_login: {
                
                required: true,
            },
            user_password
            : {
                required: true,
            },
        },
        messages:{
            user_login: {
                //error message for the required field
                required: 'Please enter Username!'
            },
            user_password: {
                //error message for the required field
                required: 'Please enter Password!'
            },
            
        },
        errorPlacement: function(error, element) 
        {
            error.insertAfter( element );
        }
    }); 
    if ($login_form.valid()) {
        showLoader();
       var request_type = 'login_success'; 
        /*  var request_type = 'rechargeReturn'; */
        var form = $('#login-form');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
        /* var image = $("[name='screenshot']")[0]; */
        var total_form_data = new FormData();
       /*  total_form_data.append('file', image.files[0]); */
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
       
}
function login_success(data){ 
    if (data.status == '1') {
        var data = data.result;
        localStorage.user_id = data.user_id;
        localStorage.user_role = data.role;
        window.location.href = 'index.html';
    }
    else{
        showAlert(data)
    }
}
