$(document).ready(function () {

    DashboardIndexManager.LoadLayoutData();

    
   
    $('#popupImageUploader').dialog({
        autoOpen: false,
        width: 1200,
        resizable: true,

        title: "",
        modal: true, show: "blind", hide: "blind"
    });
});

var DashboardIndexManager = {
    
    LoadLayoutData: function () {

        $.ajax({
            type: 'POST',
            url: "/Dashboard/LoadLayoutData",
            
            success: function (response) {
                if (response != null) {
                    
                    $('#messageCount').text(response.UnreadMessage);
                    $('#loginUser').text(response.EmployeeName);
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

    
}