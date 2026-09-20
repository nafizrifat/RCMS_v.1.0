$(document).ready(function () {
    debugger;
    var chkRememberMe = $.cookie('chkRememberMe');
    if (chkRememberMe == 'true') {
        var txtLoginId = $.cookie('txtLoginId');
        var txtpassword = $.cookie('txtpassword');
        // autofill the fields
        $('#txtLoginId').attr("value", txtLoginId);
        $('#txtpassword').attr("value", txtpassword);
        $('#chkRememberMe').prop('checked', true);
    }

    $("#btnLogin").click(function () {
        debugger;

        //var a = $('#chkRememberMe').val();
        //var bb = $("#chkRememberMe").is(":checked");
        if ($('#chkRememberMe').is(":checked")) {
            var txtLoginId = $('#txtLoginId').val();
            var txtpassword = $('#txtpassword').val();
            // set cookies to expire in 14 days
            $.cookie('txtLoginId', txtLoginId, { expires: 14 });
            $.cookie('txtpassword', txtpassword, { expires: 14 });
            $.cookie('chkRememberMe', true, { expires: 14 });
        } else {
            // reset cookies
            $.cookie('txtLoginId', null);
            $.cookie('txtpassword', null);
            $.cookie('chkRememberMe', null);
        }
        LoginManager.Login();

        //  createAssetHelper.AddAssetCategoryPopUp();
    });
});
$(document).keypress(function (e) {
    if (e.which == 13) {
        // enter pressed
        
        LoginManager.Login();
    }
});
var LoginManager = {
    //SaveAsset: function () {
    //    
    //    //===============================================================
    //    //If the value of
    //    //isToUpdateOrCreate =0 then ----Create New company
    //    //isToUpdateOrCreate =1 then ----Update Company Information
    //    //===============================================================
    //    // JSON.stringify(json),
    //    //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Inventory/Asset/CreatAsset",
    //        data: JSON.stringify(createAssetHelper.GetAssetData()),
    //        //success: function (returnPayload) {
    //        //    
    //        //    console && console.log("request succeeded");
    //        //},
    //        //error: function (xhr, ajaxOptions, thrownError) {
    //        //    console && console.log("request failed");
    //        //},
    //        success: function (response) {
    //            
    //            if (response != null) {
    //                $("#saveAssetModal #modal-body #rif").html(response.data.Message);

    //                $('#saveAssetModal').appendTo("body").modal('show');
    //                // createAssetHelper.ClearForm();
    //                // viewAssetCategoryManager.GetAssetCategoryData();
    //                viewAssetManager.GetAssetTableData();
    //                createAssetHelper.ClearForm();
    //            }
    //        },
    //        error: function (response) {
    //            $("#dialog_simple").html(response.data.Message);
    //            $('#dialog_simple').dialog('open');
    //        },
    //        dataType: "json",
    //        contentType: "application/json",
    //        //   processData: false,
    //        //  async: false
    //    });

    //},

    Login: function () {

        
        //if (animating) return;
        //animating = true;
        //var that = this;
        //ripple($(that), e);
        //$(that).addClass("processing");
        var logonId = $("#txtLoginId").val();
        var pass = $("#txtpassword").val();
        if (logonId == "" || pass == "") {
            $("#messageLogin").text("Sorry! Please enter User Name and txtpassword");
            return false;
        }
        //if (logonId == "") {
        //    alert("Please enter Login ID!");
        //    $("#txtLoginId").focus();
        //    return;
        //}
        //if (pass == "") {
        //    alert("Please enter txtpassword!");
        //    $("#txttxtpassword").focus();
        //    //jQuery.unblockUI({ message: '' });
        //    return;
        //}
        var b = false;
        var jsonParam = 'loginId=' + logonId + '&password=' + pass;
        $('#loading').show();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            async: true,
            data:jsonParam,
           url: '../Login/ValidateUserLogin',
          //  url: '@Url.Action("ValidateUserLogin", "Login")',
            success: function (response, textStatus) {
                b = response.result;
                //$.each(response.result, function (key, value) {
                //    var bus = { text: value.text, id: value.id };
                //    b.push(bus);
                // });
                if (response == false) {
                    $("#messageLogin").text("Sorry! User Name or txtpassword is incorrect. Activity Reported with your IP");
                    $('#loading').hide();
                } else {
                    window.location.href = response;
                }
               // $('#loading').hide();
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
                $('#loading').hide();
            }
        });
        return b;

    },
}
