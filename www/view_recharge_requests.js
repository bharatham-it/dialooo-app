var recharge_requests_offset = 0;

function viewRechargeRequests(status, ele) {
    $('.nav-link').addClass('btn-primary').removeClass('btn-success');
    $(ele).addClass('btn-success').removeClass('btn-primary');
    recharge_requests_offset = 0;
    var request_type = 'viewRechargeRequestsReturn';
    var data = {
        user_key: localStorage.user_id,
        offset: recharge_requests_offset,
        custom_status: status,
        action: 'json_view_top_up_request',
        is_ajax: true
    };
    recharge_requests_offset = recharge_requests_offset + 1;

    processFromUrl(data, request_type);
}

function viewRechargeRequestsReturn(data) {
    var data = data.result;
    var html = ``;
    $.each(data, function(index, value) {
        html += `                                   <div class="col-12 col-md-6">
                                                        <div class="card mb-3">
                                                            <a href="#" class="card-header bg-none">
                                                                <div class="row">
                                                                    <div class="col">
                                                                      
                                                                        <div class="badge badge-secondary">` + value.status + `</div>
                                                                    </div>
                                                                    <div class="col-auto pr-1">

                                                                        <i class="material-icons">keyboard_arrow_right</i>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <div class="card-body">
                                                                <div class="media">
                                                                    <div class="icon icon-60 mr-3 has-background">
                                                                        <figure class="background request_zoom_class" onclick="zoomThis('` + value.screen_shot_url + `')" style="background-image: url('` + value.screen_shot_url + `');">
                                                                          
                                                                        </figure>
                                                                    </div>
                                                                    <div class="media-body">
                                                                        <small class="text-mute">` + value.display_name + `</small>
                                                                        <p class="mb-1">` + value.shop_name + `</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="card-footer">
                                                                <div class="row">
                                                                    <div class="col">
                                                                        <h6 class="mb-1"> &#x20B9; ` + value.amount + `</h6>
                                                                    </div>
                                                                    <div class="col-auto"> 
                                                                   `;




        if (value.status == 'pending' && localStorage.user_role == 'upadmin') {
            html += ` <button type="button" class="mb-2 btn btn-primary" onclick="approveRechargeRequests(+` + value.id + `)">Approve</button>

            <button type="button" class="mb-2 btn btn-secondary" value="Yes" onclick="rejectRechargeRequests(+` + value.id + `)">Reject</button> `;
        }

        html += ` </div>
                </div>
            
            </div>
        </div>
        </div>`;
    });

    appendHtml('recharge_requests_container', html, 1);
    initZoomExit();

}

function approveRechargeRequests(request_id) {
    recharge_requests_offset = 0;
    var request_type = 'approveRechargeRequestsReturn';
    var data = {
        user_key: localStorage.user_id,
        id: request_id,
        action: 'json_approve_top_up_request',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function rejectRechargeRequests(request_id) {
    recharge_requests_offset = 0;
    var request_type = 'json_reject_top_up_request';
    var data = {
        user_key: localStorage.user_id,
        id: request_id,
        action: 'json_reject_top_up_request',
        is_ajax: true
    };

    processFromUrl(data, request_type);
}

function json_reject_top_up_request(data) {
    viewRechargeRequests(38)
    showAlert(data);
}

function approveRechargeRequestsReturn(data) {
    viewRechargeRequests(38)
    showAlert(data);

}


function getAllRechargeRequestStatus() {
    activateTab('recharge_requests');
    var request_type = "json_get_topup_status";
    var data = {
        action: "json_get_topup_status",
        user_key: localStorage.user_id,
        is_ajax: true,
    };
    processFromUrl(data, request_type);
}

function json_get_topup_status(data) {
    var data = data.result;
    var pills_html = "";
    var count = 0;
    $.each(data, function(index, value) {
        var btn_class = 'btn-primary';
        if (count == 0) {
            viewRechargeRequests(index);
            btn_class = 'btn-success';
        }

        count++;
        pills_html +=
            ` <li class="nav-item">
            <a class="nav-link btn-sm ` + btn_class + `" data-toggle="pill"
                href="#pills-home" role="tab" aria-controls="pills-home"
                aria-selected="true" onclick="viewRechargeRequests(` +
            index +
            `,this)">` +
            value +
            `</a>
        </li>`;
    });
    $(".recharge_request_pills").html(pills_html);
}

function zoomThis(url) {
    $('#image_zoom_element').attr('src', '');
    $('#imageZoomer').modal('show');
    $('#image_zoom_element').attr('src', url);
}

function initZoomExit() {
    // $('body').unbind().click(function(){
    //     $('.zoom').toggleClass('zoom');
    // })
}