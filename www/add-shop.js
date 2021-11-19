$(document).ready(function() {
   
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

    jQuery.validator.addMethod("selectbox_empty_check", function(value, element) {
        return value != '' && value != 0;
    }, " don't leave it empty");

    var $addShopForm = $('#add-shops');
    $addShopForm.validate({
        rules: {
            title: {
                required: true,
                noSpace: true
            },
            shop_email: {
                required: true,
                noSpace: true,
                customEmail: true
            },

            shop_mobile: {
                required: true,
                noSpace: true,
                customphone: true
            },

            /*  shop_alt_mobile: {
                 required: true,
                 noSpace: true,
                 customphone:true
             }, */

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

            district_id: {
                required: true,
                noSpace: true,
                selectbox_empty_check: true
            },
            street_name: {
                required: true,
                noSpace: true
            },

            landmark: {
                required: true,
                noSpace: true
            },
            // gst_no: {
            //     required: true,
            //     noSpace: true
            // },
            // map_url: {
            //     required: true,
            //     noSpace:true
            // },
            // video_url: {
            //     required: true,
            //     noSpace:true
            // },
            user_login: {
                required: true,
                noSpace: true
            },
            // user_pass: {
            //     required: true,
            //     noSpace: true,
            // },

        },
        messages: {
            title: {
                required: 'Please enter name!'
            },
            //username is the name of the textbox
            shop_email: {
                required: 'Please enter email!'
            },

            shop_mobile: {
                required: 'Please enter mobile number!'
            },

            /* shop_alt_mobile: {
                required: 'Please enter mobile number!'               
            }, */

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

            // landmark: {
            //     required: 'Please enter landmark!'
            // },
            gst_no: {
                required: 'Please enter landmark!'
            },
            user_login: {
                required: 'Please enter user name!'
            },
            user_pass: {
                required: 'Please enter password!'
            },

        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });
    initRating()

});

function initRating(){
    const rating = document.querySelector('.rating');
    const selects = document.querySelectorAll('[type*="radio"]');
    for (i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', elegir);
    }
    function elegir(e) {
        const star = e.target;
        $(".rating_value").val(star.value);
        console.log(star.value);
    }
}


function addShop() {
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     // console.log('Latitude: '          + position.coords.latitude          + '\n' +
    //     //       'Longitude: '         + position.coords.longitude         + '\n' +
    //     //       'Altitude: '          + position.coords.altitude          + '\n' +
    //     //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    //     //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //     //       'Heading: '           + position.coords.heading           + '\n' +
    //     //       'Speed: '             + position.coords.speed             + '\n' +
    //     //       'Timestamp: '         + position.timestamp                + '\n');
    //     var lat = position.coords.latitude ;
    //     var long = position.coords.longitude ;
    //     addShopWithCordinates(lat,long);

    // }, function(error){
    //     var lat =  '';
    //     var long = '';
    //     addShopWithCordinates(lat,long);
    // })

    var lat = '';
    var long = '';
    addShopWithCordinates(lat, long);
}


function addShopWithCordinates(lat, long) {
    var request_type = 'addShopReturn';
    var $addshopForm = $('#add-shops');
    if ($addshopForm.valid()) {
        var form = $('#add-shops');
        var form_data = form.serialize();
        //var gps_data = getGpsData();
        form_data = form_data + '&user_key=' + localStorage.user_id + '&type=' + shop_service_other_page_name + '&longtitude=' + lat + '&latitude=' + long;
        var image = $('#add_shop_profilepic')[0];
        var total_form_data = new FormData();
        total_form_data.append('file', image.files[0]);
        total_form_data.append('formdata', form_data);
        total_form_data.append('action', form.attr('action'));
        processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
    }
}



var shop_service_other_page_name = '';
function resetAddForms(){
    $('.category_percenteage_prepopulate').html('');
    $('#add-shops').trigger('reset');
    $('.add-shop-img-upload-preview').css('background-image',"url('assets/img/image4.jpg')");
    $(".rating_value").val(0);
    repeater_shop_count = 0;
    for(var i= 1; i <= 10;i++){
        $('#rating-'+i).attr('checked',false);
    }
}

function showAddShopPage() {
    resetAddForms();
    shop_service_other_page_name = 'shop';
    activateTab('add_shop');
    $('.add_form_type_title').html('Add Shop');
    getCategorySelect();
    $('.category_percenteage_prepopulate').html('');
}

function showAddServicePage() {
    resetAddForms();
    shop_service_other_page_name = 'service';
    activateTab('add_shop')
    $('.add_form_type_title').html('Add Service');
    getServiceSelect();
    $('.list-group-item').removeClass('active');
    $(".add_service").addClass('active');
}

function showAddOwnSellerPage() {
    resetAddForms();
    shop_service_other_page_name = 'own_seller';
    activateTab('add_shop');
    $('.add_form_type_title').html('Add Own Seller');
    getOwnSellerSelect();
    $('.list-group-item').removeClass('active');
    $(".add_own_seller").addClass('active');
}



function addShopReturn(data) {
    if (data.status == '1') {
        $("#add-shops").trigger('reset');
        if (shop_service_other_page_name == 'shop') {
            getAllShops();



        } else if (shop_service_other_page_name == 'service') {
            getAllServices();
        } else if (shop_service_other_page_name == 'own_seller') {
            getAllOwnSeller();
        }
    }
    showAlert(data);

}
var category_html = '';
var repeater_shop_count = 0;
function addMoreCategory() {
    var category_select = '';
    if (shop_service_other_page_name == 'shop') {
        category_select = category_html;
    } else if (shop_service_other_page_name == 'service') {
        category_select = service_html;
    } else if (shop_service_other_page_name == 'own_seller') {
        category_select = own_seller_html;
    }
    var html = `<div class=""><div class="form-group float-label">
                    <select class="form-control category_all_class category_percentage_category`+repeater_shop_count+`"
                        name="category_percentage[category][]">` + category_select + `
                    </select>
                </div>
                <div class="form-group float-label">
                    <input type="text" class="form-control category_percentage_percentage`+repeater_shop_count+`"
                        name="category_percentage[percentage][]">
                    <label class="form-control-label">percentage</label>
                </div><button class="btn btn-secondary mb-2" onclick="$(this).parent().remove()">-</button></div>`;
    
    $('.category_percenteage_prepopulate').append(html);
    repeater_shop_count++;

}

function getAllShops() {
    activateTab('filtered_shops');
    shop_service_other_page_name = 'shop';
    getAllShopServiceOther();
}

function getAllServices() {
    activateTab('filtered_shops');
    shop_service_other_page_name = 'service';
    getAllShopServiceOther();
    $('.list-group-item').removeClass('active');
    $(".filtered_services").addClass('active');
}

function getAllOwnSeller() {
    activateTab('filtered_shops');
    shop_service_other_page_name = 'own_seller';
    getAllShopServiceOther();
    $('.list-group-item').removeClass('active');
    $(".filtered_own_sellers").addClass('active');
}




var shop_load_offset = 0;

function getAllShopServiceOther() {
    shop_load_offset = 0;
    $('.items_list_by_category').html('');
    getAllgetShopServiceOtherRepeater();
}

function getAllgetShopServiceOtherRepeater() {

    var request_type = 'json_get_all_shops';
    var data = {
        user_key: localStorage.user_id,
        offset: shop_load_offset,
        type: shop_service_other_page_name,
        shop_code: localStorage.shop_code,
        action: 'json_get_all_shops',
        is_ajax: true
    };
    processFromUrl(data, request_type);
    shop_load_offset = shop_load_offset + 10;
}

function json_get_all_shops(data) {
    var data = data.result;
    var advertisers_list = '';
    $.each(data, function(index, value) {
        advertisers_list += `
            <div class="col-6 col-md-4 col-lg-3" >
            <div class="card border-0 mb-4">
                <div class="card-body p-0">
                    <div class="h-150px has-background rounded mb-2">
                        <div class="top-right m-2">
                            <button class="btn btn-sm btn-white btn-rounded" onclick="editShop(`+ value.shop_id +`,'` + shop_service_other_page_name + `')"><i
                            class="material-icons">edit</i></button>
                        </div>
                        <div class="bottom-left m-2">
                           
                        </div>
                        <a onclick="loadSingleDetails(` + value.shop_id + `),'` + shop_service_other_page_name + `'" class="background" style="background-image:url('` + value.shop_image + `');">
                           
                        </a>
                    </div>
                    <div onclick="loadSingleDetails(` + value.shop_id + `),'` + shop_service_other_page_name + `'">
                        <small class="text-mute">` + value.district_name + `</small>
                        <a>
                            <p class="mb-0">` + value.shop_name + `</p>
                        </a>
                        <p class="small">` + value.shop_mobile + `</p>
                    </div>
                </div>
            </div>
        </div>`;

    })
    $('.items_list_by_category').html(advertisers_list);

}

function editShop(id,type){
    
    shop_service_other_page_name = type;
    var request_type = "jsonGetEditDetails";

    var data = {
        user_key: localStorage.user_id,
        type: type,
        id: id,
        action: "get_shop_edit_data",
        is_ajax: true,
    };
    processFromUrl(data, request_type);
}

function jsonGetEditDetails(data){
    var data = data.result;
    if(shop_service_other_page_name == 'shop'){
        showAddShopPage();
    }

    else if(shop_service_other_page_name == 'service'){
        showAddServicePage();
    }

    else if(shop_service_other_page_name == 'own_seller'){
        showAddOwnSellerPage();
    }
    
    $.each(data, function(index, value) {
        if(index != 'rating')
        $('#add-shops [name='+index+']').val(value).change();
    });
 
    initRating();
   // $('#add-shops [name=user_pass]').attr('disabled',true);
    $('.add-shop-img-upload-preview').css('background-image', `url('`+data.image_url+`')`);
    var shop_offer = JSON.parse(data.shop_offer);
    repeater_shop_count = 0;
    $('.category_percenteage_prepopulate').html('');
    $.each(shop_offer, function(index1, value1) {
        addMoreCategory();
     
    });
    setTimeout(function(){
        var count_len = 0;
        $.each(shop_offer, function(index1, value1) {
            $('.category_percentage_category'+count_len).last().val(index1).change();
            $('.category_percentage_percentage'+count_len).last().val(value1);
            count_len++;
        });
        $.each(data, function(index, value) {
            if(index != 'rating')
            $('#add-shops [name='+index+']').val(value);
        });
    },3000);
    $(".rating_value").val(data.rating);
    for(var i= 1; i <= data.rating;i++){
        $('#rating-'+i).attr('checked',true);
    }
    
        
}
