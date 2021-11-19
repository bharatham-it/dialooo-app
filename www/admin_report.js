function loadAdminReport() {
    loadAdminReportUsers();
    loadAdminReportCategories();
    loadAdminReportPurchase();
    createAdminTopPvUsers();
    createAdminTopEarnUsers();
    
}


function loadAdminReportUsers() {
    var request_type = 'createAdminChartsUsers';
    var data = {
        user_key: localStorage.user_id,
        custom_status: status,
        action: 'get_pie_count_users',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}

function createAdminChartsUsers(data) {

    activateTab('admin_report');
    var data = data.result;
    var new_user_chart = data.users;
    var array_data = [
        ['Users', 'Count'],
        ['New', new_user_chart.new_user_count],
        ['users', new_user_chart.balance_user],
    ];
    var element_id = 'piechart';
    var title = 'New Users';

    var html = `<table id="users_admin_counts">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            <td>New </td>
                            <td>`+new_user_chart.new_user_count+`</td>
                        </tr>
                        <tr>
                            <td>Total </td>
                           <td>`+new_user_chart.balance_user+`</td>
                       </tr>
                    </tbody>
                </table>`;
                $('#'+element_id).html(html);
                $('#users_admin_counts').DataTable({
                    destroy: true,
                    responsive: true,
                    searching: false,
                    paging: false,
                    info: false
                });
   // loadPiChart(element_id, array_data, title);
}

function loadAdminReportCategories() {
    var request_type = 'createAdminChartsCategories';
    var data = {
        user_key: localStorage.user_id,
        custom_status: status,
        action: 'get_pie_count_categories',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}



function createAdminChartsCategories(data) {

    activateTab('admin_report');
    var data = data.result;
    // var array_data = [
    //     ['Element', 'Categories', { role: 'style' }],

    // ];
    // var colors = ['green', 'blue', 'red', 'violet', 'yellow'];
    // $.each(data, function(index, value) {
    //     array_data.push([value.type, Number(value.count), colors[index]]);
    // })
    // console.log(array_data)
    var element_id = 'piechart1';
    var title = 'Category Chart';
    var html = `<table id="categories_admin_counts">
    <thead>
        <tr>
            <th>Category</th>
            <th>Count</th>
        </tr>
    </thead>
    <tbody> `;
    $.each(data, function(index, value) {
      //  array_data.push([value.type, Number(value.count), colors[index]]);
        html += `   <tr>
        <td>`+value.type+` </td>
        <td>`+value.count+`</td>
    </tr>
    `;
    })
   

       html += `   </tbody>
</table>`;
$('#'+element_id).html(html);
$('#categories_admin_counts').DataTable({
    destroy: true,
    responsive: true,
    searching: false,
    paging: false,
    info: false
});
    loadBarChart(element_id, array_data, title);
}

function loadAdminReportPurchase() {
    var request_type = 'createAdminChartsPurchase';
    var data = {
        user_key: localStorage.user_id,
        custom_status: status,
        action: 'get_pie_count_purchase',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}



function createAdminChartsPurchase(data) {

    activateTab('admin_report');
    var data = data.result;

    // var array_data = [
    //     ['Purachse', 'Count'],
    //     ['New', data.new_purchase],
    //     ['Total', data.total_purchase],
    // ];
    
    var element_id = 'piechart2';
    var title = 'Purchase Chart';
    var html = `<table id="purchase_admin_counts">
    <thead>
        <tr>
            <th>Type</th>
            <th>Count</th>
        </tr>
    </thead>
    <tbody> 
        <tr>
            <td>New </td>
            <td>`+data.new_purchase+`</td>
        </tr>
        <tr>
            <td>Total </td>
           <td>`+data.total_purchase+`</td>
       </tr>
    </tbody>
</table>`;
$('#'+element_id).html(html);
$('#purchase_admin_counts').DataTable({
    destroy: true,
    responsive: true,
    searching: false,
    paging: false,
    info: false
});
   // loadPiChart(element_id, array_data, title);

}

function createAdminTopPvUsers() {
    var request_type = 'createAdminTopPvUsersReturn';
    var data = {
        user_key: localStorage.user_id,
        action: 'get_hundread_pv_achivers',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}



function createAdminTopPvUsersReturn(data) {
    var data = data.result;

    activateTab('admin_report');
    if (Object.keys(data).length > 0) {
        var sponsor_html = `<thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">PV</th>
                    <th scope="col">Levels</th>
                    <th scope="col">Customers</th>
                </tr>
                </thead>
                <tbody>`;
        var count = 0;
        $.each(data, function(key, val) {
            count++;

            sponsor_html += `
                            <tr>
                                <td>` + count + `</td>
                                <td>` + val.display_name + `</td>
                                <td>` + val.pv + `</td>
                                <td>` + val.levels + `</td>
                                <td>` + val.total_customers + `</td>
                            </tr>`;

        })
        sponsor_html += `
                
                    </tbody>`;

        $('#top_pv_users').html(sponsor_html);
        $('#top_pv_users').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });

    } else {
        appendHtml('top_pv_users', '', 1);
    }

}


function createAdminTopEarnUsers() {
    var request_type = 'createAdminTopEarnUsersReturn';
    var data = {
        user_key: localStorage.user_id,
        action: 'get_top_earners',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}



function createAdminTopEarnUsersReturn(data) {
    var data = data.result;

    activateTab('admin_report');
    if (Object.keys(data).length > 0) {
        var sponsor_html = `<thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Levels</th>
                    <th scope="col">Customers</th>
                </tr>
                </thead>
                <tbody>`;
        var count = 0;
        $.each(data, function(key, val) {
            count++;

            sponsor_html += `
                            <tr>
                                <td>` + count + `</td>
                                <td>` + val.display_name + `</td>
                                <td>` + val.amount + `</td>
                                <td>` + val.levels + `</td>
                                <td>` + val.total_customers + `</td>
                            </tr>`;

        })
        sponsor_html += `
                
                    </tbody>`;

        $('#top_earn_users').html(sponsor_html);
        $('#top_earn_users').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });

    } else {
        appendHtml('top_earn_users', '', 1);
    }

}

function createAdminWithdrawalList() {
    var from_date = $('[name=admin_from_date_withdrawal]').val();
    var to_date = $('[name=admin_to_date_withdrawal]').val();
    var request_type = 'createAdminWithdrawalListReturn';
    var data = {
        user_key: localStorage.user_id,
        action: 'get_withdrwal_report',
        from_date : from_date,
        to_date : to_date,
        is_ajax: true
    };
    processFromUrl(data, request_type);

}

function createAdminPurchaseList() {
    var from_date = $('[name=admin_from_date_purchase]').val();
    var to_date = $('[name=admin_to_date_purchase]').val();
    var purchases_cateogry = $('.purchases_cateogry_admin_report').val();
    var request_type = 'createAdminPurchaseListReturn';
    var data = {
        user_key: localStorage.user_id,
        action: 'json_get_admin_purchase_reports',
        type : purchases_cateogry,
        from_date : from_date,
        to_date : to_date,
        is_ajax: true
    };
    processFromUrl(data, request_type);

}



function createAdminPurchaseListReturn(data) {
    var data = data.result;
    $('.admin_total_purchase_amount').html(data[0].amount);
   // $('.admin_total_purchase_till_date').html(data.total_purchase_dated);
    activateTab('admin_report');
    if (Object.keys(data.total_purchase_data).length > 0) {
        var sponsor_html = `<thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                </tr>
                </thead>
                <tbody>`;
        var count = 0;
        $.each(data.total_purchase_data, function(key, val) {
            count++;

            sponsor_html += `
                            <tr>
                                <td>` + count + `</td>
                                <td>` + val.name + `</td>
                                <td>` + val.amount + `</td>
                            </tr>`;

        })
        sponsor_html += `
                
                    </tbody>`;

        $('#admin_all_purchase').html(sponsor_html);
        $('#admin_all_purchase').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });

    } else {
        appendHtml('admin_all_purchase', '', 1);
    }

}


function searchUser(key) {
    $('.user_management_form').hide();
    var request_type = 'listUserDataReturn';
    last_search_key = key;
    var data = {
        user_key: localStorage.user_id,
        user_login: key,
        action: 'json_get_user_detail_for_managment',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function listUserDataReturn(data) {
    if (data.status == '1') {
        var data = data.result;
        if(typeof data.ID == 'undefined'){
            showAlert({
                title : 'Error', 
                subtitle : 'No such User',
                class : 'error'
            });
        }
        else{
            var bank_data = data.bank_data;
            $('.user_management_form').show();
            var form = '#admin-customer-profile-update';
            //profile section
            $(form + ' .user_profile_name').val(data.display_name);
            $('.user_management_form  .admin_user_display_name').html(data.display_name);
            $(form + ' .user_profile_address').val(data.address);
            $(form + ' .user_profile_email').val(data.user_email);
            $('.user_management_form  .admin_user_display_email').html(data.user_email);
            $(form + ' .user_profile_pincode').val(data.pincode);
            $(form + ' .user_profile_country').val(data.country_id).change();
            $(form + ' .user_profile_street_name').val(data.street_name);
            $(form + ' .user_profile_postoffice').val(data.postoffice);
            $(form + ' .user_profile_landmark').val(data.landmark);
            $(form + ' .user_profile_mobile_number').val(data.mobile);
            $(form + ' .user_profile_alt_mobile_number').val(data.alt_mobile);
            $(form + ' .user_profile_town_name').val(data.town_name);
    
            $(form + ' [name=account_no]').val(bank_data.account_no);
            $(form + ' [name=account_holder_name]').val(bank_data.account_holder_name);
            $(form + ' [name=ifsc_code]').val(bank_data.ifsc_code);
            $(form + ' [name=pan_number]').val(bank_data.pan_number);
            $(form + ' [name=upi_id]').val(bank_data.upi_id);
    
            $(form + ' .user_id').val(data.ID);
            if (data.image_profile) {
                $('.user_management_form .img-upload-preview').css('background-image', " url('" + data.image_profile + "')");
            }
            $(form + ' .profile_pic_attachment_id').val(data.profile_pic);
            setTimeout(function(){
                $(form + ' .user_profile_state').val(data.state_id).change();
            },2000)
            setTimeout(function(){
                $(form + ' .user_profile_district').val(data.district_id);
            },4000)
           
        }
        
    } else {
        showAlert(data);
    }
}

function activateDeactivateUser(ele) {
    $(ele).removeClass('btn-success').removeClass('btn-danger');
    if ($(ele).text() == 'Activate') {
        $(ele).addClass('btn-danger');
        $(ele).text('Deactivate')
    } else if ($(ele).text() == 'Deactivate') {
        $(ele).addClass('btn-success');
        $(ele).text('Activate')
    }
}


function adminCustomerProfileUpdate() {
    jQuery.validator.addMethod("noSpace", function(value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");
    jQuery.validator.addMethod("customEmail", function(value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Please enter valid email address!");
    jQuery.validator.addMethod("customphone", function(value, element) {
        return this.optional(element) || value.trim().length == 10 && /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid phone number!");
    jQuery.validator.addMethod("custompin", function(value, element) {
        return this.optional(element) || value.trim().length == 6 && /([0-9]{6})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid pin number!");
    jQuery.validator.addMethod('filesize', function(value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, "Please choose file with low size!");
    var $adminRegistrationForm = $('#admin-customer-profile-update');

    $adminRegistrationForm.validate({
        rules: {
            file: {
                filesize: 2 * 1024 * 1024
            },
            mobile: {
                required: true,
                noSpace: true,
                customphone: true
            },

            // alt_mobile: {
            //     required: true,
            //     noSpace: true,
            //     customphone: true
            // },

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
                custompin: true
            },

            district_name: {
                required: true,
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

        },
        messages: {


            mobile: {
                required: 'Please enter mobile number!'
            },

            // alt_mobile: {
            //     required: 'Please enter mobile number!'
            // },

            display_name: {
                required: 'Please enter your name!'
            },

            user_email: {
                required: 'Please enter email!'
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

            district_name: {
                required: 'Please choose district!'
            },

            street_name: {
                required: 'Please enter street name!'
            },

            postoffice: {
                required: 'Please enter post office!'
            },

            landmark: {
                required: 'Please enter landmark!'
            },


        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });
    if ($adminRegistrationForm.valid()) {
        var request_type = 'adminUserProfileUpdateReturn';
        var form = $('#admin-customer-profile-update');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
        var image = $('#update_profilepic')[0];
        var total_form_data = new FormData();

        if (typeof image.files[0] === 'undefined') {} else {
            total_form_data.append('file', image.files[0]);
        }
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}

var last_search_key = '';
function adminUserProfileUpdateReturn(data) {
    showAlert(data);
    searchUser(last_search_key);
}

function loadSettingsPage(){
   
    getSettingsValues();
   
}


function getSettingsValues(){
    var request_type = "getSettingsValuesReturn";

    var data = {
        user_key: localStorage.user_id,
        action: "json_get_admin_settings",
        is_ajax: true,
    };
    processFromUrl(data, request_type);
}

function getSettingsValuesReturn(data){
    var data = data.result;
    activateTab('admin_settings');
    $('.settings_type_check').change(function(){
        if($(this).prop("checked")){
            $(this).parent().find('.settings_type_value').val(1);
        }
        else{
            $(this).parent().find('.settings_type_value').val(0);
        }
        festiveUnlock();
    });
    $.each(data, function(index, value) {
        $('[name="settings_type['+value.settings_type+']"]').val(value.value);
        var cheked_value = false;
        if(value.value == 1)
            cheked_value = true;
        $('[name="settings_type['+value.settings_type+']"]').parent().find('.settings_type_check').attr('checked', cheked_value);
    });
}

function festiveUnlock(){
    
    var request_type = 'adminSettingsReturn';
    var form = $('#admin_settings_form');
    var form_data = form.serialize();
    form_data = form_data + '&user_key=' + localStorage.user_id;
   // var image = $('#update_profilepic')[0];
    var total_form_data = new FormData();

    // if (typeof image.files[0] === 'undefined') {} else {
    //     total_form_data.append('file', image.files[0]);
    // }
    total_form_data.append('formdata', form_data);
    total_form_data.append('action', form.attr('action'));
    processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
}

function adminSettingsReturn(data){

}
