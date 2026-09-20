$(document).ready(function() {

    LangingHobbiesHelper.GetHobbies();
});
var LangingHobbiesManager = {
    GetHobbiesData: function() {
        $.ajax({
            type: 'POST',
            url: "/Hobbies/GetHobbiesData",
            processData: false,
            contentType: false,

            success: function (response) {
                if (response != null) {
                    var allData = response.data;
                    //var dataSocial = '<ul class="home-social-list">';
                    var dataSocial = '';
                    
                    var colMdSize = 2;
                    if (response.data.length < 4) {
                        colMdSize = 4;
                    }
                    if (response.data.length == 4) {
                        colMdSize =3;
                    }
                    //' + colMdSize + ' 
                    $.each(allData, function (i, item) {

                        //dataSocial += '<div class="no-padd col-md-' + colMdSize + '  col-sm-4 col-xs-6 col-centered">'
            //            dataSocial += '<div class="no-padd col-md-2  col-sm-6 col-xs-6 col-centered">'
            //+'<div class="main-color-bg single-hobbie-con">'
            //    +'<div class="single-hobbie effect text-center">'
            //       + '<div class="hobbie-icon effect"><i class="' + allData[i].Icon + '"></i></div>'
            //       +'<div class="hobbie-content effect">'
            //            + '<h3 class="hobbie-title effect">' + allData[i].Title + '</h3>'
            //             + '<p>' + allData[i].Description + '</p>'
                        //         +'</div></div></div></div>';
                        dataSocial += '<div class="no-padd col-md-2 col-sm-6 col-xs-6">' +
                            '<div class="main-color-bg single-hobbie-con">' +
                            '<div class="single-hobbie effect text-center">' +
                            '<div class="hobbie-icon effect"><i class="' + allData[i].Icon + '"></i></div>' +
                            '<div class="hobbie-content effect">' +
                            '<h3 class="hobbie-title effect">' + allData[i].Title + '</h3>' +
                            //'<p>Lorem ipsum dolor sit amet, sit augue theophrastus ex. Nec ne dicam impedit perpetua, legimus fierent.</p>' +
                             '<p>' + allData[i].Description + '</p>'+
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                    });
                            //  dataSocial += '</ul>';
                    
                    $("#divHobbies").html("");
                    $('#divHobbies').append(dataSocial);
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });
    }
}
var LangingHobbiesHelper = {
    GetHobbies: function() {
        LangingHobbiesManager.GetHobbiesData();
    }

}