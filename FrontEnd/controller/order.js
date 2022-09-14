//Order======================================================================================================
$(".saveOrderBtn").attr('disabled', true)
$(".OrderDltBtn").attr('disabled', true)
$(".purchaseBtn").attr('disabled', true)
var total = 0;
var totalLbl = 0;
var totalLbl2 = 0;
var qtyRegEx = /^[0-9]{1,20}$/;
var cashRegEx = /^[0-9]{1,20}$/;

var tempCustomer=[];
$('#selectCustomer,#selectItem,#Quantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#selectCustomer").change(function () {
    let temp = $("#selectCustomer").val();
    btnAction3();
    if (temp != null) {
        $("#selectCustomer").css('border', '2px solid green');
    }
})

$("#selectItem").change(function () {
    let temp = $("#selectItem").val();
    btnAction3();
    if (temp != null) {
        $("#selectItem").css('border', '2px solid green');
    }
})

$("#Quantity").keyup(function (event) {
    let temp = checkQuantity();
    btnAction3();
    if ("Enter" == event.key & temp == true) {
        $("#Discount").focus();
    }
})

function checkQuantity() {
    let temp = $("#Quantity").val();
    if (qtyRegEx.test(temp)) {
        $("#Quantity").css('border', '2px solid green');
        return true;
    } else {
        $("#Quantity").css('border', '2px solid red');
    }
}

function btnAction3() {
    let selectedCustomer = $("#selectCustomer").val();
    if (selectedCustomer != "Select Customer") {
        let selectedItem = $("#selectItem").val();
        if (selectedItem != "Select Item") {
            let qty = $("#Quantity").val();
            if (qtyRegEx.test(qty)) {
                $(".saveOrderBtn").attr('disabled', false);
            } else {
                $(".saveOrderBtn").attr('disabled', true);
                return false;
            }
        } else {
            $(".saveOrderBtn").attr('disabled', true);
            return false;
        }
    } else {
        $(".saveOrderBtn").attr('disabled', true);
        return false;
    }

}


//========save==========//
$(".saveOrderBtn").click(function () {
    saveorder();

})

function saveorder() {
    var tempCustomerName = $(".customerSelection").val();
    var tempItemCode;
    var tempItemName = $(".itemSelection").val();
    var tempItemPrice;
    var requestedQty = $("#Quantity").val() * 1;
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item",
        method: "GET",
        success: function (resp) {
            for (var i = 0; i < resp.data.length; i++) {
                if (resp.data[i].name === tempItemName) {
                    var selectedItemCode = resp.data[i].code;
                    tempItemCode=resp.data[i].code;
                    var selectedItemName = resp.data[i].name;
                    var selectedItemPrice = resp.data[i].price*1;
                    tempItemPrice=resp.data[i].price;
                    var selectedItemQty = resp.data[i].qty;
                    var totalPrice = selectedItemPrice * requestedQty;

                    if (requestedQty > selectedItemQty) {
                        alert("insufficient items");
                    } else {
                        if (checkItemAvailability(tempItemName)) {
                            for (var i = 0; i < orderDetail.length; i++) {
                                if (orderDetail[i].itemCode == selectedItemCode) {
                                    orderDetail[i].itemCode = selectedItemCode
                                    orderDetail[i].itemName = selectedItemName;
                                    orderDetail[i].unitPrice = selectedItemPrice;
                                    orderDetail[i].qty = orderDetail[i].qty + requestedQty;
                                    orderDetail[i].totalPrice = orderDetail[i].totalPrice + totalPrice;
                                }
                            }
                            addOrderToTable();
                            var tempQty1=selectedItemQty-requestedQty;
                            changeQuantity(selectedItemCode,selectedItemName,selectedItemPrice,tempQty1);
                            setTotalPriceToLable();
                            return;
                        } else {
                            var orderDetails = new OrderDetails("",selectedItemCode, selectedItemName, selectedItemPrice, requestedQty, totalPrice);
                            orderDetail.push(orderDetails);
                            addOrderToTable();
                            console.log(orderDetails)
                            var tempQty2=selectedItemQty-requestedQty;
                            changeQuantity(selectedItemCode,selectedItemName,selectedItemPrice, tempQty2);
                            setTotalPriceToLable();
                            return;
                        }
                    }
                }
            }
            //changeQuantity(tempItemCode,tempItemName,tempItemPrice, requestedQty);
        }
    })
    //changeQuantity(tempItemCode,tempItemName,tempItemPrice, requestedQty);

}
function changeQuantity(itemCode, itemName, ItemPrice, itemQty) {
    console.log(itemCode+"  &  "+itemName)
    var itemOB = {
        "code": itemCode,
        "name": itemName,
        "price": ItemPrice+"",
        "qty": itemQty+""
    }
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemOB),
        success: function (resp) {
            if (resp.code == 200) {
                setItemDetails();
                console.log(item)
            } else if (resp.status == 400) {
                alert(resp.message);
            } else {
                alert(resp.data);
            }
        },
        error: function (ob, errorStatus) {
            console.log(ob)
        }

    })
}

function checkItemAvailability(itemName) {
    for (var i = 0; i < orderDetail.length; i++) {
        if (orderDetail[i].name === itemName) {
            return true;
        }
    }
}

function setTotalPriceToLable() {
    for (var i = 0; i < orderDetail.length; i++) {
        total += orderDetail[i].totalPrice;
    }
    console.log(total)
    $("#totalpriceLbl").text("Rs. " + total)
    $("#subTotalpriceLbl").text(   total)
    totalLbl = total
    totalLbl2 = total
    total = 0;
}

//========purchase==========//
$(".purchaseBtn").click(function () {
    makeOrder();
})
function makeOrder() {
    var cashTemp = $(".txtCash").val() * 1;
    if (cashTemp < totalLbl2) {
        $(".txtCash").css('border', '2px solid red')
        alert("Insufficient balance")
    } else {
        $.ajax({
            url: "http://localhost:8080/spring_pos_system_war/order",
            method:"GET",
            success: function (resp) {


                var orderCount =[];
                //orderCount.splice(0,orderCount.length);
                orderCount.length=0;
           for(var i = 0; i < resp.data.length; i++){
               orderCount.push(resp.data[i]);
           }
        let oid = "Order-" + orderCount.length++;
        let date = today;
        let selectedCustomer = $("#selectCustomer").val();
        let totalPrice = totalLbl2+"";
        let totalPriceForDB = totalLbl2;
        let cash = $(".txtCash").val();
        let discount = $(".txtDiscount").val();
        let customer=getCustomer(selectedCustomer);
        let orderDetail = getOrderDetail(oid);
                var orderOB = {
                    "oid": oid,
                    "date": date,
                    "totalPrice": totalPriceForDB,
                    "customer":customer,
                    "orderDetails":orderDetail
                }
                $.ajax({
                    url: "http://localhost:8080/spring_pos_system_war/order",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(orderOB),
                    success: function (res) {
                        if (res.code == 200) {
                            alert(res.message);
                            //saveOrderDetail(oid)
                            clearOrderDetails();
                        } else {
                            alert(res.data);
                        }
                    },
                    error: function (ob, textStatus, error) {
                        console.log(ob);
                        console.log(textStatus);
                        console.log(error);
                    }
                })

                clearField();
                //alert("Your order has been successfully added")
                $(".txtCash").css('border', '2px solid #d8dde2')
                $(".txtDiscount").css('border', '2px solid #d8dde2')
            }
        })
    }
}

function getCustomerDetails(selectedCustomer) {
   /* $.ajax({
        url: "http://localhost:8080/Spring_POS_war/customer/"+selectedCustomer,
        method: "GET",
        success: function (resp) {
            var customer=resp.data;
        }
    })*/
}
function saveOrderDetail(oid) {
    console.log("detail option ekata awaa")
    for (var i=0;i<orderDetail.length;i++) {

        var orderDetailOB = {
            "OrderID": oid,
            "ItemCode": orderDetail[i].code+"",
            "ItemName": orderDetail[i].name+"",
            "UnitPrice": orderDetail[i].price+"",
            "OrderQty": orderDetail[i].qty+"",
            "TotalPrice": orderDetail[i].totalPrice+""
        }
        $.ajax({
            url: "http://localhost:8080/spring_pos_system_war/orderDetails",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(orderDetailOB),
            success: function (res) {
                if (res.status == 200) {
                    console.log("order details completed")

                    //clearOrderDetails();
                } else {
                    alert(res.data);
                }
            },
            error: function (ob, textStatus, error) {
                console.log(ob);
                console.log(textStatus);
                console.log(error);
            }
        })
    }
    setOrderDetailsToDropDown();
}
function getOrderDetail(oid) {
    console.log("menna order id eka "+ oid)
    for (var i = 0; i < orderDetail.length; i++) {
     /*   OrderDetailsWithOid[i].oid = "oid";
        OrderDetailsWithOid[i].code = orderDetail[i].code;
        OrderDetailsWithOid[i].name = orderDetail[i].name;
        OrderDetailsWithOid[i].price = orderDetail[i].price;
        OrderDetailsWithOid[i].qty = orderDetail[i].qty;
        OrderDetailsWithOid[i].totalPrice = orderDetail[i].totalPrice;*/
        orderDetail[i].oid=oid;
    }
    console.log(orderDetail)
    return orderDetail;
}
function getCustomer(selectedCustomer) {
    for (var i = 0; i < tempCustomer.length; i++) {
        if(tempCustomer[i].name===selectedCustomer){
            return tempCustomer[i];
        }
    }
}
function clearOrderDetails() {
    orderDetail.splice(0, orderDetail.length)
}

//========others==========//
function getCustomerNames() {
    $('.customerSelection').empty();
    $('.customerSelection').append($('<option>', {text: "Select Customer"}));
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/customer",
        method: "GET",
        success: function (resp) {
            for (var i = 0; i < resp.data.length; i++) {
                tempCustomer.push(resp.data[i])
                $('.customerSelection').append($('<option>', {text: resp.data[i].name}));
            }
        }
    })
}

function getItemNames() {
    $('.itemSelection').empty();
    $('.itemSelection').append($('<option>', {text: "Select Item"}));
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item",
        method: "GET",
        success: function (resp) {
            for (var i = 0; i < resp.data.length; i++) {
                $('.itemSelection').append($('<option>', {text: resp.data[i].name}));
            }
        }
    })

}

function setOrderDetailsToDropDown() {
    $('.orderIdDropDownContent').empty();
    $(".orderIdDropDownContent").append($('<option>', {text: "Select Order"}))
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/order",
        method:"GET",
        success: function (resp) {
            for (var i = 0; i < resp.data.length; i++) {
                $(".orderIdDropDownContent").append($('<option>', {text: resp.data[i].oid}))
            }
        }
    })


    $(".orderIdDropDownContent>option").css('padding-left', '10em')
}

$(".orderIdDropDownContent").change(function () {
    var tempOid = $(".orderIdDropDownContent").val();
    var tempOD = getOrderInfo(tempOid);
    $("#tbl3").empty();
    //$("#selectCustomer").val(tempOD.custName);
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/orderDetails",
        method:"GET",
        success: function (resp) {
            for (var i = 0; i < resp.data.length; i++) {
                if(resp.data[i].OrderID===tempOid){
                    let row3 = `<tr><td>${resp.data[i].ItemCode}</td><td>${resp.data[i].ItemName}</td><td>${resp.data[i].UnitPrice}</td><td>${resp.data[i].OrderQty}</td><td>Rs. ${resp.data[i].TotalPrice}</td></tr>`;
                    $("#tbl3").append(row3);
                }
            }
        }
    })
    /*
    for (var i = 0; i < tempOD.OrderDetails.length; i++) {
        let row3 = `<tr><td>${tempOD.OrderDetails[i].code}</td><td>${tempOD.OrderDetails[i].name}</td><td>${tempOD.OrderDetails[i].price}</td><td>${tempOD.OrderDetails[i].qty}</td><td>Rs. ${tempOD.OrderDetails[i].totalPrice}</td></tr>`;
        $("#tbl3").append(row3);
    }*/
})

function getOrderInfo(tempOid) {
    for (var i = 0; i < order.length; i++) {
        if (tempOid == order[i].oID) {
            return order[i]
        }
    }

}

/*function setSelectedOrderToTable(tempOD) {
    console.log(tempOD)
    $("#tbl3").empty();
    for (var i=0;i<tempOD.length;i++) {
        console.log(tempOD[i].code)
        let row3 = `<tr><td>${tempOD[i].code}</td><td>${tempOD[i].name}</td><td>${tempOD[i].price}</td><td>${tempOD[i].qty}</td><td>Rs. ${tempOD[i].totalPrice}</td></tr>`;
        $("#tbl3").append(row3);
    }
}*/
$(".itemSelection").change(function () {
    setItemDetails();
})
$(".OrderRefreshBtn").click(function () {
    clearField();
})
$(".OrderSeeAllBtn").click(function () {
    $("#1stPage").css('display', 'none')
    $("#2ndPage").css('display', 'block')
    $("#3rdPage").css('display', 'none')
})

function setItemDetails() {
    var tempItemName = $(".itemSelection").val();
    if (tempItemName != "Select Item") {
        $.ajax({
            url: "http://localhost:8080/spring_pos_system_war/item",
            method: "GET",
            success: function (resp) {
                for (var i = 0; i < resp.data.length; i++) {
                    if (resp.data[i].name === tempItemName) {
                        $(".itemCode").val(resp.data[i].code);
                        $(".itemName").val(resp.data[i].name);
                        $(".itemPrice").val(resp.data[i].price);
                        $(".itemQty").val(resp.data[i].qty);
                        $(".itemCode,.itemName,.itemPrice,.itemQty").css("background-color", " #74b9ff");
                    }
                }
            }
        })
    } else {
        alert("select item")
    }

}

/*
function finditem(tempItemName) {
    for (var i=0;i<item.length;i++){
        if(item[i].name==tempItemName){
            return item[i];
        }
    }
}
*/

function addOrderToTable() {
    $("#tbl3").empty();
    for (var i = 0; i < orderDetail.length; i++) {
        let row3 = `<tr><td>${orderDetail[i].itemCode}</td><td>${orderDetail[i].itemName}</td><td>${orderDetail[i].unitPrice}</td><td>${orderDetail[i].qty}</td><td>Rs. ${orderDetail[i].totalPrice}</td></tr>`;
        $("#tbl3").append(row3);
    }
}

function getItemName(order1) {
    for (var i = 0; i < order1.ItemName.length; i++) {
        //console.log("helloo "+order1.ItemName[i].name);
        return order1.ItemName[i].name;
    }
}

function makeOrderId() {
    /*var orderCount = order.length;
    return orderCount++;*/
}

function clearField() {
    $("#tbl3").empty();
    $("#selectCustomer").val("");
    $("#selectItem").val("");
    $("#Quantity").val("");

    $(".itemCode").val("");
    $(".itemName").val("");
    $(".itemPrice").val("");
    $(".itemQty").val("");
    $(".itemCode,.itemName,.itemPrice,.itemQty").css("background-color", "#e9ecef");

    $("#totalpriceLbl").text("0000.00")
    $("#subTotalpriceLbl").text("0000.00")

    $(".txtCash").val("")
    $(".txtDiscount").val("")
    $(".txtBalance").val("")
    $(".purchaseBtn").attr('disabled', true)

}

$(".txtCash").keyup(function () {
    if (checkValidation()) {
        if (checkDiscountValidation()) {
            if (totalLbl != 0) {
                $(".purchaseBtn").attr('disabled', false)
            }
        }
    } else {
        $(".purchaseBtn").attr('disabled', true)
    }
    setBalance(totalLbl);

})
$(".txtDiscount").keyup(function () {
    if (checkDiscountValidation()) {
        if (checkValidation()) {
            $(".purchaseBtn").attr('disabled', false)
        }
    } else {
        $(".purchaseBtn").attr('disabled', true)
    }


})

function checkValidation() {
    if (cashRegEx.test($(".txtCash").val())) {
        $(".txtCash").css('border', '2px solid green');
        return true;
    } else {
        $("#txtCash").css('border', '2px solid red');
    }
}

function checkDiscountValidation() {
    if (cashRegEx.test($(".txtDiscount").val())) {
        $(".txtDiscount").css('border', '2px solid green');
        return true;
    } else {
        $("#txtDiscount").css('border', '2px solid red');
    }
}

function setBalance(totalLbl) {
    var cash = $(".txtCash").val() * 1;
    $(".txtBalance").val(cash - totalLbl);
}

$(".txtDiscount").keyup(function () {
    setDiscount();
})

function setDiscount() {
    var discount = $(".txtDiscount").val();
    var sub = totalLbl - (totalLbl * discount) / 100;

    $("#subTotalpriceLbl").text("Rs. " + sub);
    //totalLbl=sub;
    totalLbl2 = sub;
    setBalance(sub);
}
