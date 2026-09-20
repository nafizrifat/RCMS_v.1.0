

$(document).ready(function () {

    
    GetTotalVisitorCount.GetTotalVisitorCountData();

    $("#myonoffswitch").change(function () {
        var isRealtime = $("#myonoffswitch").is(":checked");
        if (isRealtime) {
            GetTotalVisitorCount.GetTotalVisitorCountData();
        }
    });

});



var GetTotalVisitorCount = {
    
    GetTotalVisitorCountData: function () {

      
        $.ajax({
            url: '/Dashboard/GetTotalVisitorCount',
            type: 'GET',
            success: function (response) {
                
                var data = '<i class="fa fa-users"></i>&nbsp;' + response;
                $('#totalVisitors').html(data);
               
                setTimeout(function () {
                    var isRealtime = $("#myonoffswitch").is(":checked");
                    if (isRealtime) {
                        GetTotalVisitorCount.GetTotalVisitorCountData();
                    } 
                }, 10000);
                },
            error: function (error) {
                $(this).remove();
                DisplayError(error.statusText);
            }
        });
    }
}