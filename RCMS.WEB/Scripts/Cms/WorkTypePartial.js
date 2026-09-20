$(document).ready(function () {


    $("#btnSaveWorkType").click(function () {
        WorkTypeManager.SaveWorkType();
    });
    $("#btnDeleteWorkType").click(function () {
        WorkTypeManager.DeleteWorkTypeData();
    });

});
function TableActions(value, row, index) {

    return [
        '<button class="like" href="javascript:void(0)" id="btnEdit" title="Edit">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</button> ',
        '<a class="danger remove" title="Remove"  onClick=" WorkTypeHelper.DeleteWorkType(' + row.PortfolioTypeId + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
};
function IsVisible(value, row, index) {
    
    var data = "Visible";
    if (value == false) {
        data = "Invisible";
    }
    return [
        '<span>' + data + '</span> '

    ].join('');
};
window.actionEvents = {
    'click #btnEdit': function (e, value, row, index) {
        //alert('You click like icon, row: ' + JSON.stringify(row));
        //console.log(value, row, index);

        WorkTypeHelper.LoadDataObj(row);
    },

};
var o = 0;
var toBeDelete = 0;
var WorkTypeManager = {
    SaveWorkType: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        $.ajax({
            type: 'POST',
            url: "/Portfolio/SavePortfolioType",
            data: JSON.stringify(WorkTypeHelper.GetWorkTypeObj()),

            success: function (response) {

                if (response != null) {
                    if (response.aData.Status) {
                        $("#myModal #modal-body #rif").html(response.aData.Message);
                        $('#myModal').appendTo("body").modal('show');
                       // $('#popup').dialog('close');
                        //  HobbiesHelper.ClearForm();
                        WorkTypeHelper.ClearForm();
                        WorkTypeManager.GetWorkTypeData();
                        
                        PortfolioHelper.loadTypeDropDown();
                    }
                    if (!response.aData.Status) {
                        $("#myModal #modal-body #rif").html(response.aData.Message);
                        $('#myModal').appendTo("body").modal('show');

                        //   PortfolioHelper.ClearForm();
                    }
                }
                //HobbiesManager.GetHobbiesData();
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",

        });

    },
    GetWorkTypeData: function () {

        $.ajax({
            type: 'POST',
            url: "/Portfolio/GetWorkTypeData",
            processData: false,
            contentType: false,

            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#workTypeTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#workTypeTable").bootstrapTable({
                        data: xxx
                    });
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
    DeleteWorkTypeData: function () {
        $('#myModalDelete').modal('toggle');
        if (toBeDelete < 1) {
            return 0;
        }

        $.ajax({
            type: 'POST',
            url: "/Portfolio/DeleteWorkTypeData",
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function (response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    // HobbiesManager.GetHobbiesData();
                    WorkTypeManager.GetWorkTypeData();
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

    }
}
var WorkTypeHelper = {
    GetWorkTypeObj: function () {

        var aObj = new Object();

        aObj.PortfolioTypeId = $('#hdnTypeId').val();
        aObj.Type = $("#txtTypeName").val();
        //var xxx = $("#chkIsVisible").val();
        //var xx = 
        aObj.IsVisible = $('#chkIsVisible').is(":checked");
        aObj.Description = $("#txtTypeDescription").val();
        return aObj;
    },
    ClearForm: function () {

        $('#hdnTypeId').val(0);
        $('#txtTypeName').val('');
        $('#chkIsVisible').prop('checked', false);
        $("#txtTypeDescription").val('');

    },
    LoadDataObj: function (aData) {
        WorkTypeHelper.ClearForm();
        $('#hdnTypeId').val(aData.PortfolioTypeId);
        $('#txtTypeName').val(aData.Type);
        $('#chkIsVisible').prop('checked', aData.IsVisible);
        $("#txtTypeDescription").val(aData.Description);

    },
    DeleteWorkType: function (id) {
        toBeDelete = id;
        $("#myModalDelete #modal-body #rif").html("Do you wnat to delete?");
        $('#myModalDelete').appendTo("body").modal('show');
    },
}