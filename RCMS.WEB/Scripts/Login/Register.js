$(document).ready(function () {

    
    $("#btnRegister").click(function () {
       RegisterManager.RegisterUser();


    });
});

var RegisterManager = {
    RegisterUser: function () {
        
        var aa = JSON.stringify(RegisterManager.GetRegisterData());
        $.ajax({
            type: 'POST',
            url: '/Home/RegisterUser',//"Home/RegisterUser",
            data: aa ,
            //success: function (returnPayload) {
            //    
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {
                
                if (response != null) {
                    $("#saveAssetModal #modal-body #rif").html(response.data.Message);

                    $('#saveAssetModal').appendTo("body").modal('show');
                    // createAssetHelper.ClearForm();
                    // viewAssetCategoryManager.GetAssetCategoryData();
                    viewAssetManager.GetAssetTableData();
                    createAssetHelper.ClearForm();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
            //   processData: false,
            //  async: false
        });

    },
    GetRegisterData: function () {
        var aObj = new Object();
      //  aObj.UserName = $('#txtUserName').val();
       // aObj.Password = $('#txtPassword').val();
        //aObj.AssetName = $("#txtAssetName").val();
        //aObj.AssetCode = $("#txtAssetCode").val();
        //aObj.Note = $("#taAssetNote").val();
        //aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
       // aObj.UserId = "";
        //aObj.CompanyID = "";
       // aObj.LoginId = "";
        aObj.UserName = $('#txtUserName').val();
        aObj.Password = $('#txtPassword').val();
       
        return aObj;
    },
    //Login: function () {
    //    
    //    var logonId = $("#txtLoginId").val();
    //    var pass = $("#txtpassword").val();

    //    if (logonId == "") {
    //        alert("Please enter Login ID!");
    //        $("#txtLoginId").focus();
    //        return;
    //    }
    //    if (pass == "") {
    //        alert("Please enter Password!");
    //        $("#txtpassword").focus();
    //        //jQuery.unblockUI({ message: '' });
    //        return;
    //    }
    //    var jsonParam = 'loginId=' + logonId + '&password=' + pass;
    //    $.ajax({
    //        type: 'POST',
    //        dataType: 'json',
    //        cache: false,
    //        async: true,
    //        data: jsonParam,
    //        url: 'Home/ValidateUserLogin',
    //        success: function (response, textStatus) {
    //            b = response.result;
    //            //$.each(response.result, function (key, value) {
    //            //    var bus = { text: value.text, id: value.id };
    //            //    b.push(bus);
    //            // });

    //        },
    //        error: function (textStatus, errorThrown) {
    //            b = { id: 0, text: "No Data" }
    //        }
    //    });
    //    return b;

    //},
}
