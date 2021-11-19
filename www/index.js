var backbutton_array = [];
$(document).ready(function () {
    verifyIfscCode();
    initSelect2();
    checkUserSession();
    navManager();
    $('.backbtn').on('click', function (e) {
        event.preventDefault();
        backButton();
    });
    countrySelect();
    districtSelectProfile();

   

    $("#add").click(function () {

        var html = `    <div class="repeater-filed">
        <div class="form-group">
            <div class="row">
                <div class="col-sm-3">
                    <select class="form-control category_all_class"
                        name="category_price[category][]">`+category_html+`
                    </select>
                </div>
                <div class="col-sm-3 pt-2">
                    <input type="text" name="category_price[price][]" class="form-control ">
                </div>
            </div>
        </div>
    </div>
            `;

        $("#category_price_form").append(html);
    });

    $(".input-field").on('click', '#remove', function () {
        $(this).closest('.repeater-filed').remove();
    });
})

function countrySelect() {
    var request_type = 'createCountrySelect';
    var data = {
      type: 'country',
      user_key: localStorage.user_id,
      action: 'bind_data_for_select',
      is_ajax: true,
    };
  
    processFromUrl(data, request_type);
  }
  
  function createCountrySelect(state) {
    var district_html = '<option value="0" selected>Select Country</option>';
    $.each(state, function (index, value) {
      district_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.user_profile_country').html(district_html);
  }

  function stateSelectByCountry(country_id) {
    var request_type = 'createStateSelectByCountry';
    var data = {
      type: 'state_by_country',
      country_id: country_id,
      user_key: localStorage.user_id,
      action: 'bind_data_for_select',
      is_ajax: true,
    };
  
    processFromUrl(data, request_type);
  }
  
  function createStateSelectByCountry(state) {
      
    var state_html = '<option value="0" selected>Select State</option>';
    $.each(state, function (index, value) {
      state_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.user_profile_state').html(state_html);
  }
  
  function districtSelectByState(state_id) {
    var request_type = 'createDistrictSelectByState';
    var data = {
      type: 'district_by_state',
      state_id: state_id,
      user_key: localStorage.user_id,
      action: 'bind_data_for_select',
      is_ajax: true,
    };
    processFromUrl(data, request_type);
  }
  
  function createDistrictSelectByState(district) {
    var district_html = '<option value="0" selected>Select District</option>';
    $.each(district, function (index, value) {
      district_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.district_select').html(district_html);
  }
function backButton(){
    backbutton_array.pop();
    activateTabBack(backbutton_array[ backbutton_array.length - 1]);
    if(backbutton_array.length > 1){//deafult array has home page value so length == 1
    }
    else{
        disableBack();
    }    
}


function initSelect2(){
    // $('select').select2();
    // $('select').on('change',function(){
    //     $('select').select2();
    // })
}
function checkUserSession(){
    // if(!localStorage.user_id){
    //     window.location.href = 'signin.html';
    // }
}

function districtSelectProfile(){
    var request_type = 'createDistrictSelectProfile';
    var data = {
        type: 'districts',
        user_key: localStorage.user_id,
        action: 'bind_data_for_select',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function createDistrictSelectProfile(district) {
    district_html = '<option value="0" >Select District</option>';
    $.each(district, function (index, value) {
        district_html += '<option value="' + index + '">' + value + '</option>';
    });
    $('.user_profile_district').html(district_html);
    getUserProfile();
    initSelect2();
}



function initDatePicker(data = []) {
    var min_date = 0;
    var max_date = 5;
    var current_date = new Date();
    var class_name = 'make_this_date_picker';
    if (data.length > 0) {
        $.each(data, function(index, value) {
            min_date = value.min_date;
            max_date = value.max_date;
            class_name = value.class_name;
            if (value.current_date != undefined) {
                current_date = new Date(value.current_date);
            }


            $('.' + class_name).pickadate({
                format: 'dd-mmm-yyyy',
                formatSubmit: 'yyyy-mm-dd',
                hiddenName: true,
                onStart: function() {
                    var date = current_date;
                    this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
                    this.set('view', [date.getFullYear(), date.getMonth(), date.getDate()]);
                    this.set('min', min_date);
                    this.set('max', max_date);
                },
            })
            $('.' + class_name).attr('style', 'background: white !important;');

        })
    } else {
        $('.' + class_name).pickadate({
            format: 'dd-mmm-yyyy',
            formatSubmit: 'yyyy-mm-dd',
            hiddenName: true,
            onStart: function() {
                var date = new Date();
                this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
                this.set('view', [date.getFullYear(), date.getMonth(), date.getDate()]);
                this.set('min', min_date);
                this.set('max', max_date);
            },
        })
        $('.' + class_name).attr('style', 'background: white !important;');
    }

}
function appendHtml(appendclass, html, replace_flag = 0) {

    if (!html) {
        html = '<div class="text-center"><b>No Data Available</b></div>';
    }
    if ($.trim($("." + appendclass).html()) == '<div class="text-center"><b>No Data Available</b></div>') {
        $("." + appendclass).html(html);
    } else {
        if (replace_flag == 1) {
            $("." + appendclass).html(html);
        } else {
            $("." + appendclass).append(html);
        }
    }
}

function buildDtHead(data,remove){
    
    $.each(remove, function(index, value) {
        delete data[value];
    })
    var  buildDtRow = '';
    
        buildDtRow += `<tr  class="text-capitalize">`;
        $.each(data, function(key, val) {
            buildDtRow += `<th scope="col" class="text-capitalize">` + key.replace(/_/g,' ')+ `</th>`;
        })
        buildDtRow += `</tr>`;
    return buildDtRow;
}

function buildDtRow(data,remove){
    var  buildDtRow = '';
    var category_data_row = '';
    $.each(data, function(key, val) {
        category_data_row = '';
        if(val.category_data) {
            $.each(val.category_data, function(key, val) {
                category_data_row += `<td  scope="col" class="text-capitalize">`+key+` : `+ val+ `</td>`;
            })
        }

        $.each(remove, function(index, value) {
            delete val[value];
        })

        buildDtRow += `<tr class="text-capitalize">`;
        $.each(val, function(key, val) {
            if(key != 'category_data')
            buildDtRow += `<td  scope="col" class="text-capitalize">` + val+ `</td>`;
        })
        buildDtRow += category_data_row +`</tr>`;
    })
    return buildDtRow;
}




function buildMainHeadingRow(index) {
    if (index) {
        index = index.replace(/_/g, " ");
        var buildMainHeadingRow = `<div class="text-center pt-4 text-capitalize">
                <h2 >` + index + `</h2>
            </div>
            `;
        return buildMainHeadingRow;
    } else {
        return '';
    }

}

function buildHeadingRow(index, value) {
    if (index) {
        index = index.replace(/_/g, " ")
    }
    var buildHeadingRow =
        `
    <div class="row mx-auto pb-1 " >
        <div class="col-6 col-md-6 p-2 mt-0 shadow bg-info text-white text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + index + `   
        </div>
        <div class="col-6 col-md-6 p-2 mt-0 shadow bg-info text-white text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + value + `   
        </div>
    </div>
    `;
    return buildHeadingRow;
}

function buildHeadingSingleRow(value) {

    var buildHeadingRow =
        `
    <div class="row mx-auto pb-1 " >
        <div class="col-12 col-md-12 p-2 mt-0 shadow bg-info text-white text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + value + `   
        </div>
    </div>
    `;
    return buildHeadingRow;
}

function buildSubHeadingRow(index) {
    var buildSubHeadingRow =
        `
    <div class="row mx-auto border-bottom" >`;
    buildSubHeadingRow +=
        `  <div class="col-12 col-md-12 p-2 bg-light text-black text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + index + `   
        </div>
    `;
    buildSubHeadingRow +=
        ` </div>
    `;
    return buildSubHeadingRow;

}

function buildItemRow(index, value, row_click_fn = '') {
    if (index) {
        index = index.replace(/_/g, " ")
    }
    if (row_click_fn) {
        row_click_fn = 'onclick="' + row_click_fn + '"';
    }
    var buildItemRow =
        `
    <div class="row mx-auto border-bottom" ` + row_click_fn + `>
        <div class="col-6 col-md-6 p-2  bg-white  text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + index + `   
        </div>
        <div class="col-6 col-md-6 p-2   bg-white  text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + value + `   
        </div>
    </div>
    `;
    return buildItemRow;
}

function buildItemRowSingleColumn(value, row_click_fn = '') {

    if (row_click_fn) {
        row_click_fn = 'onclick="' + row_click_fn + '"';
    }
    var buildItemRow =
        `
    <div class="row mx-auto border-bottom" ` + row_click_fn + `>
       
        <div class="col-12 col-md-12 p-2   bg-white  text-capitalize" style="display: table-cell;font-size: 13px;">
        ` + value + `   
        </div>
    </div>
    `;
    return buildItemRow;
}

function buildListingAllRows(data) {
    var buildListingAllRows = '';
    $.each(data, function(index1, value1) {
        if (value1.length == 0 || Object.keys(value1).length == 0) {} else {
            buildListingAllRows += buildMainHeadingRow(index1);
            var count = 0;
            $.each(value1, function(index, value) {
                count++;
                if (typeof value == 'string') {
                    if (count == 1) {
                        buildListingAllRows += buildHeadingRow(index, value);
                    } else {
                        buildListingAllRows += buildItemRow(index, value);
                    }
                } else {

                    buildListingAllRows += buildSubHeadingRow(index);
                    if (typeof value != 'string') {
                        $.each(value, function(index2, value2) {
                            buildListingAllRows += buildItemRow(' - ' + index2, value2);
                        });
                    }

                }
            });
        }
    });
    return buildListingAllRows;
}


function buildButton(data) {
    if (data.text == undefined || data.text == '') {
        return;
    }
    if (data.div_class == undefined) {
        data.div_class = '';
    }
    if (data.attrs == undefined) {
        data.attrs = '';
    }
    if (data.onclick != undefined) {
        data.onclick = `onclick="` + data.onclick + `"`;
    }

    if (data.a_class == undefined || data.a_class == '') {
        data.a_class = ' btn-info ';
    }
    var buildButton = ` <div class="form-group form-floating-label d-inline  text-center  m-0 p-0 ` + data.div_class + `">
                            <a class="shadow-sm d-inline btn-sm ` + data.a_class + `"  ` + data.onclick + ` ` + data.attrs + ` >` + data.text + `</a>
                        </div> `;
    return buildButton;
}

function showAmount(amount) {
    return '&#8377 ' + amount;
}


function buildPageHeading(data){
    var title_class = '';
    if(data.roles == undefined){
        data.roles = [];
    }
    if(data.title == undefined){
        data.title = '';
    }
    if(data.btn_class == undefined){
        data.btn_class = '';
    }
    if(data.i_class == undefined){
        data.i_class = '';
    }
    
   
    if(data.onclick != undefined){
        data.onclick = `onclick="`+data.onclick+`"`;
    }
    else{
        data.onclick = '';
        title_class = 'text-center';
    }
    if(!data.roles.includes(localStorage.user_role)){
        title_class = 'text-center';
    }

    if(data.main_value_class == undefined){
        data.main_value_class = '';
    }
    var badge_class  = 'badge-primary';
    if(data.badge_class != undefined){
        badge_class = data.badge_class;
    }
    if(data.main_value == undefined){
        data.main_value = '';
    }
    else{
        data.main_value = '<b  class=" '+badge_class+' rounded px-1 '+data.main_value_class+'">'+data.main_value+'</b>';
        title_class = '';
    }

    if(data.title_class !=  undefined){
        title_class = data.title_class;
    }

    var buildPageHeading = ` <div class="px-2"> <h2 class="`+title_class+`">`+data.title;
        if(data.roles.includes(localStorage.user_role)){
            buildPageHeading += `
            <button type="button" class="btn btn-icon btn-round  btn-sm `+data.btn_class+`" style=" float: right; " `+data.onclick+`> <i class="nav-item `+data.i_class+`"></i> </button>`;
       }
       buildPageHeading += data.main_value;
       buildPageHeading += ` </h2> <hr> </div>`;
       return buildPageHeading;
}

function buildDetailsListing(data,config){
    var buildDetailsListing = '';
    var heading = config.heading;
    var remove = config.remove;
    var heading_1 = '';
    var heading_2 = '';
    if(data){
        if( data[heading[0]] == undefined){
            heading_1 = '';
        }
        if(data[heading[1]] == undefined && data){
            heading_2 = '';
        }
        if(data[heading[0]] || data[heading[1]]){
           heading_1 = data[heading[0]];
           heading_2 = data[heading[1]];
        }
        else{
            heading_1 = heading[0];
            heading_2 = heading[1];
        }
        $.each(remove, function(index, value) {
            delete data[value];
        })
        
        buildDetailsListing += buildHeadingRow(heading_1,heading_2);
    }  else{
        heading_1 = heading[0];
        heading_2 = heading[1];
    }
    
   
    $.each(data, function(index, value) {
        if(index != 'undefined' && value != 'undefined'){
            buildDetailsListing += buildItemRow(index,value);
        }
    });
    return buildDetailsListing;

}


function buildBottomNavigation(data){
    var buildBottomNavigation = ``;
    if(data.roles.includes(localStorage.user_role)){
        buildBottomNavigation = `<li class="nav-item">
                                    <a class="nav-link bottom_nav_link `+data.class+`" id="home-tab" data-toggle="tab" onclick="`+data.onclick+`" role="tab"
                                        aria-controls="home" aria-selected="true">
                                        <i class="material-icons">`+data.icon+`</i>
                                        <small class="sr-only">`+data.name+`</small>
                                    </a>
                                </li>`;
    }
    return buildBottomNavigation;
}


function buildMainItemList(data){
    var buildMainItemList = '';
    buildMainItemList += '<ul class="">';
    $.each(data, function(index, value) {
        if(index != 'undefined' && value != 'undefined'){
            buildMainItemList += '<li class="d-inline pr-1">'+value.name+'</li>';
            if(index != data.length - 1){
                buildMainItemList += ' &nbsp;>&nbsp;';
            }
        }
    });
    buildMainItemList += '</ul>';
    return buildMainItemList;
}


function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

function verifyIfscCode(ifsc){
    if(ifsc){
        var url = 'https://ifsc.razorpay.com/'+ifsc;
        var ajax_obj = {
            type: "GET",
            url: url,
            data: '', //only input
            dataType: "html",
            beforeSend: function() {
                showLoader();
            },
            success: function(response) {
                response = JSON.parse(response);
                hideLoader();
                $('#add-bank-details').find('[name=ifsc_code]').css('color','green');
                var ifsc_code_details = '';
                $.each(response, function(index, value) {
                    ifsc_code_details+= '<b>'+index+'</b> : '+ value + '<br>';
                });
                $('#add-bank-details').find('.ifsc_code_details').html(ifsc_code_details);
            },
            error : function(error){
                
                hideLoader();
                $('#add-bank-details').find('.ifsc_code_details').html('');
                $('#add-bank-details [name=ifsc_code]').css('color','red');
            }
        };

        if (process_type == 'image') {
            ajax_obj.contentType = false;
            ajax_obj.processData = false;
        }
        $.ajax(ajax_obj);
    }
}
    



