var my_wallet_offset = 0;

function viewMyWalletTransaction() {
    activateTab('my_wallet');
    appendHtml('my_wallet_container', '', 1)
    my_wallet_offset = 0;
    var from_date = new Date();
    from_date.setDate(from_date.getDate() - 7);
    initDatePicker([{
            class_name: 'my_wallet_from',
            min_date: -10000,
            max_date: 0,
            current_date: from_date
        },
        {
            class_name: 'my_wallet_to',
            min_date: -10000,
            max_date: 0,
            current_date: new Date()
        }
    ]);
    viewMyWalletRepeater();
}

function viewMyWalletRepeater() {
    var selected_from = $('[name=my_wallet_from]').val();
    var selected_to = $('[name=my_wallet_to]').val();
    var request_type = 'viewMyWalletRepeaterReturn';
    var data = {
        user_key: localStorage.user_id,
        offset: my_wallet_offset,
        date_from: selected_from,
        date_to: selected_to,
        custom_status: status,
        action: 'json_get_my_wallet_transactions',
        is_ajax: true
    };
    processFromUrl(data, request_type);
    my_wallet_offset = my_wallet_offset + 5;
}

function viewMyWalletRepeaterReturn(data) {
    var viewMyWalletRepeaterReturn = '';
    var data = data.result;
    var remove = ['user_id', 'shop_id', 'created_on'];
    if (data.length > 0) {
        viewMyWalletRepeaterReturn += buildHeadingSingleRow('Withdrawals', '');
        $.each(data, function(index1, value1) {
            viewMyWalletRepeaterReturn += buildItemRow(showAmount(value1.amount), value1.withdraw_date);
        });
        appendHtml('my_wallet_container', viewMyWalletRepeaterReturn);

    } else {
        appendHtml('my_wallet_container', viewMyWalletRepeaterReturn);
    }

}

function getWalletData() {
    viewMyWalletTransaction();
    activateTab('wallet_page');
    var request_type = 'displayWalletData';
    var data = {
        user_key: localStorage.user_id,
        action: 'json_get_wallet_data',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}
function getAdminWalletData() {
    viewMyWalletTransaction();
    activateTab('admin_wallet_page');
    var request_type = 'displayWalletData';
    var data = {
        user_key: localStorage.user_id,
        action: 'json_get_wallet_data',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

var widrawable_amount_for_widraw = '';

function displayWalletData(data) {
    var data = data.result;
    widrawable_amount_for_widraw = Number(data.withdrwable_amount).toFixed(2);
    $('.user_tpv').html((Number(data.tpv).toFixed(2)));
    $('.user_ppv').html((Number(data.ppv).toFixed(2)));
    $('.total_amount').html((Number(data.total_earned).toFixed(2)));
    $('.widraw_amount').html((widrawable_amount_for_widraw));
    $('.this_month_earning').html((Number(data.this_month_earning).toFixed(2)));
    $('.user_pv').html(Number(data.pv).toFixed(2));
}
var minimum_balance_withdrawal = 50;
function widrawAmount() {
    if (widrawable_amount_for_widraw >= minimum_balance_withdrawal) {
      var service_cost = widrawable_amount_for_widraw * (5/100);//service cost
       var  tds = widrawable_amount_for_widraw * (5/100);//tds
        var  final_amount = widrawable_amount_for_widraw - service_cost - tds;
        final_amount = final_amount.toFixed();
        navigator.notification.confirm(
            'As Per Govt Norms,  5% TDS and 5% Service Cost Will Be Deducted  From Your Withdrawal Amount. Final Amount Will Be '+final_amount,
            onConfirmClearAmount,
            "Confirmation",
            "Proceed,Cancel"
        );
        
    } else {
        showAlert({
            title: 'Wallet',
            subtitle: 'Minimum balance for withdrawal is '+minimum_balance_withdrawal,
            class: 'error'
        })
    }

}



function onConfirmClearAmount(button) {
    if (button == 2) {
        return;
    } else if(button == 1) {
        var request_type = 'widrawReturn';
        var data = {
            user_key: localStorage.user_id,
            amount: widrawable_amount_for_widraw,
            action: 'json_money_withdraw',
            is_ajax: true
        };
        processFromUrl(data, request_type);
    }
}

function widrawReturn(data) {
    showAlert(data);
    getWalletData();
   // activateTab('home');
}




var global_recharge_amount = 0;
function rechargeRazorpay() {
    global_recharge_amount = 0;
    // successCallback({
    //     razorpay_order_id : '',
    //     razorpay_signature : ''
    // });
    var amount = $('#recharge_shop_account [name=amount]').val();
    if(amount && amount > 0){
        
        global_recharge_amount = amount;
        var rzpOptions = {
            key: "rzp_live_A6jOLPsg25coiL",
            amount: Number(amount) * 100, // 2000 paise = INR 20
            name: "Upstores",
            description: "Recharge Amount",
            image: "https://upstores.co.in/assets/img/Upstors.png",
            handler: function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: localStorage.display_name,
                email: localStorage.user_email
            },
            notes: {
                address: localStorage.address
            },
            theme: {
                color: "#4b5ceb"
            }
        };
        RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
    }
    else{
        navigator.notification.alert(
            "Please Enter Amount ! ", // message
            alertDismissed, // callback
            "Error", // title
            "Done" // buttonName
        );
    }
    
}

function successCallback(success) {
    //alert('payment_id: ' + success.razorpay_payment_id)
    var orderId = success.razorpay_order_id
    var signature = success.razorpay_signature

    var request_type = 'rechargeReturnRazorPay';
    var data = {
        user_key: localStorage.user_id,
        amount: global_recharge_amount,
        custom_status : '39',
        payment_response: success,
        action: 'add_razor_pay_topup',
        is_ajax: true
    };
    processFromUrl(data, request_type);
}

function cancelCallback(error) {
   // alert('payment .... return erorr in payment');
    //alert(error.description + ' (Error ' + error.code + ')')
}

function rechargeReturnRazorPay(data){
   // alert('recharge request done');
    showAlert(data);
}


function clearAdminWallet(){
    navigator.notification.confirm(
        "Are you sure want to clear?",
        onConfirmClear,
        "Confirmation",
        "Yes,No"
    );
}

function onConfirmClear(button) {
    if (button == 2) {
        return;
    } else if(button == 1) {
        var request_type = 'clearAdminWalletReturn';
       // var amount = $('#admin_wallet_clear [name=amount]').val();
        var data = {
            user_key: localStorage.user_id,
           // amount: amount,
            action: 'json_clear_admin_wallet',
            is_ajax: true
        };
        processFromUrl(data, request_type); // If user select a Yes, quit from the app.
    }
}

function clearAdminWalletReturn(data){
    showAlert(data);
    data = data.result;
    $('.total_amount').html((Number(data.total_earned).toFixed(2)));
}