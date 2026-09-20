
$(document).ready(function () {
    PortfolioDetailsManager.GetPortfolioDataFromSeverSession();

    
    $("#shareFacebook").click(function () {
        
          var yourPageToShare = "http://nafizrifat.com/Portfolio/GetPortfolioDataDetails?portfolioId=1004";
        //var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
          var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + yourPageToShare, 'facebook-popup', 'height=350,width=600');
        if (facebookWindow.focus) { facebookWindow.focus(); }
        return false;
      //  var width = 626;
      //  var height = 436;
      //  var yourPageToShare = location.href;
      ////  var yourPageToShare = "http://nafizrifat.com/Portfolio/GetPortfolioDataDetails?portfolioId=1004";
      //  var sharerUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(yourPageToShare);
      //  var l = window.screenX + (window.outerWidth - width) / 2;
      //  var t = window.screenY + (window.outerHeight - height) / 2;
      //  var winProps = ['width=' + width, 'height=' + height, 'left=' + l, 'top=' + t, 'status=no', 'resizable=yes', 'toolbar=no', 'menubar=no', 'scrollbars=yes'].join(',');
      //  var win = window.open(sharerUrl, 'fbShareWin', winProps);
    });
    $("#shareTwitter").click(function () {
        
        var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
        if(twitterWindow.focus) { twitterWindow.focus(); }
        return false;
    
    });

    //1 for next, 0 for previous
    $("#clickNextProject").click(function () {
       PortfolioDetailsManager.GetNextPreviousPortfolio(1);
    });
    $("#clickPreviousProject").click(function () {
        PortfolioDetailsManager.GetNextPreviousPortfolio(0);
    });
    var $sidebar = $("#sidebar"),
        $window = $(window),
        offset = $sidebar.offset(),
        topPadding = 10;

    $window.scroll(function () {
        
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
});

var PortfolioDetailsManager = {
    GetPortfolioDataFromSeverSession: function () {

        $.ajax({
            type: 'POST',
            url: "/Portfolio/GetPortfolioDataFromSeverSession",
            processData: false,
            contentType: false,
    

            success: function (response) {
                if (response != null) {
                    

                    
                    PortfolioDetailsHelper.PopulateData(response);
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
    GetNextPreviousPortfolio: function (isNextPrevious) {
        var flag = new Object();
        flag.flagId = isNextPrevious;
        $.ajax({
            type: 'POST',
            url: "/Portfolio/GetNextPreviousPortfolio",
            //processData: false,
            //contentType: false,
            data: JSON.stringify({
                flag: isNextPrevious

            }),
            success: function (response) {
                
                if (response != null) {
                    


                    PortfolioDetailsHelper.PopulateData(response);
                    $("html, body").animate({ scrollTop: 0 }, "slow");
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
var PortfolioDetailsHelper = {
    PopulateData: function (response) {
        $("#secPagesHeader").css('background-image', 'url("' + response.data[0].ImageLink + '")');
        $('#thumbnailImgId').attr('src', response.data[0].ImageLink);
        $("#titleId").text(response.data[0].Title);
        $("#titleDetailsId").text(response.data[0].Title);
      //  $("#projectDetailsTitle").text(response.data[0].Title);
        $("#projectDetails").text(response.data[0].Description);

        $("#spnRole").text(response.data[0].Role);
        $("#spnType").text(response.data[0].Type);
        $("#spnTechnologies").text(response.data[0].Technologies);
        $("#spnlink").text(response.data[0].Link);
        $("#mainParagraph").html(response.data[0].Details);
    }
}