$(document).ready(function () {

    $("#btnAddNewWork").click(function () {
        // $('#popup').dialog('open');
        $("#divAddNewWork").toggle();
        $("#content").toggle();
    });
    $("#imgInp").change(function () {
                readURL(this);
    });
    $('#popup').dialog({
        autoOpen: false,
        width: 800,
        resizable: false,

        title: "",
        modal: true, show: "blind", hide: "blind"
    });
    PortfolioHelper.loadTypeDropDown();
    CKEDITOR.replace('ckeditor', {
        FormatOutput : false
    });

  //  CKEDITOR.FormatOutput = false;
    $("#btnSaveWork").click(function () {
        PortfolioManager.SaveWork();
    });

    $("#btnAddNewCatagory").click(function () {
        WorkTypeManager.GetWorkTypeData();
        $('#popup').dialog('open');
    });

    PortfolioManager.GetPortfolioData();

    
    $("#btnDeletePortfolio").click(function () {
        PortfolioManager.DeletePortfolioData();
    });
    //$('#txtSequence').on('keyup keypress blur change', function (e) {
    $('#txtSequence').on('blur', function (e) {
        PortfolioManager.CheckSequence();
    });
    
});

function readURL(input) {
    debugger;
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var toBeDelete = 0;
var o = 0;
function TablePortfolioActions(value, row, index) {

    return [
        '<button class="like" href="javascript:void(0)" id="btnPortfolioEdit" title="Edit">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</button> ',
        '<a class="danger remove" title="Remove"  onClick=" PortfolioHelper.DeletePortfolio(' + row.WorkId + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
};
function ShowImage(value, row, index) {
    return [
        '<img class="img" src="' + value + '" width="100" height="100" alt="">'
    ].join('');
};
window.actionEventsPort = {
    'click #btnPortfolioEdit': function (e, value, row, index) {
        //alert('You click like icon, row: ' + JSON.stringify(row));
        //console.log(value, row, index);
        
        PortfolioHelper.LoadPortfolioDataObj(row);
    },

};
//window.actionEvents = {
//    'click #btnPortfolioEdit': function(e, value, row, index) {
//        //alert('You click like icon, row: ' + JSON.stringify(row));
//        //console.log(value, row, index);
//        
//        WorkTypeHelper.LoadDataObj(row);
//    },

//};
var PortfolioManager = {
    SaveWork: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        
        var data = new FormData();
        var files = $("#imgInp").get(0).files;
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
       
        data.append("WorkId", $("#hdnWorkId").val());
        data.append("TypeId", $("#cmbTypeId").val());
        data.append("Title", $("#txtTitle").val());
        data.append("Link", $("#txtLink").val());
        data.append("Sequence", $("#txtSequence").val());
        data.append("Role", $("#txtRole").val());
        data.append("Technologies", $("#txtTechnologies").val());
        data.append("Description", $("#txtDescription").val());
        data.append("ImageLink", $("#hdnImageLink").val());
        // data.append("Details", CKEDITOR.instances.txtDetails.getData().serialize());
        //var xx = JSON.stringify(CKEDITOR.instances.txtDetails.getData());
        var xx = CKEDITOR.instances.txtDetails.getData();


      var aaaqa = xx.replace('\r', '').replace('\n', '');
        data.append("Details", xx);

        // data.Details = xx;
        $.ajax({
            type: 'POST',
            url: "/Portfolio/SavePortfolioWork",
            //data: JSON.stringify(PortfolioHelper.GetWorkObj()),
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                
                if (response != null) {


                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    $('#popup').dialog('close');
                    //   PortfolioHelper.ClearForm();
                    PortfolioHelper.ClearPortfolioForm();
                    PortfolioManager.GetPortfolioData();
                }
                // PortfolioManager.GetHobbiesData();
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            //contentType: "application/json",

        });

    },

    loadTypeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Portfolio/PortfolioType',
            success: function (response, textStatus) {
                b = response.result;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    GetPortfolioData: function () {

        $.ajax({
            type: 'POST',
            url: "/Portfolio/GetPortfolioData",
            //processData: false,
            //contentType: false,
            data: JSON.stringify({
                isLoadAllData: 1

            }),
            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#worksTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#worksTable").bootstrapTable({
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
    DeletePortfolioData: function () {
        $('#myModalDeletePortfolio').modal('toggle');
        if (toBeDelete < 1) {
            return 0;
        }

        $.ajax({
            type: 'POST',
            url: "/Portfolio/DeletePortfolio",
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function (response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    PortfolioManager.GetPortfolioData();
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
    CheckSequence: function () {
        var givenSeq = $("#txtSequence").val();
            $.ajax({
                type: 'POST',
                url: "/Portfolio/CheckSequence",
                data: JSON.stringify({
                    id: givenSeq

    }),

                success: function (response) {
                    
                    if (response != null) {
                        if (response.aData.Status == true) {

                            $("#myModal #modal-body #rif").html(response.aData.Message);
                            $('#myModal').appendTo("body").modal('show');
                            $("#txtSequence").val('');
                        }
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
}

var PortfolioHelper = {
    loadTypeDropDown: function () {
        var typeData = PortfolioManager.loadTypeDropDownData();
        $("#cmbTypeId").empty();
        $("#cmbTypeId").select2({
            placeholder: "Select a Type",
            //width: '100%',
            data: typeData
        });
    },

    GetWorkObj: function () {
        var aObj = new Object();
        aObj.WorkId = $('#hdnWorkId').val();
        aObj.TypeId = $('#cmbTypeId').val();
        aObj.Title = $("#txtTitle").val();
        aObj.Link = $("#txtLink").val();
        aObj.Description = $("#txtDescription").val();
        aObj.Sequence = $("#txtSequence").val();
        aObj.Role = $("#txtRole").val();
        aObj.Technologies = $("#txtTechnologies").val();
        aObj.ImageLink = $("#hdnImageLink").val();
        aObj.Details = CKEDITOR.instances.txtDetails.getData();
    
        return aObj;
    },
    
    DeletePortfolio: function (id) {
            toBeDelete = id;
            $("#myModalDeletePortfolio #modal-body #rif").html("Do you wnat to delete?");
            $('#myModalDeletePortfolio').appendTo("body").modal('show');
    },

    LoadPortfolioDataObj: function (aData) {
        $("#divAddNewWork").toggle();
        $("#content").toggle();
        $('#hdnWorkId').val(aData.WorkId);
        $('#cmbTypeId').val(aData.TypeId);
        $('#txtTitle').val(aData.Title);
        $("#txtLink").val(aData.Link);
        $("#txtSequence").val(aData.Sequence);
        $("#txtRole").val(aData.Role);
        $("#txtTechnologies").val(aData.Technologies);
        $("#txtDescription").val(aData.Description);
        $("#hdnImageLink").val(aData.ImageLink);
        $("#blah").attr('src', aData.ImageLink);
        CKEDITOR.instances.txtDetails.setData(aData.Details);
    },
    ClearPortfolioForm: function () {

        $("#divAddNewWork").toggle();
        $("#content").toggle();

        $('#hdnWorkId').val(0);
        $('#cmbTypeId').val(0);
        $('#txtTitle').val('');
        $('#txtLink').val('');
        $('#txtTitle').val('');
        $("#txtSequence").val('');
        $("#txtRole").val('');
        $("#txtTechnologies").val('');
        $('#txtDescription').val('');
        $('#hdnImageLink').val('');
        $("#blah").attr('src', '');
        CKEDITOR.instances.txtDetails.setData('');
   

    },
}

