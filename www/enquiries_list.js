

var view_enquiries_offset = 0;
function viewMyEnquiries() {
    activateTab('view_enquiries');
    appendHtml('view_enquiries_container','',1)
    var page_heading_html = '';
    var title = 'Enquiries';
    
    var page_heading = {
       // roles: ["supervisor", "integrator", "ownfarmer", ],
        title: title,
       // btn_class: 'btn-info',
      //  i_class: 'fa fa-plus',
      //  onclick: "navManager('module-bird-lifting-page')"
    };   
   page_heading_html += buildPageHeading(page_heading); 
   $('.view_enquiries_title').html(page_heading_html);

    view_enquiries_offset = 0;
    var from_date = new Date();
    from_date.setDate(from_date.getDate() - 7);
    initDatePicker([
        {
            class_name : 'view_enquiries_from',
            min_date : -10000,
            max_date : 0,
            current_date : from_date
        },
        {
            class_name : 'view_enquiries_to',
            min_date : -10000,
            max_date : 0,
            current_date : new Date()
        }
    ]);
    viewMyEnquiryRepeater();
}
function viewMyEnquiryRepeater() {
    var selected_from = $('[name=view_enquiries_from]').val()+ ' 00:00:00';
    var selected_to = $('[name=view_enquiries_to]').val()+ ' 23:59:59';
    var request_type = 'viewMyEnquiryRepeaterReturn';
    var data = {
        user_key: localStorage.user_id,
        offset : view_enquiries_offset,
        date_from : selected_from,
        date_to : selected_to,
        custom_status : status,
        action: 'json_get_messages',
        is_ajax: true
    };
    processFromUrl(data, request_type);
   // view_enquiries_offset = view_enquiries_offset + 5;
}

function viewMyEnquiryRepeaterReturn(data){
    var viewMyEnquiryRepeaterReturn = '';
    var data = data.result;
    var remove = ['user_id','shop_id','created_on','pay_amount'];
    if(localStorage.user_role == 'shop'){
        remove.push('shop');
        remove.push('ppv');
    }
    if (data.length > 0) {
       
        var viewMyEnquiryRepeaterReturn = `<thead>`;
        viewMyEnquiryRepeaterReturn += buildDtHead(data[0],remove);
        viewMyEnquiryRepeaterReturn += `</thead> <tbody>`;
        viewMyEnquiryRepeaterReturn += buildDtRow(data,remove);
        viewMyEnquiryRepeaterReturn += `</tbody>`;

        appendHtml('view_enquiries_container',viewMyEnquiryRepeaterReturn,1);
        $('.view_enquiries_container').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });
    } else {
        appendHtml('view_enquiries_container',viewMyEnquiryRepeaterReturn,1);
    }
}



















