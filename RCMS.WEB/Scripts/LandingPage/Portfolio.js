$(document).ready(function () {

    PortfolioLandnigManager.GetPortfolioTypeData();
    PortfolioLandnigManager.GetPortfolioData();

});



var PortfolioLandnigManager = {
    GetPortfolioTypeData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(AboutHelper.GetData(), AboutHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/Portfolio/PortfolioType",
            //data: JSON.stringify(AboutHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {
                
                if (response != null) {

                    var dataPortfolioType = '<div class="col-xs-12">' +
                        '<ul id="work-list" class="text-center">' +
                        '<li class="main-color-bg effect">' +
                        '<a id="all" class="filter main-color filter-active fl-btn effect" onclick=PortfolioLandnigHelper.ToggleData("all")>all</a>' +
                        '</li>';

                    $.each(response.result, function (i, item) {
                        dataPortfolioType += '<li class="main-color-bg effect"> ' +
                            '<a id=' + response.result[i].text + ' class="filter main-color fl-btn effect" onclick=PortfolioLandnigHelper.ToggleData("' + response.result[i].text + '")>' + response.result[i].text + '</a>' +
                            '</li>';
                    });
                    dataPortfolioType += ' </div></div> ';
                    $("#aa").html("");
                    $('#aa').append(dataPortfolioType);



                }
                else {
                    //$('#txtAboutTitle').val("");
                    //$("#txtAboutDetails").val("");
                    //$("#AboutId").val(0);
                    //$("#blah").attr('src', "");
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
    GetPortfolioData: function () {
        var url = window.location.href;
        var host = window.location.host;
        var isLoadAllData = 0;
        
        if (url.indexOf("PortfolioList") != -1) {
            isLoadAllData = 1;
        }
        
        $.ajax({
            type: 'POST',
            url: "/Portfolio/GetPortfolioData",
            //processData: false,
            //contentType: false,
            data: JSON.stringify({
                isLoadAllData: isLoadAllData

            }),
            success: function (response) {
                if (response != null) {
                  
                    
                    var workData = "";
                    $.each(response.data, function (i, item) {
                      
                        workData += '<div class="col-xs-12 col-sm-6 col-md-4 work-item ' + item.Type + ' effect">' +
                            '<div class="single-work mb-30">' +
                            '<img class="effect" src="' + item.ImageLink + '" alt="work-5" style="height: 300px; width: 360px; object-fit: contain">' +
                            '<div class="text-center work-overlay effect">' +
                            '<div class="work-links">' +
                            '<a href="http://' + host + '/Portfolio/GetPortfolioDataDetails?portfolioId=' + item.WorkId + '" target="_blank" class="pf-link ver-center effect"><i class="fa fa-link"></i></a>' +
                            '<a href="' + item.ImageLink + '" class="popup-link ver-center effect"><i class="fa fa-search"></i></a>' +
                            '</div>' +
                            '<h3 class="hor-center">' + item.Title + '</h3>' +
                            '</div></div></div>';
                    });

                    
                    $("#divWorks").html("");
                    $('#divWorks').append(workData);
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

var PortfolioLandnigHelper = {
    ToggleData: function (aData) {
        var isas = $(this).attr('id');
        $('#work-list li').each(function () {
            
            var text = $(this).text();
            if (text.trim() != aData && aData != "all") {
                $("." + text.trim()).hide(100);
            } else {
                $("." + text.trim()).show(100);
            }
            $('li a').each(function () {
               
                $(this).removeClass('filter-active');
            });
        });
        $('#' + aData).addClass('filter-active');

       
    }
}