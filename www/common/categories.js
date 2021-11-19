$(document).ready(function () {
  loadFromServer();
});

function loadFromServer() {
  getCategories();
  getAdvertisement();
  getfeaturedAds();
  countrySelect();
  createCategories();
}



function getCategoryReturn(data) {
  var advertisers_list = '';
  var category_name_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
                    <div class="item menu-btn-right text-center" onclick="categoryDetails(` +
      value.category_id +
      `)">
                    <div class="avatar  avatar-60 has-background mb-2 circle">
                        <div class="background" style="background-image:url('` +
      value.category_image +
      `');">
                        </div>
                    </div>
                    <p class="text-uppercase small-1">` +
      value.category_name +
      `</p>
                </div>`;
  });
  $('.home_categories_shop').html(advertisers_list);
  initSwiper('home_categories_shop');
  menuButtonInit();
}



var array_class_names = ['categories_name_listing', 'home_categories_shop', 'home_categories_sellers', 'home_categories_service', 'advertisement_list','featured_ads_list'];
function initSwiper() {
  $.each(array_class_names, function (index, value) {
    class_name = value;
    var items = 4;
    if(class_name == 'advertisement_list' || class_name == 'featured_ads_list') {
      items = 1;
    }
    // set time out is the time to load images
    //setTimeout(function(){
      $('.'+class_name).owlCarousel('destroy'); 
      $('.'+class_name).owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        dots: false,
        nav: false,
        autoWidth: false,
        autoHeight: false,
        autoplayTimeout: 5000,
        responsive:{
            0:{
                items:items
            },
            600:{
                items:items
            },
            1000:{
                items:items
            }
        }
      })
    //},7000);
  });
}

function menuButtonInit() {
  $('.menu-btn-right')
    .unbind()
    .click(function (e) {
      e.stopPropagation();
      $('.sidebar-right').toggleClass('active');
      $('.main-container').toggleClass('active');
      $('body').toggleClass('sidebar-right-open');
      $('.overlay').toggle();
    });
}
// function getSellers() {
//   var request_type = 'getSellersReturn';
//   var data = {
//     action: 'json_get_seller_categories_for_home',
//     is_ajax: true,
//   };
//   processFromUrl(data, request_type);
// }

function getCategories() {
  var request_type = 'getAllCategoryServiceSellerReturn';
  var data = {
    action: 'load_categories_for_home',
    is_ajax: true,
  };
  processFromUrl(data, request_type);
}
function getAllCategoryServiceSellerReturn(data){
  var data = data.result;
  getCategoryReturn(data.shop_category)
  getSellersReturn(data.seller_category);
  getServicesReturn(data.service_category);
}

// function getServices() {
//   var request_type = 'getServicesReturn';
//   var data = {
//     action: 'json_get_service_categories_for_home',
//     is_ajax: true,
//   };
//   processFromUrl(data, request_type);
// }

function getServicesReturn(data) {
  var advertisers_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
                <div class="item menu-btn-right text-center" onclick="categoryServiceDetails(` +
      value.category_id +
      `)">
                <div class="avatar  avatar-60 has-background mb-2 circle">
                    <div class="background" style="background-image:url('` +
      value.category_image +
      `');">
                    </div>
                </div>
                <p class="text-uppercase small-1">` +
      value.category_name +
      `</p>
            </div>`;
  });
  $('.home_categories_service').html(advertisers_list);

  initSwiper('home_categories_service');
  menuButtonInit();
}

var shop_service_category_type = '';

function categoryDetails(category_id) {
  shop_service_category_type = 'shop';
  $("[name='category_id']").val(category_id);
}

function categoryServiceDetails(category_id) {
  shop_service_category_type = 'service';
  $("[name='category_id']").val(category_id);
}

function createCategories() {
  var category_name_list = '';
  var data = {
    flipkart: 'flipkart',
    ajio: 'ajio',
    amazon: 'amazon',
    makemytrip: 'makemytrip',
    myntra: 'myntra',
  };

  $.each(data, function (index, value) {
    category_name_list +=
      `
            <div class="item menu-btn-right text-center" >
            <div class="avatar  avatar-60 has-background mb-2 circle">
                <div class="background" style="background-image:url('assets/img/` +
      value +
      `.png');">
                </div>
            </div>
            <p class="text-uppercase small-1">` +
      value +
      `</p>
        </div>`;
  });

  $('.categories_name_listing').append(category_name_list);
  initSwiper('categories_name_listing');
}

function getAdvertisement() {
  var request_type = 'getAdvertisementReturn';
  var data = {
    action: 'json_get_advertisment',
    is_ajax: true,
  };
  processFromUrl(data, request_type);
}

function getAdvertisementReturn(data) {
  var data = data.result;
  var advertisers_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
        <div class="item">
            <img class="img-fluid rounded" src="./assets/img/upstore-slide01.png" > 
        </div>`;
  });
  $('.advertisement_list').html(advertisers_list);
  initSwiper('advertisement_list');
}



// function getfeaturedShops(){
//     var request_type = 'getFeaturedShopsReturn';
//     var data = {
//         action: 'json_get_featured_shops',
//         is_ajax: true
//     };
//     processFromUrl(data, request_type);
// }

// function getFeaturedShopsReturn(data){
//     var data = data.result;
//     var advertisers_list = '';
//     $.each(data, function(index, value) {

//         advertisers_list += `
//         <div class="col-6 col-md-4 col-lg-3">
//         <div class="card border-0 mb-4">
//             <div class="card-body p-0"  onclick="loadSingleDetails(`+value.shop_id+`,'`+shop_service_category_type+`')">
//                 <div class="h-150px has-background rounded mb-2" >

//                     <a href="#" class="background " style="background-image:url('`+value.image+`');">

//                     </a>
//                 </div>

//                 <a href="#">
//                     <p class="mb-0 text-secondary">`+value.shop_name+`</p>
//                 </a>
//                 <small class="text-mute">`+value.town_name+`</small>
//                 <p class="small">`+value.mobile+`</p>
//             </div>
//         </div>
//     </div>`;
//     })
//     $('.search_items_listing ').html(advertisers_list);

// }

function getfeaturedAds() {
  var request_type = 'getFeaturedAdsReturn';
  var data = {
    action: 'json_get_featured_advertisements',
    is_ajax: true,
  };
  processFromUrl(data, request_type);
}

function getFeaturedAdsReturn(data) {
  var data = data.result;
  var advertisers_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
        <div class="item">
            <img class="img-fluid rounded" src="` +
      value.image +
      `" > 
            <button class="btn btn-sm  text-white open_video_button" onclick="openVideo('` +
      value.post_title +
      `')" style="background-color: grey;"><i class="material-icons">play_arrow</i></button>
           
        </div>`;
  });

  $('.featured_ads_list').html(advertisers_list);
  initSwiper('featured_ads_list');
}

function getcategoryShops() {
  var request_type = 'json_get_items_by_category_id';
  var form = $('#form_get_items_by_category_id');
  var form_data =
    $('#form_get_items_by_category_id').serialize() +
    '&type=' +
    shop_service_category_type;
  var total_form_data = new FormData();
  total_form_data.append('formdata', form_data);
  total_form_data.append('action', form.attr('action'));
  processFromUrl(form_data, request_type, form.attr('action'), total_form_data);
}

function json_get_items_by_category_id(data) {
  $('.sidebar-right').toggleClass('active');
  $('.main-container').toggleClass('active');
  $('body').toggleClass('sidebar-right-open');
  activateTab('filtered_shops');
  var data = data.result;
  var advertisers_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
            <div class="col-6 col-md-4 col-lg-3" onclick="loadSingleDetails(` +
      value.shop_id +
      `,'` +
      shop_service_category_type +
      `')">
            <div class="card border-0 mb-4">
                <div class="card-body p-0">
                    <div class="h-150px has-background rounded mb-2">
                       
                        
                        <a  class="background" style="background-image:url('` +
      value.image +
      `');">
                           
                        </a>
                    </div>
                    <small class="text-mute">` +
      value.district_name +
      `</small>
                    <a>
                        <p class="mb-0">` +
      value.shop_name +
      `</p>
                    </a>
                    <p class="small">` +
      value.shop_mobile +
      `</p>
                </div>
            </div>
        </div>`;
  });
  $('.items_list_by_category').html(advertisers_list);
}

function loadSingleDetails(id, type) {
  activateBack();
  var request_type = 'json_get_single_item_detailsReturn';

  var data = {
    user_key: localStorage.user_id,
    type: type,
    id: id,
    action: 'json_get_single_item_details',
    is_ajax: true,
  };
  processFromUrl(data, request_type);
}

function json_get_single_item_detailsReturn(data) {
  activateTab('filtered_shops_details');
  var data = data.result;
  if (data.map_url != undefined) {
    $('.open_map_button').attr('onclick', "openMap('" + data.map_url + "')");

    $('.open_map_button').show();
  } else {
    $('.open_map_button').hide();
  }
  if (data.video_url != undefined) {
    $('.open_video_button').attr(
      'onclick',
      "openVideo('" + data.video_url + "')"
    );

    $('.open_video_button').show();
  } else {
    $('.open_video_button').hide();
  }
  $('.single_item_name').html(data.item_name);
  $('.single_item_name').html(data.item_name);
  $('.single_item_image').attr( 'src',data.item_image );
  $('.single_item_code').html(data.item_code);
  $('.single_item_farm_email').html(data.item_email);
  $('.single_item_mobile').html(data.item_mobile);
  $('.single_item_mobile_href').attr('href', 'tel:' + data.item_mobile);
  $('.single_item_address').html(data.address);
  $('.single_item_pincode').html(data.pincode);
  $('.single_item_street_name').html(data.street_name);
  $('.single_item_town_name').html(data.town_name);
  $('.single_item_landmark').html(data.landmark);
  $('.single_item_rating').html(data.rating);
}






function getSellersReturn(data) {
  var advertisers_list = '';
  var category_name_list = '';
  $.each(data, function (index, value) {
    advertisers_list +=
      `
                <div class="item menu-btn-right text-center" onclick="categorySellersDetails(` +
      value.category_id +
      `)">
                <div class="avatar  avatar-60 has-background mb-2 circle">
                    <div class="background" style="background-image:url('` +
      value.category_image +
      `');">
                    </div>
                </div>
                <p class="text-uppercase small-1">` +
      value.category_name +
      `</p>
            </div>`;
  });
  $('.home_categories_sellers').html(advertisers_list);
  initSwiper('home_categories_sellers');
  menuButtonInit();
}

function categorySellersDetails(category_id) {
  shop_service_category_type = 'own_seller';
  $("[name='category_id']").val(category_id);
}

function openMap(map_url) {
  window.open(map_url, '_system');
}

function openVideo(video_url) {
  window.open(video_url, '_system');
}
