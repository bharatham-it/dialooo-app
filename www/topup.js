/* function createTopUpPage(){
    var inputs = [  {
                        type : 'text',
                        label: 'Enter Amount',  
                        name : 'amount',                                        
                    },
                    {
                        type : 'file',
                        label: 'Screenshot',  
                        name : 'screenshot',                                        
                    },
                    {
                        type : 'hidden',
                        value: '38',  
                        name : 'custom_status',                                        
                    },
                    {
                        type : 'button',                      
                        value: 'Add Money',
                        class : 'shadow btn btn-primary btn-rounded btn-sm d-inline',
                        onclick : 'processRecharge()'
                    },

                ];
    var data = {
        page_class : 'page-top-up-module',
        page_nav_name : 'Recharge',
        form_id : 'recharge_shop_account', 
        form_action : 'json_add_top_up',
        form_class : 'validate',
        form_title : 'Recharge', 
        inputs : inputs,
        nav:true
    };
    formCreator(data) ;
     */
$(document).ready(function() {
    var $registrationForm = $('#recharge_shop_account');
    $registrationForm.validate({
        rules: {
            //username is the name of the textbox
            amount: {
                required: true,
            },
            //username is the name of the textbox
            screenshot: {
                required: true,
            },
        },
        messages: {
            amount: {
                //error message for the required field
                required: 'Please enter amount!'
            },
            screenshot: {
                //error message for the required field
                required: 'Please Choose File!'
            },


        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });

});

function processRecharge() {
    var $registrationForm = $('#recharge_shop_account');

    if ($registrationForm.valid()) {
        var request_type = 'rechargeReturn';
        var form = $('#recharge_shop_account');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
        var image = $("[name='screenshot']")[0];
        var total_form_data = new FormData();
        total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }

}

function rechargeReturn(data) {
    showAlert(data);
    activateTab('home');
}