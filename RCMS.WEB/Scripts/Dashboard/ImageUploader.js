$(document).ready(function() {
    
    $("#uploadImge").click(function () {
        $('#popupImageUploader').dialog('open');
        debugger;
    });
    $("#btnSaveUploadImage").click(function () {
        ImageUploadManager.SaveImage();
    });
    $("#imgInpImageUploader").change(function () {
        readURLImageUploader(this);
    });
    ImageUploadManager.LoadAllImage();
    $("#btnDeleteImage").click(function () {
        ImageUploadManager.DeleteImageConfirmed();
    });
});


function readURLImageUploader(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blahImageUploader').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var toBeDelete = 0;
var o = 0;
function TableImagesActions(value, row, index) {

    return [
        '<a class="danger remove" title="Remove"  onClick=" ImageUploadManager.DeleteImage(' + row.UplodImageId + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
};
function ShowImage(value, row, index) {
    return [
        '<img class="img" src="' + value + '" width="100" height="100" alt="">'
    ].join('');
};


var ImageUploadManager = {
    

    SaveImage: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        debugger;
        var files = $("#imgInpImageUploader").get(0).files;
        if ($("#txtImageName").val() == "" || files.length == 0) {
            var msg = "";
            if ($("#txtImageName").val() == "") {
                msg = "Error! Please enter image name.";
            } if (files.length == 0) {
                msg += " Error! Please enter image name.";
            }

            $("#myModal #modal-body #rif").html(msg);
            $('#myModal').appendTo("body").modal('show');
            return 0;
        }

        var data = new FormData();
        if (files.length > 0) {

            if (files[0].size > 4194304) {
                $("#myModal #modal-body #rif").html("Image size is too large! Highest size id 4MB");
                $('#myModal').appendTo("body").modal('show');
                return 0;
            } else {

                data.append("MyImages", files[0]);
            }
        }
        //aObj.Details = CKEDITOR.instances.txtDetails.getData();
        //

        data.append("ImageName", $("#txtImageName").val());


        //var xx = CKEDITOR.instances.txtDetails.getData();


        //data.append("Details", xx);

        // data.Details = xx;
        $.ajax({
            type: 'POST',
            url: "/Dashboard/SaveImage",
            //data: JSON.stringify(PortfolioHelper.GetWorkObj()),
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                debugger;
                if (response.Status) {

                    $('#blahImageUploader').attr('src', "");
                    $('#txtImageName').val('');
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                    ImageUploadManager.LoadAllImage();
                    //  $('#popup').dialog('close');
                    //PortfolioHelper.ClearPortfolioForm();
                    //PortfolioManager.GetPortfolioData();
                } else {
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            //contentType: "application/json",

        });

    },

    LoadAllImage: function () {

        $.ajax({
            type: 'POST',
            url: "/Dashboard/LoadAllImage",
            //processData: false,
            //contentType: false,
        
            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#imagesTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#imagesTable").bootstrapTable({
                        data: xxx
                    });
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });

    },

    
    DeleteImage: function (id) {
            toBeDelete = id;
            $("#myModalDeleteImage #modal-body #rif").html("Do you wnat to delete?");
            $('#myModalDeleteImage').appendTo("body").modal('show');
    },
    DeleteImageConfirmed: function () {
        $('#myModalDeleteImage').modal('toggle');
        if (toBeDelete < 1) {
            return 0;
        }

        $.ajax({
            type: 'POST',
            url: "/Dashboard/DeleteImage",
            data: JSON.stringify({
                id: toBeDelete

            }),
            
            success: function (response) {
                debugger;
                if (response.Status) {
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                    ImageUploadManager.LoadAllImage();
                }
                else
                {
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                }
            },
            error: function (response) {
                debugger;
                $("#dialog_simple").html(response.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
            //   processData: false,
            //  async: false
        });

    },
}