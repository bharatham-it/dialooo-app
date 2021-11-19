

var team_purchase_offset = 0;
function viewTeamPurchase() {
    activateTab('team_purchase');
    var page_heading_html = '';
    var page_heading = {
       // roles: ["supervisor", "integrator", "ownfarmer", ],
        title: 'Customer Purchase',
        main_value : '',
        main_value_class : 'team_purchase_tpv',
        title_class : ' ',
        badge_class : ' text-success'
       // btn_class: 'btn-info',
      //  i_class: 'fa fa-plus',
      //  onclick: "navManager('module-bird-lifting-page')"
    };   
   page_heading_html += buildPageHeading(page_heading); 
   $('.team_purchase_title').html(page_heading_html);
    
    appendHtml('team_purchase_container','',1);
    team_purchase_offset = 0;
    var from_date = new Date();
    from_date.setDate(from_date.getDate() - 7);
    initDatePicker([
        {
            class_name : 'team_purchase_from',
            min_date : -10000,
            max_date : 0,
            current_date : from_date
        },
        {
            class_name : 'team_purchase_to',
            min_date : -10000,
            max_date : 0,
            current_date : new Date()
        }
    ]);
    viewTeamPurchaseRepeater();
}
function viewTeamPurchaseRepeater() {
    var selected_from = $('[name=team_purchase_from]').val()+ ' 00:00:00';
    var selected_to = $('[name=team_purchase_to]').val()+ ' 23:59:59';
    var request_type = 'viewTeamPurchaseRepeaterReturn';
    var data = {
        user_key: localStorage.user_id,
        offset : team_purchase_offset,
        date_from : selected_from,
        date_to : selected_to,
        custom_status : status,
        action: 'json_get_team_purchase',
        is_ajax: true
    };
    processFromUrl(data, request_type);
   // team_purchase_offset = team_purchase_offset + 5;
}

function viewTeamPurchaseRepeaterReturn(data){
    var viewTeamPurchaseRepeaterReturn = '';
    var data = data.result;
    $('.team_purchase_tpv').html(Number(data.tpv).toFixed(2));
    data = data.purchas_data;
    var remove = ['user_id','shop_id','created_on','pay_amount'];
    if (data.length > 0) {
       
        var viewTeamPurchaseRepeaterReturn = `<thead>`;
        viewTeamPurchaseRepeaterReturn += buildDtHead(data[0],remove);
        viewTeamPurchaseRepeaterReturn += `</thead> <tbody>`;
        viewTeamPurchaseRepeaterReturn += buildDtRow(data,remove);
        viewTeamPurchaseRepeaterReturn += `</tbody>`;

        appendHtml('team_purchase_container',viewTeamPurchaseRepeaterReturn,1);
        $('.team_purchase_container').DataTable({
            destroy: true,
            responsive: true,
            searching: false,
            paging: false,
            info: false
        });
    } else {
        appendHtml('team_purchase_container',viewTeamPurchaseRepeaterReturn,1);
    }

}



















