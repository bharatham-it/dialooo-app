$(document).ready(function () {

    
});
function sendRequirements(){
    var $registrationForm = $('#requirement_form');
    $registrationForm.validate({
        rules:{
            requirement: {
                required: true,
            },
        },
        messages:{
            requirement: {
                required: 'Please enter requirements!'
            },
          
            
            
        },
        errorPlacement: function(error, element) 
        {
            error.insertAfter( element );
        }
    });
    var $registrationForm = $('#requirement_form');
   
    if($registrationForm.valid()){
       var request_type = 'requirementsReturn';
       var form =  $registrationForm;
       var form_data = form.serialize();
       if(localStorage.user_role == 'shop'){
        form_data = form_data + '&user_key=' + localStorage.user_id+'&required_type=shop';
       }
       if(localStorage.user_role == 'customer'){
        form_data = form_data + '&user_key=' + localStorage.user_id+'&required_type=customer';
       }
       var total_form_data = new FormData();
       total_form_data.append('formdata', form_data);
       total_form_data.append('action', form.attr('action'));
       processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
   
}

function requirementsReturn(data){
   showAlert(data);
}