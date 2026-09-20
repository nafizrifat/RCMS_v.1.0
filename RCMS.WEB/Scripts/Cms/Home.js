$(document).ready(function () {
    homeManager.GetPageData();
    homeManager.GetSocalLinkData();
    $("#imgInp").change(function () {
        
        readURL(this);
    });


    $("#btnSubmit").click(function () {
        
        homeManager.SaveAssetCategory();
    });
    $("#btnSaveSocalLink").click(function () {

        homeManager.SaveSocalLink();
    });

    $('#popup').dialog({
        autoOpen: false,
        width: 600,
        resizable: false,

        title: "",
        modal: true, show: "blind", hide: "blind"
    });
    $("#btnAddNewSocial").click(function () {
        $('#popup').dialog('open');
        
        //$("#socialTable").html("");
    });
    $("#btnDeleteSocial").click(function () {
        homeManager.DeleteSocalConfirmed();
    });
});
var toBeDelete = 0;

function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


var homeManager = {
    SaveAssetCategory: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(homeHelper.GetData(), homeHelper.GetData2());
        var data = new FormData();
        
        var aa = $("#txtTitle")[0].checkValidity();
        var xx = $('#divTitle');
        //var xxx = $('#divTitle')[0].checkValidity();
        var files = $("#imgInp").get(0).files;
      //  var aaa = $("#divTitle").validate();
        var arr = $("#divTitle > div").map(function () { return this.id });

        if (files.length > 0) {

            if (files[0].size > 4194304) {
                $("#myModal #modal-body #rif").html("Image size is too large! Highest size id 4MB");
                $('#myModal').appendTo("body").modal('show');
                return 0;
            } else {

                data.append("MyImages", files[0]);
            }
        }
        data.Title = $('#txtTitle').val();
        data.SubTitle = $("#txtSubTitle").val();
        data.append("Title", $("#txtTitle").val());
        data.append("SubTitle", $("#txtSubTitle").val());
        data.append("HomeId", $("#hdnHomeId").val());
        data.append("HomeImageLink", $("#hdnHomeImageLink").val());
     
        $.ajax({
            type: 'POST',
            url: "/HomeSocial/HomeOperations",
            //data: JSON.stringify(homeHelper.GetData()),
            data: data,
            processData: false,
            contentType: false,
            //success: function (returnPayload) {
            //    
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {
                
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');

                    //homeHelper.ClearForm();

                    // viewAssetCategoryManager.GetAssetCategoryData();



                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });

    },
    GetPageData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(homeHelper.GetData(), homeHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/HomeSocial/GetHomeOperations",
            //data: JSON.stringify(homeHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {
                
                if (response != null) {

                    $('#txtTitle').val(response.data.Title);
                    $("#txtSubTitle").val(response.data.SubTitle);
                    $("#hdnHomeId").val(response.data.HomeId);
                    $("#hdnHomeImageLink").val(response.data.HomeImageLink);
                    $("#blah").attr('src', response.data.HomeImageLink);
                    // $('#blah').attr('src', response.data.HomeImageLink);
                    //$("#dialog").html("");
                    //$('#dialog').html('<img src="' + response.data.HomeImageLink + '" width=100 height=100 alt="Hello Image" />');
                } else {
                    $('#txtTitle').val("");
                    $("#txtSubTitle").val("");
                    $("#hdnHomeId").val(0);
                    $("#blah").attr('src', "");
                }
                
            },
            error: function (response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });

    },
    GetSocalLinkData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(homeHelper.GetData(), homeHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/HomeSocial/GetSocalLink",
            //data: JSON.stringify(homeHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {
                
                if (response != null) {

                    //  $('#txtTitle').val(response.data.Title);
                    var data = response.data;
                    var trHTML = '';

                    $.each(data, function (i, item) {

                        trHTML += '<tr><td style="font-size: 40px"> <a href="' + response.data[i].SocialUrl + '" target="_blank"><i class="'
                            + response.data[i].SocialIcon + '"></i></a></td><td style="font-size: 30px"><button onClick=" homeManager.DeleteSocial(' + response.data[i].SocialId + ')" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</button></td></tr>';

                    });
                    //$('#socialTable').append('');
                    $("#socialTable").html("");
                    $('#socialTable').append(trHTML);
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });

    },
    SaveSocalLink: function () {
        
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        $.ajax({
            type: 'POST',
            url: "/HomeSocial/SaveSocalLink",
            data: JSON.stringify(homeHelper.GetSocalLinkData()),

            success: function (response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    $('#popup').dialog('close');
                    homeManager.GetSocalLinkData();
                    homeHelper.ClearForm();
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
    DeleteSocalConfirmed: function () {
        // $('#myModalDelete').modal('close');
        $('#myModalDelete').modal('toggle');
        if (toBeDelete < 1) {
            return 0;
        }
        //var data = {
        //    id: toBeDelete

        //};
        $.ajax({
            type: 'POST',
            url: "/HomeSocial/DeleteSocalLink",
            //data: JSON.stringify(homeHelper.GetSocalLinkData()),
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function (response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');

                    homeManager.GetSocalLinkData();
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
    DeleteSocial: function (id) {
        toBeDelete = id;
        $("#myModalDelete #modal-body #rif").html("Do you wnat to delete?");
        $('#myModalDelete').appendTo("body").modal('show');
        

    },

}

var homeHelper = {

    popupInit: function () {
        

    },
    ClearForm: function () {
        
        $('#txtIcon').val('');
        $("#txtProfileUrl").val('');
    },

    GetData: function () {
        //var aObj = new Object();
        var aObj = new FormData();
        aObj.Title = $('#txtTitle').val();
        aObj.SubTitle = $("#txtSubTitle").val();
        aObj.AssetCategoryCodet = $("#txtAssetCategoryCode").val();

        var fileInput = $('#imgInp');
        var file = $('#imgInp').get(0).files[0];
        //var images = $('#blah').attr('src');
        //var ImageSave = images.replace("data:image/jpeg;base64,", "");
        ////var submitImageFileval = JSON.stringify({ data: ImageSave });
        //var submitval = ImageSave;

        aObj.ImageFile = file;
        aObj.append("ImageFile", file);
        //var data = new FormData();
        //var files = $("#imgInp").get(0).files;
        //if (files.length > 0) {
        //    data.append("HelpSectionImages", files[0]);
        //    aObj.append("HelpSectionImages", files[0]);
        //    aObj.ImageFile = files[0];
        //}
        return aObj;
    },
    GetSocalLinkData: function () {
        //var aObj = new Object();
        var aObj = new FormData();
        aObj.SocialIcon = $('#txtIcon').val();
        aObj.SocialUrl = $("#txtProfileUrl").val();
        return aObj;
    },

}

