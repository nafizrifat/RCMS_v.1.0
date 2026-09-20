$(document).ready(function () {
    MessageManager.LoadAllMessage();
    $('#divMessagePopup').dialog({
        autoOpen: false,
        width: 600,
        resizable: true,
        title: "",
        modal: true, show: "blind", hide: "blind"
    });

    $("#btnDeleteMessage").click(function () {
        MessageManager.DeleteMessageData();
    });
    $("#btnDeleteMessagePopup").click(function () {

        var id = $('#hdnMessageId').val();
        MessageHelper.DeletMessage(id);
    });
});



var toBeDelete = 0;
var o = 0;
function dateFormat(value, row, index) {
    $(this).addClass('highlight');
    return moment(value).format('DD/MM/YYYY');
   
}

function cellStyle(value, row, index) {
    
    if (!row.IsRead) {
        return {
            css:
            { "background-color": "yellow" }
        };
    } else {
        return {
            css:
            { "background-color": "" }
        };
    }
   
}


function Read(value, row, index) {
    
    var x = document.getElementById("worksTable").getElementsByTagName("td");
   // x[0].innerHTML = "i want to change my cell color";
    x[0].style.backgroundColor = "yellow";
}

function TableMessageActions(value, row, index) {

    return [
        '<button class="like" href="javascript:void(0)" id="btnMessageView" title="View">',
        '<i class="glyphicon glyphicon-search"></i>',
        '</button> ',
        '<a class="danger remove" title="Remove"  onClick=" MessageHelper.DeletMessage(' + row.MessageId + ')">',
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
    'click #btnMessageView': function (e, value, row, index) {
        //alert('You click like icon, row: ' + JSON.stringify(row));
        //console.log(value, row, index);
        
        MessageManager.MarkMessageAsRead(row.MessageId);
        MessageHelper.ViewSelectedMessage(row);
    },

};

var MessageManager = {
    LoadAllMessage: function () {

        $.ajax({
            type: 'POST',
            url: "/ContactMe/LoadAllMessageData",
            //processData: false,
            //contentType: false,
         
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
    
    MarkMessageAsRead: function (id) {
    

        $.ajax({
            type: 'POST',
            url: "/ContactMe/MarkMessageAsRead",
            data: JSON.stringify({
                id: id

            }),

            success: function (response) {

                MessageManager.LoadAllMessage();
            },
            error: function (response) {
               
            },
            dataType: "json",
            contentType: "application/json",
            //   processData: false,
              async: true
        });

    },
    DeleteMessageData: function () {
        $('#myModalDeleteMessage').modal('toggle');
        if (toBeDelete < 1 || typeof toBeDelete === 'undefined') {
            return 0;
        }

        $.ajax({
            type: 'POST',
            url: "/ContactMe/DeleteMessage",
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function (response) {
                
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    MessageManager.LoadAllMessage();
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

var MessageHelper = {
    DeleteMessage: function() {
       
    },
    ClearForm: function () {

        $('#hdnMessageId').val(0);
        $('#txtName').val('');
        $("#txtEmail").val('');
        $("#txtSubject").val('');
        $("#txtCreateDate").val('');
        $("#txtIp").val('');
        $("#txtMac").val('');
        $("#txtMessageDetails").val('');

    },

    ViewSelectedMessage: function (aData) {
        MessageHelper.ClearForm();
        $('#hdnMessageId').val(aData.MessageId);
        $('#txtName').val(aData.Name);
        $("#txtEmail").val(aData.Email);
        $("#txtSubject").val(aData.Subject);
        $("#txtCreateDate").val(moment(aData.CreateDate).format('DD/MM/YYYY'));
        $("#txtIp").val(aData.Ip);
        $("#txtMac").val(aData.Mac);
        $("#txtMessageDetails").val(aData.MessageDetails);
        $('#divMessagePopup').dialog('open');
       
    },
    DeletMessage: function (id) {

        toBeDelete = id;
        $("#myModalDeleteMessage #modal-body #rif").html("Do you wnat to delete?");
        $('#myModalDeleteMessage').appendTo("body").modal('show');
    },
}