//Item======================================================================================================
$(".ItemSaveBtn").attr('disabled', true);
$("#itemSearchBtn").attr('disabled', true);
$(".ItemUpdateBtn").attr('disabled', true);
$(".itemDeleteBtn").attr('disabled', true);
addItemToTable()
var tempItem;
var codeRegEx = /^[0-9]{4}$/;
var itemNameRegEx = /^[A-z ]{3,20}$/;
var priceRegEx = /^[0-9]{2,10}$/;
var qtyRegEx = /^[0-9]{1,20}$/;

$('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode").keyup(function (event) {
    let temp = checkItemcCode();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemName").focus();
    }
})

function checkItemcCode() {
    let temp = $("#txtItemCode").val();
    if (codeRegEx.test(temp)) {
        $("#txtItemCode").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemCode").css('border', '2px solid red');
    }
}

$("#txtItemName").keyup(function (event) {
    let temp = checkItemName();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemPrice").focus();
    }
})

function checkItemName() {
    let temp = $("#txtItemName").val();
    if (itemNameRegEx.test(temp)) {
        $("#txtItemName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemName").css('border', '2px solid red');
    }
}

$("#txtItemPrice").keyup(function (event) {
    let temp = checkItemPrice();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemQuantity").focus();
    }
})

function checkItemPrice() {
    let temp = $("#txtItemPrice").val();
    if (priceRegEx.test(temp)) {
        $("#txtItemPrice").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemPrice").css('border', '2px solid red');
    }
}

$("#txtItemQuantity").keyup(function (event) {
    let temp = checkQty();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        saveItem();
    }
})

function checkQty() {
    let temp = $("#txtItemQuantity").val();
    if (qtyRegEx.test(temp)) {
        $("#txtItemQuantity").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemQuantity").css('border', '2px solid red');
    }
}

function btnAction2() {
    let code = $("#txtItemCode").val();
    if (codeRegEx.test(code)) {
        let name = $("#txtItemName").val();
        if (itemNameRegEx.test(name)) {
            let price = $("#txtItemPrice").val();
            if (priceRegEx.test(price)) {
                let qty = $("#txtItemQuantity").val();
                if (qtyRegEx.test(qty)) {
                    $(".ItemSaveBtn").attr('disabled', false);
                } else {
                    $(".ItemSaveBtn").attr('disabled', true);
                    return false;
                }
            } else {
                $(".ItemSaveBtn").attr('disabled', true);
                return false;
            }
        } else {
            $(".ItemSaveBtn").attr('disabled', true);
            return false;
        }
    } else {
        $(".ItemSaveBtn").attr('disabled', true);
        return false;
    }
}

//=============save===============//

$(".ItemSaveBtn").click(function () {
    //saveItem();
    itemAvailability($("#txtItemCode").val())
})

/*function saveItem() {
    /!*var serialize = $("#formFrame2").serialize();
    $.ajax({
        url: "http://localhost:8080/Spring_POS_war/item",
        method: "POST",
        data: serialize,
        success: function (res) {
            if (res.code == 200) {
                alert(res.message);
                addItemToTable();
                clearItemTextField();
                $(".ItemSaveBtn").attr('disabled', true);
                tblClick2();
            }

        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    })*!/
}*/

function itemAvailability(itemCode) {
    var temp=true;
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item/"+itemCode,
        method:"GET",
        success: function (resp) {
            if(resp.data==true){
                alert("item already exist")
            }else{
                //var serialize = $("#formFrame2").serialize();
                var itemOB={
                    "code":$("#txtItemCode").val(),
                    "name":$("#txtItemName").val(),
                    "price":$("#txtItemPrice").val(),
                    "qty":$("#txtItemQuantity").val()
                }
                $.ajax({
                    url: "http://localhost:8080/spring_pos_system_war/item",
                    method: "POST",
                    contentType:"application/json",
                    data: JSON.stringify(itemOB),
                    success: function (res) {
                        if (res.code == 200) {
                            alert(res.message);
                            addItemToTable();
                            clearItemTextField();
                            $(".ItemSaveBtn").attr('disabled', true);
                            tblClick2();
                        }

                    },
                    error: function (ob) {
                        alert(ob.responseJSON.message);
                    }
                })
            }

        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    })
}
function tblClick2() {
    $("#tbl2>tr").click(function () {
        $(".ItemSaveBtn").attr('disabled', true);
        let code = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();
        tempItem = code;
        $("#txtItemCode").val(code);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(price);
        $("#txtItemQuantity").val(qty);

        $(".tempItemId").val(code);
        $(".tempItemName").val(itemName);
        $(".tempItemPrice").val(price);
        $(".tempItemQty").val(qty);

        $(".ItemUpdateBtn").attr('disabled', false);
        $(".itemDeleteBtn").attr('disabled', false);
    })
}
//=============update===============//

$(".ItemUpdateBtn").click(function () {
    var itemOB={
        "code":$("#txtItemCode").val(),
        "name":$("#txtItemName").val(),
        "price":$("#txtItemPrice").val(),
        "qty":$("#txtItemQuantity").val()
    }
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item",
        method: "PUT",
        contentType:"application/json",
        data: JSON.stringify(itemOB),
        success: function (resp) {
            if(resp.code==200){
                clearItemTextField();
                addItemToTable();
                tblClick2();
                $(".ItemSaveBtn").attr('disabled', true);
                $(".ItemUpdateBtn").attr('disabled', true);
                alert(resp.message);
            }/*else if (resp.status==400){
                alert(resp.message);
            }else{
                alert(resp.data);
            }*/
        },
        error:function (ob) {
            alert(ob.responseJSON.message);
        }
    })
})


//============search & getAll===========//
$(".itemSearchField").keyup(function (event) {
    var temp = $(".itemSearchField").val();
    if (temp != null) {
        $("#itemSearchBtn").attr('disabled', false);
    } else {
        $("#itemSearchBtn").attr('disabled', true);
    }
})

$("#itemSearchBtn").click(function () {
    var temp = $(".itemSearchField").val();
    var result = searchItem(temp);
    if (result != null) {
        $("#tbl2").empty();
        let row1 = `<tr><td>${result.code}</td><td>${result.name}</td><td>${result.price}</td><td>${result.qty}</td></tr>`;
        $("#tbl2").append(row1);
    } else {
        alert("No Such a Item")
    }
    $("#tbl2>tr").click(function () {
        $(".ItemSaveBtn").attr('disabled', true);
        let code = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();
        tempItem = code;
        $("#txtItemCode").val(code);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(price);
        $("#txtItemQuantity").val(qty);

        $(".tempItemId").val(code);
        $(".tempItemName").val(itemName);
        $(".tempItemPrice").val(price);
        $(".tempItemQty").val(qty);

        $(".ItemUpdateBtn").attr('disabled', false);
        $(".itemDeleteBtn").attr('disabled', false);
    })
})

function searchItem(temp) {
    for (var i = 0; i < item.length; i++) {
        if ((item[i].code == temp) | (item[i].name == temp) | (item[i].price == temp) | (item[i].qty == temp)) {
            return item[i];
        }
    }
}

$(".itemSeeAllBtn").click(function () {
    clearItemTextField();
    addItemToTable();
    tblClick2()
})

//============delete===========//
$(".itemDeleteBtn").click(function () {
    var temp = $(".tempItemId").val();
    if (confirm("Are you sure you want to delete this?")) {
        deleteItem(temp);
    }
})
function deleteItem(temp) {
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item?code=" + temp,
        method: "DELETE",
        success: function (resp) {
            if(resp.code==200){
                alert(resp.message)
                clearItemTextField();
                addItemToTable();
                tblClick2()
            }/*else{
                console.log(resp.data)
            }*/
        },
        error:function (ob) {
            alert(ob.responseJSON.message);
        }
    })
}

//==============others=============//
function addItemToTable() {
    $.ajax({
        url: "http://localhost:8080/spring_pos_system_war/item",
        method:"GET",
        success: function (resp) {
            $("#tbl2").empty();
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;
                $("#tbl2").append(row);
            }
            tblClick2();
        }
    })

}

function clearItemTextField() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemPrice").val("");
    $("#txtItemQuantity").val("");

    $(".tempItemId").val("");
    $(".tempItemName").val("");
    $(".tempItemPrice").val("");
    $(".tempItemQty").val("");

    $(".ItemSaveBtn").attr('disabled', true);
    $("#itemSearchBtn").attr('disabled', true);
    $(".ItemUpdateBtn").attr('disabled', true);
    $(".itemDeleteBtn").attr('disabled', true);
}

$(".ItemRefreshBtn").click(function () {
    clearItemTextField();
    addItemToTable();
    tblClick2();
})