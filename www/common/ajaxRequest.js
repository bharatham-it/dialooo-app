//var base_url = "http://api.upstores.co.in/wp-admin/admin-ajax.php";
var base_url = "http://digi.bharathamitsolutions.com/upstore/wp-admin/admin-ajax.php";
//var base_url = "http://localhost/upstore/wp-admin/admin-ajax.php";
function processResponse(request_type, response) {
    window[request_type](response); 
}


var process_type = '';

function processFromUrl(data, request_type, action = '', total_formdata = '') {
    process_type = '';
    if (action == '') {
        action = data.action;
    }

    if (typeof data == 'object') {
        data = serializeFn(data);
    }
    var formdata = {};

    if (total_formdata) {
        formdata = total_formdata;
        process_type = 'image';
    } else {
        formdata = {
            formdata: data,
            action: action
        };
    }

    getResult(formdata, request_type, process_type);
}
function getResult(formdata, request_type) {
    var exclude_loader = [
        'createStateSelectByCountry',
        'createDistrictSelectByState',
        'createCountrySelect'
    ];
    var ajax_obj = {
        type: "POST",
        url: base_url,
        data: formdata, //only input
        dataType: "html",
        beforeSend: function() {
            if(!exclude_loader.includes(request_type)){
                showLoader();
            }
        },
        success: function(response) {
            response = JSON.parse(response);
            hideLoader();
            
            processResponse(request_type, response);
        },
    };

    if (process_type == 'image') {
        ajax_obj.contentType = false;
        ajax_obj.processData = false;
    }
    $.ajax(ajax_obj);
}

function serializeFn(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function showLoader() {
    $(".pageloader").show();
}

function hideLoader() {
    $(".pageloader").hide(); 
}