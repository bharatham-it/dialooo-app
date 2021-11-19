document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function onDeviceReady() {
    
    document.addEventListener("backbutton", onBackKeyDown, false);
}



function onBackKeyDown(e) {
    e.preventDefault();
    if (backbutton_array.length == 0) {
        navigator.notification.confirm(
            "Are you sure want to exit from App?",
            onConfirmExit,
            "Confirmation",
            "Yes,No"
        );
    }
    backButton();
}

function onConfirmExit(button) {
    if (button == 2) {
        //If User select a No, then return back;
        return;
    }  if (button == 1) {
        navigator.app.exitApp(); // If user select a Yes, quit from the app.
    }
}

var flag_internet = true;

function onOffline() {
    flag_internet = false;
    console.log('no internet connection');
    navigator.notification.alert(
        "No Internet Connection ! ", // message
        alertDismissed, // callback
        "Error", // title
        "Done" // buttonName
    );
}

function alertDismissed(){

}

function onOnline() {
    flag_internet = true;
    loadFromServer();
}




$(document).ready(function() {
   
    //alert(localStorage.referrer_code);
    $('.show-password1').on('click', function() {
        showPassword(this);
    })
    //getMapLocation();profile
})




Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}





function showPassword(button) {
    var inputPassword = $(button).parent().find('input');
    if (inputPassword.attr('type') === "password") {
        inputPassword.attr('type', 'text');
    } else {
        inputPassword.attr('type', 'password');
    }
}

function activateTab(tab_id) {
    if (tab_id == 'add_bank_details') {
        getBankDetails();
    }
    if (tab_id == 'shop_wallet_page') {
        getUserProfile(1)
    }
    if (tab_id == 'search') {
        $('#main_search').val('');
    }

    if (tab_id != 'home') {
        backbutton_array.push(tab_id);
    } else {
        $('.main_search').val('');
    }
    $('.tab-pane-pages').removeClass('show').removeClass('active');
    $('.bottom_nav_link').removeClass('active');
    $('.list-group-item').removeClass('active');
    $("#" + tab_id).addClass('show').addClass('active');
    $("[href='#" + tab_id + "']").addClass('active');
    $("." + tab_id).addClass('active');
    $('.sidebar-left').removeClass('active');
    $('.main-container').removeClass('active');
    $('body').removeClass('sidebar-left-open');
    $('.overlay').hide();
}

function activateTabBack(tab_id) {
    $('.tab-pane-pages').removeClass('show').removeClass('active');
    $('.bottom_nav_link').removeClass('active');
    $('.list-group-item').removeClass('active');
    $("#" + tab_id).addClass('show').addClass('active');
    $("[href='#" + tab_id + "']").addClass('active');
    $("." + tab_id).addClass('active');
    $('.sidebar-left').removeClass('active');
    $('.main-container').removeClass('active');
    $('body').removeClass('sidebar-left-open');
    $('.overlay').hide();
}

function activateBack() {
    $('.menu-btn-left').hide();
    $('.tabs-footer').hide();
    $('.backbtn').show();
}

function disableBack() {
    $('.menu-btn-left').show();
    $('.tabs-footer').show();
    $('.backbtn').hide();
    activateTab('home');
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function navManager() {
    var nav_html = ``;

    if (localStorage.user_role && localStorage.user_role != 'upadmin') {
        nav_html += ` <div class="content">
                        <div id="print_qrwithlogo_id" class="my_qr_page_class_container" >
                            <div class="my_qr_page_class" style="width:256px;height:256px;" onclick="copySponsorCode()">
                            </div>
                        </div>
                        <div class="main_share_button">
                       `;
    //    nav_html += `     <h6 class="text-center mb-0 username-text us_sponsor_id d-inline" onclick="copySponsorCode()">  </h6>`;

    //    nav_html += `<span class="copySponsorCode primary rounded p-1" onclick="copySponsorCode()"> <span class="material-icons">content_copy</span> </span>
    //    </div>`;

    }
    nav_html += ` <div class="main_share_button">
    <p class="text-center mt-1 text-mute username-text user_display_name"></p>`;
    

    nav_html += `<div class="list-group list-group-flush nav-list">
    `;

    if (localStorage.user_role == 'customer') {
        nav_html += `  <a  class="list-group-item d-inline text-success " >
           
                                    <h4 class="float-left">Pv</h4>
                                    <div class="float-right">
                                        <span class="text-link  user_pv">0</span>
                                        <i class="  material-icons" onclick="getWalletData()">account_balance_wallet</i>
                                    </div>
                                </a>`;
    } else if (localStorage.user_role == 'shop') {
        nav_html += `   <a  class="list-group-item d-inline text-success">
                            <h4 class="float-left">Balance</h4>
                            <div class="float-right mt-2">
                                <span class="text-link  shop_wallet_balance">0</span>
                                <i class="mb-1 material-icons" onclick="activateTab('recharge')">account_balance_wallet</i>
                            </div>
                        </a>
                        `;
    }



    var home_button = {
        name: 'Print',
        icon: 'print',
        onclick: `printQrCode()`,
        class: '',
        roles: ['shop']
    };
    nav_html += buildSideMenu(home_button);
    var home_button = {
        name: 'CSV',
        icon: 'print',
        onclick: `getCsv()`,
        class: '',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Share',
        icon: 'share',
        onclick: `shareMyLink()`,
        class: '',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Home',
        icon: 'store',
        onclick: `activateTab('home')`,
        class: 'home active',
        roles: [localStorage.user_role]
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Scan QR',
        icon: 'settings_overscan',
        onclick: `scanQRcode()`,
        class: '',
        roles: ['shop', 'customer']
    };
    nav_html += buildSideMenu(home_button);


    var home_button = {
        name: 'Sponsor Tree',
        icon: 'streetview',
        onclick: `setTreeWithCurrentUserData()`,
        class: 'sponsor_tree_page',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Wallet',
        icon: 'account_balance_wallet',
        onclick: `getWalletData()`,
        class: 'wallet_page',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Wallet',
        icon: 'account_balance_wallet',
        onclick: `getAdminWalletData()`,
        class: 'wallet_page',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);


    var home_button = {
        name: 'Add Bank Details',
        icon: 'account_balance',
        onclick: `activateTab('add_bank_details')`,
        class: 'add_bank_details',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Customer Purchase',
        icon: 'people',
        onclick: `viewTeamPurchase()`,
        class: 'team_purchase',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'My Purchase',
        icon: 'person',
        onclick: `viewMyPurchase()`,
        class: 'my_purchase',
        roles: ['customer']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'My Sales',
        icon: 'receipt',
        onclick: `viewMyPurchase()`,
        class: 'my_purchase',
        roles: ['shop']
    };
    nav_html += buildSideMenu(home_button);
    var home_button = {
        name: 'Recharge Requests',
        icon: 'view_list',
        onclick: `getAllRechargeRequestStatus()`,
        class: 'recharge_requests',
        roles: ['shop', 'upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Add Shop',
        icon: 'add_shopping_cart',
        onclick: `showAddShopPage()`,
        class: 'add_shop',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Add Service',
        icon: 'add_circle_outline',
        onclick: `showAddServicePage()`,
        class: 'add_service',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Add Own Seller',
        icon: 'person_add',
        onclick: `showAddOwnSellerPage()`,
        class: 'add_own_seller',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Services',
        icon: 'list',
        onclick: `getAllServices()`,
        class: 'filtered_services',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Shops',
        icon: 'list',
        onclick: `getAllShops()`,
        class: 'filtered_shops',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Own Seller',
        icon: 'list',
        onclick: `getAllOwnSeller()`,
        class: 'filtered_own_sellers',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Wallet',
        icon: 'account_balance_wallet',
        onclick: `activateTab('shop_wallet_page')`,
        class: 'shop_wallet_page',
        roles: ['shop']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Recharge',
        icon: 'control_point',
        onclick: `activateTab('recharge')`,
        class: 'recharge',
        roles: ['shop']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Purchase',
        icon: 'shopping_basket',
        onclick: `purchaseManually()`,
        class: 'purchase',
        roles: ['shop']
    };
    nav_html += buildSideMenu(home_button);







    var home_button = {
        name: 'Enquiry',
        icon: 'message',
        onclick: `activateTab('add_message')`,
        class: 'Enquiry',
        roles: ['shop', 'customer']
    };
    nav_html += buildSideMenu(home_button);
    var home_button = {
        name: 'Enquiries',
        icon: 'message',
        onclick: `viewMyEnquiries()`,
        class: 'Enquiry',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Report',
        icon: 'toc',
        onclick: `loadAdminReport()`,
        class: 'report',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'User Management',
        icon: 'people',
        onclick: `activateTab('user_management')`,
        class: 'report',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    var home_button = {
        name: 'Settings',
        icon: 'people',
        onclick: `loadSettingsPage()`,
        class: 'report',
        roles: ['upadmin']
    };
    nav_html += buildSideMenu(home_button);

    if (localStorage.user_role) {
        var home_button = {
            name: 'Change Password',
            icon: 'https',
            onclick: `activateTab('change_password')`,
            class: '',
            roles: [localStorage.user_role]
        };
        nav_html += buildSideMenu(home_button);

        var home_button = {
            name: 'Logout',
            icon: 'exit_to_app',
            onclick: `logout()`,
            class: '',
            roles: [localStorage.user_role]
        };
        nav_html += buildSideMenu(home_button);
    }
    nav_html += `  
                    <a  class="list-group-item text-success text-center" >
                        <span class="text-link">
                    </span></a>`;

    nav_html += ` </div> </div>`;

    nav_html += `  </div>`;
    $('.sidebar-left').html(nav_html);


    var bottom_nav_menu_html = ``;

    var bott_nav = {
        name: 'Store',
        onclick: `showHomePage()`,
        icon: 'store',
        class: 'active',
        roles: [localStorage.user_role]

    };
    bottom_nav_menu_html += buildBottomNavigation(bott_nav);

    // var bott_nav = {
    //     name : 'Search',
    //     onclick : `searchPageShow()`,
    //     icon : 'find_in_page',
    //     class : '',
    //     roles : [localStorage.user_role]
    // };
    // bottom_nav_menu_html += buildBottomNavigation(bott_nav);


    var bott_nav = {
        name: 'Account',
        onclick: `activateTab('shop-profile')`,
        icon: 'account_circle',
        class: '',
        roles: ['shop']
    };
    bottom_nav_menu_html += buildBottomNavigation(bott_nav);

    var bott_nav = {
        name: 'Wallet',
        onclick: `activateTab('shop_wallet_page')`,
        icon: 'account_balance_wallet',
        class: '',
        roles: ['shop']
    };
    bottom_nav_menu_html += buildBottomNavigation(bott_nav);


    var bott_nav = {
        name: 'Wallet',
        onclick: `getWalletData()`,
        icon: 'account_balance_wallet',
        class: '',
        roles: ['customer']
    };
    bottom_nav_menu_html += buildBottomNavigation(bott_nav);

    var bott_nav = {
        name: 'Account',
        onclick: `activateTab('profile')`,
        icon: 'account_circle',
        class: '',
        roles: ['customer']
    };
    bottom_nav_menu_html += buildBottomNavigation(bott_nav);


    $('.bottom_nav_menu').html(bottom_nav_menu_html);

}

function buildSideMenu(data) {
    var nav_html = ``;
    if (data.roles.includes(localStorage.user_role)) {
        nav_html += ` <a  class="list-group-item list-group-item-action ` + data.class + `" onclick="` + data.onclick + `"><i
        class="material-icons">` + data.icon + `</i> <span class="text-link">` + data.name + `</span></a>`;
    }
    return nav_html;
}

function profileUpdate() {
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
    var $adminRegistrationForm = $('#customer-profile-update');

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
        var request_type = 'profile_updateReturn';
        var form = $('#customer-profile-update');
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

function profileUpdateShop() {
    jQuery.validator.addMethod("noSpace", function(value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");
    jQuery.validator.addMethod("customEmail", function(value, element) {
        return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "Please enter valid email address!");
    jQuery.validator.addMethod("customphone", function(value, element) {
        return this.optional(element) || /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/.test(value);
    }, "Please enter valid phone number!");
    jQuery.validator.addMethod('filesize', function(value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, "Please choose file with low size!");
    var $adminRegistrationForm = $('#shop-profile-update');

    $adminRegistrationForm.validate({
        rules: {
            file: {
                filesize: 2 * 1024 * 1024
            },
            shop_mobile: {
                required: true,
                noSpace: true,
                customphone: true
            },

            // shop_alt_mobile: {
            //     required: true,
            //     noSpace:true,
            //     customphone:true
            // },

            shop_name: {
                required: true,
                noSpace: true
            },

            shop_email: {
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
                noSpace: true
            },

            district_name: {
                required: true,
                noSpace: true
            },

            street_name: {
                required: true,
                noSpace: true
            },

            landmark: {
                required: true,
                noSpace: true
            },

        },
        messages: {


            shop_mobile: {
                required: 'Please enter mobile number!'
            },

            // shop_alt_mobile: {
            //     required: 'Please enter mobile number!'
            // },

            shop_name: {
                required: 'Please enter your name!'
            },

            shop_email: {
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
        var request_type = 'profile_updateReturn';
        var form = $('#shop-profile-update');
        var form_data = form.serialize();
        form_data = form_data + '&user_key=' + localStorage.user_id;
        var image = $('#update_shop_profilepic')[0];
        var total_form_data = new FormData();

        if (typeof image.files[0] === 'undefined') {} else {
            total_form_data.append('file', image.files[0]);
        }
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}

function profile_updateReturn(data) {
    showAlert(data)
    getUserProfile(1);
}

function districtSelect() {
    var request_type = 'createDistrictSelect';
    var data = {
        type: 'districts',
        user_key: localStorage.user_id,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function createDistrictSelect(district) {
    district_html = '<option value="0" >District</option>';
    $.each(district, function(index, value) {
        district_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.user_profile_district').html(district_html);
}

function showAlert(data) {

    if (data.title && data.subtitle) {
        if (data.class == null) {
            data.class = 'error';
        }
        Swal.fire(
            data.title,
            data.subtitle,
            data.class
        );
    }
}

function getUserProfile(flag_instant_load = 0) {
    if (localStorage.getObj('user_details') && flag_instant_load == 0) {
        get_user_details_for_app(localStorage.getObj('user_details'));
    } else {
        showLoader();
        var request_type = 'get_user_details_for_app';
        if (localStorage.user_role == 'shop') {
            request_type = 'json_get_shop_details';
        }

        var data = {
            action: request_type,
            user_key: localStorage.user_id,
            is_ajax: true
        };
        processFromUrl(data, request_type);
    }

}

var qr_generated = 0;
function get_user_details_for_app(data) {
    localStorage.setObj('user_details', data);
    var data = data.result;

    //common sections
    $('.user_display_name').html(data.display_name);
    $('.user_display_email').html(data.user_email);
    $('.top-bar-logo-image').attr('src', data.image_logo);
    $('.user_image_profile').attr('src', data.image_profile);
    $('.us_sponsor_id').html(data.sponser_code);
    $('.user_display_role').html(data.role);
    if (qr_generated == 0 && data.sponser_code != undefined) {
        
        localStorage.sponser_code = data.sponser_code;
        $('.my_qr_page_class').qrcode(data.sponser_code);
        qr_generated = 1;
    }
    
    
    var form = '#customer-profile-update';
    //wallet section 
    $('.user_pv').html(Number(data.pv).toFixed(2));

    //profile section
    $('.user_profile_name').val(data.display_name);
    localStorage.display_name = data.display_name;
    $('.user_profile_address').val(data.address);
    localStorage.address = data.address;
    $('.user_profile_email').val(data.user_email);
    localStorage.user_email = data.user_email;
    $('.user_profile_pincode').val(data.pincode);
    setTimeout(function(){
        $(form + ' .user_profile_country').val(data.country_id).change();
    },3000)
    $('.user_profile_street_name').val(data.street_name);
    $('.user_profile_postoffice').val(data.post_office);
    $('.user_profile_landmark').val(data.landmark);
    $('.user_profile_mobile_number').val(data.mobile);
    $('.user_profile_alt_mobile_number').val(data.alt_mobile);
    $('.user_profile_town_name').val(data.town_name);
    if (data.image_profile) {
        $('.img-upload-preview').css('background-image', " url('" + data.image_profile + "')");
    }
    $('.profile_pic_attachment_id').val(data.profile_pic);
    $('.form-group').addClass('active');
    setTimeout(function(){
        $(form + ' .user_profile_state').val(data.state_id).change();
    },6000)
    setTimeout(function(){
        $(form + ' .user_profile_district').val(data.district_id);
    },9000)

}

function generateQRCode() {

}

function json_get_shop_details(data) {
    var data = data.result;
    $('.user_display_name').html(data.shop_name);
    $('.user_display_email').html(data.shop_email);
    $('.top-bar-logo-image').attr('src', data.shop_image);
    $('.user_image_profile').attr('src', data.shop_image);
    localStorage.shop_code = data.shop_code;
    $('.us_sponsor_id').html(data.shop_code);
    $('.user_display_role').html(data.role);
    if (qr_generated == 0 && data.shop_code != undefined) {
        $('.my_qr_page_class').qrcode(data.shop_code);
        qr_generated = 1;
    }

    $('.shop_wallet_balance').html(Number(data.shop_balance).toFixed(2));

    //profile section
    $('.user_profile_name').val(data.shop_name);
    $('.user_profile_address').val(data.address);
    $('.user_profile_email').val(data.shop_email);
    $('.user_profile_pincode').val(data.pincode);
    setTimeout(function(){
        $('.user_profile_country').val(data.country_id).change();
    },3000)
    $('.user_profile_district').val(data.district_id);
    $('.user_profile_street_name').val(data.street_name);
    $('.user_profile_postoffice').val(data.post_office);
    $('.user_profile_landmark').val(data.landmark);
    $('.user_profile_mobile_number').val(data.shop_mobile);
    $('.user_profile_alt_mobile_number').val(data.shop_alt_mobile);
    $('.user_profile_town_name').val(data.town_name);
    if (data.shop_image) {
        $('.add-shop-img-upload-preview').css('background-image', " url('" + data.shop_image + "')");
    }
    $('.profile_pic_attachment_id').val(data.profile_pic);
    $('.form-group').addClass('active');
    setTimeout(function(){
        $('.user_profile_state').val(data.state_id).change();
    },6000)
    setTimeout(function(){
        $('.user_profile_district').val(data.district_id);
    },9000)

}


function scanQRcode() {
    newBarcodeScanner();
}


var scanned_code = '';

function newBarcodeScanner() {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            scanned_code = result.text;
            if (scanned_code) {

                getPurchaseData(scanned_code);

            } else {
                Swal.fire({
                    title: 'Do you want to cancel the scan?',
                    showCancelButton: true,
                    confirmButtonText: `Yes`,
                    cancelButtonText: `No`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        showHomeSection();
                    } else {
                        showBillingPage();
                    }
                })
            }

            //confirmation for exit from qr code
            //if yes show home page
        },
        function(error) {
            showAlert({
                title: "Error", // title
                subtitle: "Scanning failed: " + error, // message
                class: 'error'
            })

        }, {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: false, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place an Upstores QR inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: true, // iOS and Android
        }
    );
}

function getPurchaseUserData(data) {
    if (data.status == '1') {
        var data = data.result;
        activateTab('purchase');
        $('.purchase_shop_name').html(data.name);
        $('.purchase_shop_email').html(data.email);
    } else {
        showAlert(data);
    }

}

function purchaseManually() {
    var title = "";
    if (localStorage.user_role == 'shop') {
        title = 'Enter Customer Code';
    } else if (localStorage.user_role == 'customer') {
        title = 'Enter Shop Code';
    }
    Swal.fire({
        title: title,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Purchase',
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.value === null) return false;
        if (result.value === undefined) return false;

        if (result.value === "") {
            return false;
        } else {
            scanned_code = result.value;
            getPurchaseData(scanned_code);

        }
    })
}

function getPurchaseData(scanned_code) {
    getCategorySelectForPurchase(scanned_code);
    var request_type = 'getPurchaseUserData';
    var data = {
        user_key: localStorage.user_id,
        code: scanned_code,
        shop_code: localStorage.shop_code,
        action: 'json_return_data_for_qrscan',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function setTreeWithCurrentUserData() {
    activateTab('sponsor_tree_page');
    var user_id = localStorage.user_id;
    user_name = 'My';
    getChildUsers(user_id, user_name);
}

function treePreviousTree() {

    sponsor_tree_user_name.pop(sponsor_tree_user_name[sponsor_tree_user_name.length - 1]);
    sponsor_tree_user_id.pop(sponsor_tree_user_id[sponsor_tree_user_id.length - 1]);
    if (sponsor_tree_user_id.length > 0) {
        var previous_sponsor_tree_user_id = sponsor_tree_user_id[sponsor_tree_user_id.length - 1];
        var previous_sponsor_tree_user_name = sponsor_tree_user_name[sponsor_tree_user_name.length - 1];
        getChildUsers(previous_sponsor_tree_user_id, previous_sponsor_tree_user_name, 0);
    }
    showHideTreeBackButton();

}

function showHideTreeBackButton() {
    if (sponsor_tree_user_id.length > 1) {
        $('.tree_back_button').show();
    } else {
        $('.tree_back_button').hide();
    }
}

var sponsor_tree_user_name = [];
var sponsor_tree_user_id = [];

function getChildUsers(user_id, user_name, flag_push = 1) {
    var request_type = 'createSponsorTree';
    if (flag_push) {
        sponsor_tree_user_name.push(user_name);
        sponsor_tree_user_id.push(user_id);
    }
    var data = {
        parent_id: user_id,
        user_key: localStorage.user_id,
        action: 'generate_sponser_tree',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function createSponsorTree(data) {
    var data = data.result;
    if (Object.keys(data).length > 0) {
        var parent_data = data.parent_sponsor;
        var sponsor_data = data.child_sponsor;
        $('.tree_current_user_name').html(sponsor_tree_user_name[sponsor_tree_user_name.length - 1]);
        $('.parent_tree_html').html('');
        var parent_html = buildMainItemList(parent_data);
        // $('.parent_tree_html').html(parent_html);
    }
    if (Object.keys(data).length > 0 && Object.keys(sponsor_data).length > 0) {
        var sponsor_html = `<thead>
                <tr>
                    <th scope="col">Levels</th>
                    <th scope="col">Name</th>
                    <th scope="col">PV</th>
                    <th scope="col">CPV</th>
                    <th scope="col">View Members</th>
                </tr>
                </thead>
                <tbody>`;
        var count = 0;
        $.each(sponsor_data, function(key, val) {
            count++;
            var click_html = ''
            var click_class = 'text-dark'
            if (val.child_count > 0) {
                click_class = 'text-dark';
                click_html = `<button class="btn btn-sm btn-success"onclick="getChildUsers(` + val.ID + `,'` + val.display_name + `')" >View More</button>`;
            }
            sponsor_html += `
                            <tr>
                                <td>` + data.level_id + `</td>
                                <td ><a class="` + click_class + `" href="#">` + val.display_name + `</a></td>
                                <td>` + Number(val.pv).toFixed(2) + `</td>
                                <td>` + Number(val.tpv).toFixed(2) + `</td>
                                <td >` + click_html + `</td>
                            </tr>`;

        })
        sponsor_html += `
                
                    </tbody>`;

        $('#sponsor_data_table').html(sponsor_html);
        $('#sponsor_data_table').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });

    } else {
        appendHtml('sponsor_data_table', '', 1);
    }

    showHideTreeBackButton();

}

function previewImages(ele) {
    //$('.image-preview').empty();
    var fileList = ele.files;
    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(fileList[0]);
    $('.img-upload-preview').css({ 'background-image': 'url(' + objectUrl + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center center' });
    window.URL.revokeObjectURL(fileList[0]);

}

function previewImagesAddShop(ele) {
    //$('.image-preview').empty();
    var fileList = ele.files;
    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(fileList[0]);
    $('.add-shop-img-upload-preview').css({ 'background-image': 'url(' + objectUrl + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center center' });
    window.URL.revokeObjectURL(fileList[0]);

}

function getCategorySelectForPurchase(scanned_code) {
    var request_type = 'createCategoryForPurchaseSelect';
    var data = {
        type: 'categories_by_type',
        user_key: localStorage.user_id,
        code: scanned_code,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function createCategoryForPurchaseSelect(category) {
    category_html = '';
    $.each(category, function(index, value) {
        category_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.category_all_class').html(category_html);
}

function getCategorySelect() {
    var request_type = 'createCategorySelect';
    var data = {
        type: 'item_categories',
        user_key: localStorage.user_id,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function createCategorySelect(category) {
    category_html = '';
    $.each(category, function(index, value) {
        category_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.category_all_class').html(category_html);
}


function getServiceSelect() {
    var request_type = 'createServiceSelect';
    var data = {
        type: 'service_categories',
        user_key: localStorage.user_id,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}
var service_html = '';

function createServiceSelect(service) {
    service_html = '';
    $.each(service, function(index, value) {
        service_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.category_all_class').html(service_html);
}

function getOwnSellerSelect() {
    var request_type = 'createOwnSellerSelect';
    var data = {
        type: 'seller_categories',
        user_key: localStorage.user_id,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}
var own_seller_html = '';

function createOwnSellerSelect(ownseller) {
    own_seller_html = '';
    $.each(ownseller, function(index, value) {
        own_seller_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.category_all_class').html(own_seller_html);
}

function submitBill() {
    request_type = 'billingReturn';
    var bill_data = {
        user_key: localStorage.user_id,
        code: scanned_code,
        shop_code: localStorage.shop_code,
        action: 'submit_function_add_purchases'
    }
    var serialized_data = serializeFn(bill_data);

    data = serialized_data + '&' + $('#category_price_form').serialize();

    processFromUrl(data, request_type, bill_data.action);

}

function billingReturn(data) {
    showAlert(data);
    $("#category_price_form").trigger('reset');
    viewMyPurchase();
}

function showShopWalletPage() {
    activateTab('shop_wallet_page');
    getShopWallet();
}

function getShopWallet() {

    var request_type = 'json_show_wallet_balance';
    var data = {
        action: 'json_show_wallet_balance',
        user_key: localStorage.user_id,
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function json_show_wallet_balance(data) {
    var data = data.result;
    $('.shop_wallet_balance').html(data.wallet_balance);
    $('.shop_wallet_balance_last_updated').html(data.last_updated);
}

function logOut() {
    localStorage.user_id = '';
    localStorage.user_role = '';
    localStorage.clear();
    window.location.href = 'signin.html';
}

function copySponsorCode() {
    
    $('.copySponsorCode').addClass('success').removeClass('primary').html(`<span class="material-icons">
    done_all
    </span>Copied`);
    copyToClipboard($('.us_sponsor_id').text())
    setTimeout(function() {
        $('.copySponsorCode').removeClass('success').addClass('primary').html(`<span class="material-icons">
        content_copy
        </span>`);
    }, 1000);
}










var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    //navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function(position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    // var mapOptions = {
    //     center: new google.maps.LatLng(0, 0),
    //     zoom: 1,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // map = new google.maps.Map(document.getElementById("map"), mapOptions);


    // var latLong = new google.maps.LatLng(latitude, longitude);

    // var marker = new google.maps.Marker({
    //     position: latLong
    // });

    // marker.setMap(map);
    // map.setZoom(15);
    // map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function(position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}


function searchCategory(search_keyword) {
    $('.main_search').val(search_keyword);
    searchPageShow();
    var request_type = 'searchResult';
    var data = {
        keyword: search_keyword,
        user_key: localStorage.user_id,
        action: 'json_search_data',
        is_ajax: true
    };
    processFromUrl(data, request_type);

}

function searchResult(data) {
    appendHtml('search_items_listing', ' ', 1);
    var data = data.result;
    var advertisers_list = '';
    $.each(data, function(index, value) {

        advertisers_list += `
            <div class="col-6 col-md-4 col-lg-3">
            <div class="card border-0 mb-4">
                <div class="card-body p-0"  onclick="loadSingleDetails(` + value.shop_id + `,'` + shop_service_category_type + `')">
                    <div class="h-150px has-background rounded mb-2" >
                     
                        <a href="#" class="background " style="background-image:url('` + value.image + `');">
                           
                        </a>
                    </div>
                    
                    <a href="#">
                        <p class="mb-0 text-secondary">` + value.shop_name + `</p>
                    </a>
                    <small class="text-mute">` + value.town_name + `</small>
                    <p class="small">` + value.mobile + `</p>
                </div>
            </div>
        </div>`;
    })
    appendHtml('search_items_listing', advertisers_list, 1);


}

function searchPageShow() {
    activateTab('search');
}

function showHomePage() {
    activateTab('home');
    $('.main_search').val('');
}


function loadPiChart(selector, array_data, title) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function() {
        drawPiChart(selector, array_data, title);
    });
}

function drawPiChart(selector, array_data, title) {
    var data = google.visualization.arrayToDataTable(array_data);

    var options = {
        title: title,
        width: '500px',
        height: '300px'
    };

    var chart = new google.visualization.PieChart(document.getElementById(selector));

    chart.draw(data, options);
}

function loadBarChart(selector, array_data, title) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function() {
        drawBarChart(selector, array_data, title);
    });
}

function drawBarChart(selector, array_data, title) {
    var data = google.visualization.arrayToDataTable(array_data);

    var options = {
        title: title,
        width: '500px',
        height: '300px'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById(selector));

    chart.draw(data, options);
}
function printQrCode(){
    createImageAndSend();
}
function shareMyLink(){
    var share_link = `http://upstores.co.in/register.html?referrer=`+localStorage.sponser_code;
    var data = {
        message: share_link,
        subject: 'Upstores',
        title: 'Pick an App',
        files: ''
    };
    socialShareSend(data);
}

function createImageAndSend(element) {
    var canvas = $('.my_qr_page_class').find('canvas')[0];
    var dataURL = canvas.toDataURL("image/png");
    var shop_name = $('.user_display_name').first().text();
    var html = `<div style="margin-left:50px;">
    <h1 style="margin-left:280px;font-size:40px;height:30px;margin-bottom:50px;">`+shop_name+`</h1>
    <img src='` + dataURL + `' alt='from canvas'/ style="margin-left:50px;height:500px;width:500px;">
    <br><img src="assets/img/Upstors.png"  style="height:370px;width:600px;">
    </div>`;
    cordova.plugins.html2pdf.create(
        html,
        "~/Documents/upstores-qr.pdf", // on iOS,
        // "test.pdf", on Android (will be stored in /mnt/sdcard/cordova.plugin.html2pdf/test.pdf)
        function(){
            
        },
        function(){
            
        },
    );
}


function socialShareSend(data) {

    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
        message: data.message, // not supported on some apps (Facebook, Instagram)
        subject: data.subject, // fi. for email
        files: data.files, // an array of filenames either locally or remotely
        //   url: 'https://www.website.com/foo/#bar?a=b',
        chooserTitle: data.title, // Android only, you can override the default share sheet title
        //appPackageName: 'com.whatsapp', // Android only, you can provide id of the App you want to share with
        // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    window.plugins.socialsharing.shareWithOptions(options, onSocialShareSuccess, onSocialShareError);
}

function onSocialShareSuccess(){

}

function onSocialShareError(){

}
function getCsv(){
    var request_type = 'printCsv';
    var data = {
        user_key: localStorage.user_id,
        action: 'json_generate_wallet_withdraw_csv',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function printCsv(data){
    var url = data.result.url;
    window.open(url,'_system');
}