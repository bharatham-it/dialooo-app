
$(document).ready(function () {
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value == '' || value.trim().length != 0;  
    }, "No space please and don't leave it empty");
    jQuery.validator.addMethod("customEmail", function(value, element) { 
        return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
      }, "Please enter valid email address!");      
      jQuery.validator.addMethod("customphone", function(value, element) {
        return this.optional(element) || value.trim().length == 10 && /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid phone number!");
    jQuery.validator.addMethod("custompin", function(value, element) {
        return this.optional(element) || value.trim().length == 6 && /([0-9]{6})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid pin number!");

    jQuery.validator.addMethod("selectbox_empty_check", function(value, element) { 
        return value !=  '' && value != 0;  
    }, " don't leave it empty");

    var $addShopForm = $('#add-bank-details');
    $addShopForm.validate({
        rules:{
            account_no: {
                required: true,
                noSpace:true
            },
            account_no2: {
                required: true,
                noSpace:true,
                equalTo : '#account_no'
            },

            ifsc_code: {
                required: true,
                noSpace: true,
            },

            account_holder_name: {
                required: true,
                noSpace: true,
            },
            pan_number: {
                required: true,
                noSpace: true,
            },

        },
        messages:{           
            account_no: {
                required: 'Please enter account numer!'
            },
            account_no2: {
                required: 'Please confirm account numer!'
            },

            ifsc_code: {
                required: 'Please enter ifsc code code!'               
            },

            account_holder_name: {
                required: 'Please enter account holder name!'               
            },     
            pan_number: {
                required: 'Please enter PAN number!'               
            },     
            
        },
        errorPlacement: function(error, element) 
        {
            error.insertAfter( element );
        }
    });


});




function addBankDetails(){
    var request_type = 'addBankDetailsReturn';
    var $addshopForm = $('#add-bank-details');
    if($addshopForm.valid()){
        var form = $('#add-bank-details');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
      //  var image = $('#add_shop_profilepic')[0];
        var total_form_data = new FormData();
      //  total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}

function addBankDetailsReturn(data){
    showAlert(data);
    var data = data.result;
    getBankDetails();
}

function getBankDetails(){
    
    var request_type = 'showBankData';
    var data = {
        user_key: localStorage.user_id,
        action: 'json_get_bank_account_details',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function showBankData(data){
    var data = data.result;
    if(data.update_status == '1'){
        $('#add-bank-details .bank_details_button').hide();
    }
    else{
        $('#add-bank-details .bank_details_button').show();
    }
    $('#add-bank-details [name=account_no]').val(data.account_no);
    $('#add-bank-details [name=account_no2]').val(data.account_no);
    $('#add-bank-details [name=ifsc_code]').val(data.ifsc_code);
    $('#add-bank-details [name=account_holder_name]').val(data.account_holder_name);
    $('#add-bank-details [name=pan_number]').val(data.pan_number);
    $('#add-bank-details [name=upi_id]').val(data.upi_id);
}