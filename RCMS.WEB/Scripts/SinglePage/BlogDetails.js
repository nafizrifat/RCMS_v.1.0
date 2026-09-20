$(document).ready(function () {
    BlogsManager.GetBlogDataFromSeverSession();

});
var BlogsManager = {
    GetBlogDataFromSeverSession: function () {

        $.ajax({
            type: 'POST',
            url: "/Blogs/GetBlogDataFromSeverSession",
            processData: false,
            contentType: false,

            success: function (response) {
                if (response != null) {

                    $("#secPagesHeader").css('background-image', 'url("' + response.data.ImageLink + '")');
                    $('#thumbnailImgId').attr('src', response.data.ImageLink);
                    $("#titleHeaderId").text(response.data.Title);
                    $("#hitCountId").text("Total Hit: " + response.data.HitCount);
                    //$("#createDateId").text(response.data.LastUpdateOn.toString("dddd d MMMM yyyy"));
                    
                    var nowDate = new Date(parseInt(response.data.LastUpdateOn.substr(6)));
                    var a = nowDate.toString('dd-M-yy');
                    $("#createDateId").text(BlogsHelper.getDateFormat(nowDate));
                    $("#titleId").text(response.data.Title);
                    $("#detailsId").text(response.data.Description);
                    $("#mainParagraph").html(response.data.Details);

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
}


var BlogsHelper = {
    getDateFormat: function (d) {

var mNames = new Array("January", "February", "March",
"April", "May", "June", "July", "August", "September",
"October", "November", "December");

var currDate = d.getDate();
var currMonth = d.getMonth();
var currYear = d.getFullYear();
return currDate + "-" + mNames[currMonth]+ "-" + currYear;
}
}