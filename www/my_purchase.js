

var my_purchase_offset = 0;
function viewMyPurchase() {
    activateTab('my_purchase');
    appendHtml('my_purchase_container','',1)
    var page_heading_html = '';
    var title = '';
    if(localStorage.user_role == 'customer'){
        title = 'My Purchase';
    }
    else if(localStorage.user_role == 'shop'){
        title = 'My Sales';
    }
    var page_heading = {
       // roles: ["supervisor", "integrator", "ownfarmer", ],
        title: title,
       // btn_class: 'btn-info',
      //  i_class: 'fa fa-plus',
      //  onclick: "navManager('module-bird-lifting-page')"
    };   
   page_heading_html += buildPageHeading(page_heading); 
   $('.my_purchase_title').html(page_heading_html);

    my_purchase_offset = 0;
    var from_date = new Date();
    from_date.setDate(from_date.getDate() - 7);
    initDatePicker([
        {
            class_name : 'my_purchase_from',
            min_date : -10000,
            max_date : 0,
            current_date : from_date
        },
        {
            class_name : 'my_purchase_to',
            min_date : -10000,
            max_date : 0,
            current_date : new Date()
        }
    ]);
    viewMyPurchaseRepeater();
}
function viewMyPurchaseRepeater() {
    var selected_from = $('[name=my_purchase_from]').val()+ ' 00:00:00';
    var selected_to = $('[name=my_purchase_to]').val()+ ' 23:59:59';
    var request_type = 'viewMyPurchaseRepeaterReturn';
    var data = {
        user_key: localStorage.user_id,
        offset : my_purchase_offset,
        date_from : selected_from,
        date_to : selected_to,
        custom_status : status,
        action: 'json_get_my_purchase',
        is_ajax: true
    };
    processFromUrl(data, request_type);
   // my_purchase_offset = my_purchase_offset + 5;
}

function viewMyPurchaseRepeaterReturn(data){
    var viewMyPurchaseRepeaterReturn = '';
    var data = data.result;
    var remove = ['user_id','shop_id','created_on','pay_amount','category_amount'];
    if(localStorage.user_role == 'shop'){
        remove.push('shop');
        remove.push('ppv');
        remove.push('pv');
    }
    if (data.length > 0) {
       
        var viewMyPurchaseRepeaterReturn = `<thead>`;
        viewMyPurchaseRepeaterReturn += buildDtHead(data[0],remove);
        viewMyPurchaseRepeaterReturn += `</thead> <tbody>`;
        viewMyPurchaseRepeaterReturn += buildDtRow(data,remove);
        viewMyPurchaseRepeaterReturn += `</tbody>`;

        appendHtml('my_purchase_container',viewMyPurchaseRepeaterReturn,1);
        $('.my_purchase_container').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });
    } else {
        appendHtml('my_purchase_container',viewMyPurchaseRepeaterReturn,1);
    }
}



















