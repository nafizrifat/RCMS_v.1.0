$(document).ready(function () {
    AboutManager.GetAboutDetailsData();
    AboutManager.GetSkillDetailsData();
    AboutManager.GetPersonalDetailsData();

});

var AboutManager = {
    GetPersonalDetailsData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(AboutHelper.GetData(), AboutHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/About/GetPersonalDetailsData",
            //data: JSON.stringify(AboutHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {
                
                if (response != null) {
                    var dataSkill = '';
                    $.each(response.data, function (i, item) {
                        dataSkill += '<p><span style="font-weight: bold;">' + response.data[i].PersonalName + ': </span>' + response.data[i].PersonalDetails + '</p>';
                    });
                    $("#divPersonalDetails").html("");
                    $('#divPersonalDetails').append(dataSkill);
                }
                else {
                    $('#txtAboutTitle').val("");
                    $("#txtAboutDetails").val("");
                    $("#AboutId").val(0);
                    $("#blah").attr('src', "");
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
    GetAboutDetailsData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(AboutHelper.GetData(), AboutHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/About/GetAboutDetailsData",
            //data: JSON.stringify(AboutHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {

                if (response != null) {

                    $('#tabAbout').text(response.data.AboutTitle);
                    $('#tabPanelAboutDetails').text(response.data.AboutDetails);
                    $('#imgAbout').attr('src', response.data.AboutImageLink);
                    $("#linkCv").attr("href", response.data.CvLink);
                    //---
                    //$('#txtAboutTitle').val(response.data.AboutTitle);
                    //$("#txtAboutDetails").val(response.data.AboutDetails);
                    //$("#hdnAboutId").val(response.data.AboutId);
                    //$("#hdnAboutImageLink").val(response.data.AboutImageLink);
                    //$("#hdnCvLink").val(response.data.CvLink);
                    //$("#blah").attr('src', response.data.AboutImageLink);
                    //$("#downloadCv").attr("href", response.data.CvLink);
                    //$("#downloadCv").show();
                } else {
                    $('#txtAboutTitle').val("");
                    $("#txtAboutDetails").val("");
                    $("#AboutId").val(0);
                    $("#blah").attr('src', "");
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
    GetSkillDetailsData: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(AboutHelper.GetData(), AboutHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/About/GetSkillDetailsData",
            //data: JSON.stringify(AboutHelper.GetData()),
            // data: data,
            processData: false,
            contentType: false,

            success: function (response) {

                if (response != null) {
                    var dataSkill = '';
                    $.each(response.data, function (i, item) {
                    //    dataSkill += '<div class="progress-bar-skills skills-top"><div class="hide-skill-bar effect" style="height: ' + (100 - response.data[i].SkillPercent) + '%;"><span class="progress-bar-text" data-percent="' + response.data[i].SkillPercent + '">' + response.data[i].SkillName + '</span></div><p>' + response.data[i].SkillPercent + '%</p></div>';
                        var skillYears = parseFloat(response.data[i].SkillPercent) || 0;

                        // 13 years represents a 100% full bar.
                        var skillBarPercent = Math.min(
                            Math.max((skillYears / 13) * 100, 0),
                            100
                        );

                        var skillYearText =
                            skillYears === 1
                                ? '1 Year'
                                : skillYears + ' Years';

                        dataSkill +=
                            '<div class="progress-bar-skills skills-top">' +
                            '<div class="hide-skill-bar effect" ' +
                            'style="height: ' + (100 - skillBarPercent) + '%;">' +

                            '<span class="progress-bar-text" ' +
                            'data-percent="' + skillBarPercent + '">' +
                            response.data[i].SkillName +
                            '</span>' +

                            '</div>' +

                            '<p>' + skillYearText + '</p>' +
                            '</div>';
                    });
                    $("#aaa").html("");
                    $('#aaa').append(dataSkill);

                }


                else {
                    $('#txtAboutTitle').val("");
                    $("#txtAboutDetails").val("");
                    $("#AboutId").val(0);
                    $("#blah").attr('src', "");
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

var AboutHelper = {

    HomeSocialData: function () {
        AboutManager.GetHomeSocialData();
        // var data = 

        // $('#txtTitle1').val(data.Title);
        // $("#txtSubTitle1").val(data.SubTitle);
        //$("#blah").attr('src', data.HomeImageLink);
    },


}
