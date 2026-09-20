$(document).ready(function () {
    //homeManager.GetPageData();
    //homeManager.GetSocalLinkData();
    //$("#imgInp").change(function () {
    //    
    //    readURL(this);
    //});


    //$("#btnSubmit").click(function () {
    //    
    //    homeManager.SaveAssetCategory();
    //});
    //$("#btnSaveSocalLink").click(function () {

    //    homeManager.SaveSocalLink();
    //});

    //$('#popup').dialog({
    //    autoOpen: false,
    //    width: 600,
    //    resizable: false,

    //    title: "",
    //    modal: true, show: "blind", hide: "blind"
    //});
    //$("#btnAddNewSocial").click(function () {
    //    $('#popup').dialog('open');
    //    

    //});
    //$("#btnDeleteSocial").click(function () {
    //    homeManager.DeleteSocalConfirmed();
    //});


    LangingPageMasterHelper.HomeSocialData();

});

var LangingPageMasterManager = {
    GetHomeSocialData: function () {
        var data;
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(homeHelper.GetData(), homeHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/CmsData/GetHomeOperations",
            //data: JSON.stringify(homeHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,
            // async: false,
            success: function (response) {
                
                if (response != null) {
                    // data = response.data;
                    //$('#txtTitle').val(response.data.Title);
                    //$("#txtSubTitle").val(response.data.SubTitle);
                    //$("#blah").attr('src', response.data.HomeImageLink);
                    //$('#txtTitle1').val(response.data.Title);
                    //$("#txtSubTitle1").val(response.data.SubTitle);
                    $('#txtTitle1').text(response.data.Title);
                    //$('#txtSubTitle1').text(response.data.SubTitle);
                    var text = $('#home .typer-title');
                    //var textOne = "qqI'm UI/UX Designer";
                    //var textTwo = "qqLet's Work Together";
                    //var textThree = "qqI Can Create Awesome Stuff";
                    //if (!!$.prototype.typer) {
                    //    text.typer([textOne, textTwo, textThree]);
                    // }
                    var typ = response.data.SubTitle.split("|");
                    if (!!$.prototype.typer) {
                        text.typer(typ);
                    }
                    
                    $('#home').css('background-image', 'url("' + response.data.HomeImageLink + '")');
                    $('.home-1,.home-2,.home-carousel,.first-slide,.home-carousel,.second-slide,.home-carousel,.third-slide,.fun-facts-section,.testimonials-section,#contact,.pages-header').css('background-image', 'url("' + response.data.HomeImageLink + '")');
                   
                    var dataSocial = '<ul class="home-social-list">';
                    $.each(response.data.SocialList, function (i, item) {

                        dataSocial += '<li class="main-color"><a class="effect" target="_blank" href="' + response.data.SocialList[i].SocialUrl + '"><i class="' + response.data.SocialList[i].SocialIcon + '"></i></a></li>';

                    });
                    dataSocial += '</ul>';
                    $("#divSocial").html("");
                    $('#divSocial').append(dataSocial);
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });
        // return data;
    },
}

var LangingPageMasterHelper = {

    HomeSocialData: function () {
        LangingPageMasterManager.GetHomeSocialData();
        // var data = 
        
        // $('#txtTitle1').val(data.Title);
        // $("#txtSubTitle1").val(data.SubTitle);
        //$("#blah").attr('src', data.HomeImageLink);
    },


}
