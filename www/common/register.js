
$( document ).ready(function() {
    getSponsorName()
    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");
    jQuery.validator.addMethod("customEmail", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Please enter valid email address!");
    jQuery.validator.addMethod("customphone", function(value, element) {
        return this.optional(element) || value.trim().length >= 10 && value.trim().length < 14 && /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid phone number!");
    jQuery.validator.addMethod("custompin", function(value, element) {
        return this.optional(element) || value.trim().length == 6 && /([0-9]{6})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid pin number!");
    jQuery.validator.addMethod("selectbox_empty_check", function(value, element) { 
        return value !=  '' && value != 0;  
    }, " don't leave it empty");
    var $registrationForm = $('#customer-registration');
    $registrationForm.validate({
        rules: {
            sponser_code: {
                required: true,
                noSpace: true
            },
            mobile: {
                required: true,
                noSpace: true,
                customphone: true
            },

           /*  alt_mobile: {
                required: true,
                noSpace: true,
                customphone: true
            }, */

            display_name: {
                required: true,
                noSpace: true
            },

            user_email: {
                required: true,
                noSpace: true,
                customEmail: true
            },

            address: {
                required: true,
                noSpace: true
            },

            town_name: {
                required: true,
                noSpace: true
            },

            pincode: {
                required: true,
                noSpace: true,
                custompin:true
            },

            district_id: {
                required: true,
                selectbox_empty_check:true,
                noSpace: true
            },

            street_name: {
                required: true,
                noSpace: true
            },

            postoffice: {
                required: true,
                noSpace: true
            },

            landmark: {
                required: true,
                noSpace: true
            },

            user_login: {
                required: true,
                noSpace: true
            },
            user_pass: {
                required: true,
                noSpace: true
            },
            confirm_pass: {
                required: true,
                noSpace: true,
                equalTo: "#user_pass" 
            },


        },
        messages: {
            sponser_code: {
                required: 'Please enter sponsor_code!'
            },
          

           /*  profile_pic: {
                required: 'Please Upload Profile Pic!'
            }, */

            mobile: {
                //error message for the required field
                required: 'Please enter mobile!',
               
            },
           /*  alt_mobile: {
                required: 'Please enter mobile!',
                
            }, */

            display_name: {
                required: 'Please enter name!'
            },

            user_email: {
                required: 'Please enter email!',
               
            },

            address: {
                required: 'Please enter address!'
            },

            town_name: {
                required: 'Please enter town name!'
            },

            pincode: {
                required: 'Please enter pincode!'
            },

            district_id: {
                required: 'Please enter district!'
            },

            street_name: {
                required: 'Please enter street name!'
            },

            postoffice: {
                required: 'Please enter postoffice!'
            },

            landmark: {
                required: 'Please enter landmark!'
            },

            user_login: {
                required: 'Please enter username!'
            },
            user_pass: {
                required: 'Please enter password!'
            },
            confirm_pass: {
                required: 'Please enter password!',
                equalTo : 'Please enter same password as above!' 
            },


        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
    $('[name=sponser_code]').focusout(function(){
        getSponsorName();
    })
    console.log('register creation',localStorage.referrer_code)
});

function getSponsorName(){
    var sponsor_code = $('[name=sponser_code]').val();
    var request_type = 'getSponsorNameReturn';
    var data = {
        action: 'json_get_sponsor_name_by_code',
        sponsor_code : sponsor_code,
        user_key: localStorage.user_id,
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function getSponsorNameReturn(data){
    var data = data.result;
    $('.sponser_name').html(data.sponsor_name);
}


function signUp() {
    
    var $registrationForm = $('#customer-registration');
    if ($registrationForm.valid()) {
        showLoader();
        var request_type = 'signupReturn';
        var form = $('#customer-registration');
        var form_data = $('#customer-registration').serialize();
       // var image = $('#profile_pic')[0];
        var total_form_data = new FormData();
      //  total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}

function signupReturn(data){
    showAlert(data)
    if (data.status == '1') {
        setTimeout(function(){ 
            window.location.href = 'signin.html';
         }, 2000);
    }
    
}

function signUpWeb() {
    
    var $registrationForm = $('#customer-registration');
    if ($registrationForm.valid()) {
        showLoader();
        var request_type = 'signupReturnWeb';
        var form = $('#customer-registration');
        var form_data = $('#customer-registration').serialize();
       // var image = $('#profile_pic')[0];
        var total_form_data = new FormData();
      //  total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}

function signupReturnWeb(data){
    showAlert(data)
    if (data.status == '1') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.upstore.upstore';
    }
    
}
