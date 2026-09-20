$(document).ready(function () {
   // UniqueVisitorByDateManager.GetVisitorCount();
  
    $("#txtDate").datepicker({ maxDate: new Date, minDate: new Date(2019, 01, 01) });
    $("#txtDate").change(function () {
        
        var jsDate = $('#txtDate').datepicker('getDate');

        UniqueVisitorByDateManager.GetUniqueVisitorByDate(jsDate);
    });
    
    $("#btnProcessLocation").click(function () {
        debugger;
        UniqueVisitorByDateManager.ProcessLocation();
    });
});
var o = 0;
var UniqueVisitorByDateManager = {
    GetUniqueVisitorByDate: function (aDate) {
        $.ajax({
            type: 'POST',
            url: "/Dashboard/GetUniqueVisitorByDate",
            data: JSON.stringify({
                aDate: aDate

            }),

            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#auditTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#auditTable").bootstrapTable({
                        data: xxx
                    });
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
    ProcessLocation: function () {
        $.ajax({
            type: 'POST',
            url: "/Dashboard/ProcessLocation",
            

            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#auditTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#auditTable").bootstrapTable({
                        data: xxx
                    });
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

