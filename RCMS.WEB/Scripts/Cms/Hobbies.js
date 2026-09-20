$(document).ready(function () {
    
    HobbiesManager.GetHobbiesData();
    
    $("#btnSaveHobby").click(function () {
        HobbiesManager.SaveHobby();
    });

    $('#popup').dialog({
        autoOpen: false,
        width: 600,
        resizable: false,

        title: "",
        modal: true, show: "blind", hide: "blind"
    });
    $("#btnAddNewHobby").click(function () {
        $('#popup').dialog('open');
    });
    $("#btnDeleteHobby").click(function () {
        HobbiesManager.DeleteHobbyData();
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
};


function TableActions(value, row, index) {
    
    return [
        '<button class="like" href="javascript:void(0)" id="btnEdit" title="Edit">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</button> ',
        '<a class="danger remove" title="Remove"  onClick=" HobbiesManager.DeleteHobby(' + row.HobbyId + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
};
function ShowIcon(value, row, index) {
    
    return [
        '<span>',
        '<i class="'+value+'"></i>',
        '</span> '
        
    ].join('');
};
window.actionEvents = {
    'click #btnEdit': function (e, value, row, index) {
        //alert('You click like icon, row: ' + JSON.stringify(row));
        //console.log(value, row, index);
        
        HobbiesHelper.LoadDataObj(row);
    },

};
var o = 0;
var HobbiesManager = {
    DeleteHobby: function(id) {
        toBeDelete = id;
        $("#myModalDelete #modal-body #rif").html("Do you wnat to delete?");
        $('#myModalDelete').appendTo("body").modal('show');
        


    },

    GetHobbiesData: function() {

        $.ajax({
            type: 'POST',
            url: "/Hobbies/GetHobbiesData",
            processData: false,
            contentType: false,

            success: function(response) {
                if (response != null) {
                    var xxx = response.data;
                    
                    if (o > 0) {

                        $("#hobbiesTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#hobbiesTable").bootstrapTable({
                        data: xxx
                    });
                }
            },
            error: function(response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });

    },
    SaveHobby: function() {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        $.ajax({
            type: 'POST',
            url: "/Hobbies/SaveHobby",
            data: JSON.stringify(HobbiesHelper.GetHobbyObj()),

            success: function(response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    $('#popup').dialog('close');
                    //HobbiesManager.GetHobbiesData();
                    HobbiesHelper.ClearForm();
                    // $('#hobbiesTable').bootstrapTable('refresh');
                }
                HobbiesManager.GetHobbiesData();
            },
            error: function(response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",

        });

    },


    DeleteHobbyData: function() {
        $('#myModalDelete').modal('toggle');
        if (toBeDelete < 1) {
            return 0;
        }

        $.ajax({
            type: 'POST',
            url: "/Hobbies/DeleteHobby",
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function(response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    HobbiesManager.GetHobbiesData();
                }
            },
            error: function(response) {
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

var HobbiesHelper = {

    ClearForm: function () {
        
        $('#hdnHobbyId').val(0);
        $('#txtIcon').val('');
        $("#txtTitle").val('');
        $("#txtDescription").val('');

    },

    GetHobbyObj: function () {
        debugger;
        var aObj = new Object();

        aObj.HobbyId = $('#hdnHobbyId').val();
        //aObj.Icon = 'fa ' + $('#txtIcon').val();
        aObj.Icon = $('#txtIcon').val();
        aObj.Title = $("#txtTitle").val();
        aObj.Description = $("#txtDescription").val();
        return aObj;
    },
    LoadDataObj: function (aData) {
        HobbiesHelper.ClearForm();
        $('#hdnHobbyId').val(aData.HobbyId);
        $('#txtIcon').val(aData.Icon);
        $("#txtTitle").val(aData.Title);
        $("#txtDescription").val(aData.Description);
        $('#popup').dialog('open');
    },

}

