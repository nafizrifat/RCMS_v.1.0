$(document).ready(function () {
    AboutManager.GetAboutDetailsData();
    AboutManager.GetSkillDetailsData();
    AboutManager.GetPersonalDetailsData();
    $("#imgAbout").change(function () {
        
        readURL(this);
    });


    $("#btnHomeContentSubmit").click(function () {
        
        AboutManager.SaveHomeContent();
    });
    $("#btnSaveSkill").click(function () {
        
        AboutManager.SaveSkillDetails();
    });
    $("#btnSavePersonalData").click(function () {

        AboutManager.SavePersonalData();
    });

    //$('#popup').dialog({
    //    autoOpen: false,
    //    width: 600,
    //    resizable: false,

    //    title: "",
    //    modal: true, show: "blind", hide: "blind"
    //});
    $("#btnAddNewSocial").click(function () {
        $('#popup').dialog('open');
        
        //$("#socialTable").html("");
    });
    $("#btnDeleteSocial").click(function () {
        AboutManager.DeleteSocalConfirmed();
    });


    //skill dynamic field addition


    $("#addButtonSkill").click(function () {

        counter++;
        if (counter > 4) {
            alert("Only 4 Skills are allowed");
            return false;
        }
        var newTextBoxDiv = $(document.createElement('div'))
             .attr("id", 'TextBoxSkillDiv' + counter);

        newTextBoxDiv.after().html('<div class="row"><section class="col col-2"><label>Skill #' + counter + ' : </label></section>' +
              '<section class="col col-5"><input type="text" name="textboxSkillName' + counter +
              '" id="textboxSkillName' + counter + '" value="" placeholder="Skill Name" ></section>' +
            '<section class="col col-5"><input type="text" name="textboxSkillPercent' + counter +
              '" id="textboxSkillPercent' + counter + '" value="" placeholder="Skill Percent" ></section></div>');

        newTextBoxDiv.appendTo("#TextBoxesSkillGroup");
    });

    //$("#removeSkillButton").click(function () {
    //    if (counter == 1) {
    //        alert("No more textbox to remove");
    //        return false;
    //    }

    //    counter--;

    //    $("#TextBoxSkillDiv" + counter).remove();

    //});

    $("#removeSkillButton").click(function (event) {
        event.preventDefault();
        debugger;

        if (counter <= 1) {
            alert("At least one skill must remain.");
            return false;
        }

        // Remove the current/last skill first.
        $("#TextBoxSkillDiv" + counter).remove();

        // Then update the counter.
        counter--;

        return false;
    });

    $("#getButtonValue").click(function () {

        var msg = '';
        for (i = 1; i < counter; i++) {
            msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
        }
        alert(msg);
    });
    //skill dynamic field addition

    //employee info dynamic field addition
    $("#addButtonPersonal").click(function () {

        if (counterPersonal > 10) {
            alert("Only 10 textboxes allow");
            return false;
        }

        var newTextBoxDiv = $(document.createElement('div'))
             .attr("id", 'TextBoxPersonalDiv' + counterPersonal);

        newTextBoxDiv.after().html('<div class="row"><section class="col col-2"><label>Personal info #' + counterPersonal + ' : </label></section>' +
              '<section class="col col-5"><input type="text" name="textboxPersonalName' + counterPersonal +
              '" id="textboxPersonalName' + counterPersonal + '" value="" placeholder="Attribute Name" ></section>' +
            '<section class="col col-5"><input type="text" name="textboxPersonalDetails' + counterPersonal +
              '" id="textboxPersonalDetails' + counterPersonal + '" value="" placeholder="Value/Details" ></section></div>');

        newTextBoxDiv.appendTo("#TextBoxesPersonalGroup");


        counterPersonal++;
    });

    $("#removePersonalButton").click(function () {
        if (counter == 1) {
            alert("No more textbox to remove");
            return false;
        }

        counter--;

        $("#TextBoxPersonalDiv" + counter).remove();

    });

    $("#getButtonValue").click(function () {

        var msg = '';
        for (i = 1; i < counter; i++) {
            msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
        }
        alert(msg);
    });
});
var toBeDelete = 0;
var counter = 2;
var counterPersonal = 2;

function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


var AboutManager = {
    SaveHomeContent: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(AboutHelper.GetData(), AboutHelper.GetData2());
        var data = new FormData();
        
        var files = $("#imgAbout").get(0).files;
        var cv = $("#fileCv").get(0).files;
        //  var aaa = $("#divTitle").validate();
        var arr = $("#divTitle > div").map(function () { return this.id });

        if (files.length > 0) {

            if (files[0].size > 4194304) {
                $("#myModal #modal-body #rif").html("Image size is too large! Highest size id 4MB");
                $('#myModal').appendTo("body").modal('show');
                return 0;
            } else {

                data.append("MyImages", files[0]);
            }
        }
        var arrCv = $("#divTitle > div").map(function () { return this.id });

        if (cv.length > 0) {

            if (cv[0].size > 4194304) {
                $("#myModal #modal-body #rif").html("CV size is too large! Highest size id 4MB");
                $('#myModal').appendTo("body").modal('show');
                return 0;
            } else {

                data.append("MyCv", cv[0]);
            }
        }
        data.Title = $('#txtAboutTitle').val();
        data.SubTitle = $("#txtAboutDetails").val();
        data.append("AboutTitle", $("#txtAboutTitle").val());
        data.append("AboutDetails", $("#txtAboutDetails").val());
        data.append("AboutId", $("#hdnAboutId").val());
        data.append("AboutImageLink", $("#hdnAboutImageLink").val());
        data.append("CvLink", $("#hdnCvLink").val());

        $.ajax({
            type: 'POST',
            url: "/About/SaveAboutDetails",
            //data: JSON.stringify(AboutHelper.GetData()),
            data: data,
            processData: false,
            contentType: false,
            //success: function (returnPayload) {
            //    
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {
                
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');

                    //AboutHelper.ClearForm();

                    // viewAssetCategoryManager.GetAssetCategoryData();

                    AboutManager.GetAboutDetailsData();

                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            // contentType: "application/json",
        });

    },
    SaveSkillDetails: function () {
        var data = AboutHelper.GetSkillsData();
        if (!data) {
            return false;
        }
        $.ajax({
            type: 'POST',
            url: "/About/SaveAboutSkills",
            data: JSON.stringify({ skillList: data }),

            success: function (response) {
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    AboutManager.GetAboutDetailsData();

                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });

    },
    SavePersonalData: function () {
        var data = AboutHelper.GetPersonalData();
        if (!data) {
            return false;
        }
        $.ajax({
            type: 'POST',
            url: "/About/SavePersonalData",
            data: JSON.stringify({ personalInfoList: data }),

            success: function (response) {
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    AboutManager.GetAboutDetailsData();

                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });

    },

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
                    $("#TextBoxesPersonalGroup").html("");
                    var populateCounterPersonal = 1;
                    for (var i = 0; i < response.data.length; i++) {
                        var newTextBoxDiv = $(document.createElement('div'))
            .attr("id", 'TextBoxPersonalDiv' + populateCounterPersonal);

                        newTextBoxDiv.after().html('<div class="row"><section class="col col-2"><label>Personal info #' + populateCounterPersonal + ' : </label></section>' +
                              '<section class="col col-5"><input type="text" name="textboxPersonalName' + populateCounterPersonal +
                              '" id="textboxPersonalName' + populateCounterPersonal + '" value="' + response.data[i].PersonalName + '" ></section>' +
                            '<section class="col col-5"><input type="text" name="textboxPersonalDetails' + populateCounterPersonal +
                              '" id="textboxPersonalDetails' + populateCounterPersonal + '" value="' + response.data[i].PersonalDetails + '" ></section></div>');

                        newTextBoxDiv.appendTo("#TextBoxesPersonalGroup");
                        populateCounterPersonal++;
                        counterPersonal = populateCounterPersonal;
                    }
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

                    $('#txtAboutTitle').val(response.data.AboutTitle);
                    $("#txtAboutDetails").val(response.data.AboutDetails);
                    $("#hdnAboutId").val(response.data.AboutId);
                    $("#hdnAboutImageLink").val(response.data.AboutImageLink);
                    $("#hdnCvLink").val(response.data.CvLink);
                    $("#blah").attr('src', response.data.AboutImageLink);
                    $("#downloadCv").attr("href", response.data.CvLink);
                    $("#downloadCv").show();
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
                debugger;
                if (response != null) {
                    $("#TextBoxesSkillGroup").html("");
                    var populateCounterSkill = 1;
                    for (var i = 0; i < response.data.length; i++) {
                        var newTextBoxDiv = $(document.createElement('div'))
                            .attr("id", 'TextBoxSkillDiv' + populateCounterSkill);

                        newTextBoxDiv.after().html('<div class="row"><section class="col col-2"><label>Skill #' + populateCounterSkill + ' : </label></section>' +
                              '<section class="col col-5"><input type="text" name="textboxSkillName' + populateCounterSkill +
                              '" id="textboxSkillName' + populateCounterSkill + '" value="' + response.data[i].SkillName + '" ></section>' +
                            '<section class="col col-5"><input type="text" name="textboxSkillPercent' + populateCounterSkill +
                              '" id="textboxSkillPercent' + populateCounterSkill + '" value="' + response.data[i].SkillPercent + '" ></section></div>');
                        //newTextBoxDiv.after().html(
                        //    '<div class="row">' +

                        //    '<section class="col col-2">' +
                        //    '<label>Skill #' + populateCounterSkill + ':</label>' +
                        //    '</section>' +

                        //    '<section class="col col-5">' +
                        //    '<label>Skill Name</label>' +
                        //    '<input type="text" ' +
                        //    'name="textboxSkillName' + populateCounterSkill + '" ' +
                        //    'id="textboxSkillName' + populateCounterSkill + '" ' +
                        //    'value="' + response.data[i].SkillName + '">' +
                        //    '</section>' +

                        //    '<section class="col col-5">' +
                        //    '<label>Years of Experience</label>' +
                        //    '<input type="number" ' +
                        //    'name="textboxSkillPercent' + populateCounterSkill + '" ' +
                        //    'id="textboxSkillPercent' + populateCounterSkill + '" ' +
                        //    'min="0" ' +
                        //    'max="13" ' +
                        //    'step="1" ' +
                        //    'value="' + response.data[i].SkillPercent + '">' +
                        //    '</section>' +

                        //    '</div>'
                        //);
                        newTextBoxDiv.appendTo("#TextBoxesSkillGroup");                        
                        counter = populateCounterSkill;
                        populateCounterSkill++;
                    }
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


    }

var AboutHelper = {

    popupInit: function () {
        

    },
    ClearForm: function () {
        
        $('#txtAssetCategoryId').val('');
        $("#txtAssetCategoryName").val('');
        $("#txtAssetCategoryCode").val('');
        $("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetData: function () {
        //var aObj = new Object();
        var aObj = new FormData();
        aObj.Title = $('#txtTitle').val();
        aObj.SubTitle = $("#txtSubTitle").val();
        aObj.AssetCategoryCodet = $("#txtAssetCategoryCode").val();

        var fileInput = $('#imgAbout');
        var file = $('#imgAbout').get(0).files[0];
        //var images = $('#blah').attr('src');
        //var ImageSave = images.replace("data:image/jpeg;base64,", "");
        ////var submitImageFileval = JSON.stringify({ data: ImageSave });
        //var submitval = ImageSave;

        aObj.ImageFile = file;
        aObj.append("ImageFile", file);
        //var data = new FormData();
        //var files = $("#imgAbout").get(0).files;
        //if (files.length > 0) {
        //    data.append("HelpSectionImages", files[0]);
        //    aObj.append("HelpSectionImages", files[0]);
        //    aObj.ImageFile = files[0];
        //}
        return aObj;
    },
    GetSkillsData: function () {
        
        var data = [];
        for (i = 1; i < counter; i++) {
            var aData = new Object();
            aData.SkillName = $('#textboxSkillName' + i).val();
            aData.SkillPercent = $('#textboxSkillPercent' + i).val();
            aData.AboutId = $('#hdnAboutId').val();
            if (aData.SkillName == '' || aData.SkillPercent == '' || aData.AboutId == 0) {
                $("#myModal #modal-body #rif").html("Sorry! You need to fill all the data");
                $('#myModal').appendTo("body").modal('show');
                return false;
            }

            data.push(aData);
        }
        
        return data;
    },
    GetPersonalData: function () {
        var data = [];
        for (i = 1; i < counter; i++) {
            var aData = new Object();
            aData.PersonalName = $('#textboxPersonalName' + i).val();
            aData.PersonalDetails = $('#textboxPersonalDetails' + i).val();
            aData.AboutId = $('#hdnAboutId').val();
            if (aData.PersonalName == '' || aData.PersonalDetails == '' || aData.AboutId == 0) {
                $("#myModal #modal-body #rif").html("Sorry! You need to fill all the data");
                $('#myModal').appendTo("body").modal('show');
                return false;
            }

            data.push(aData);
        }
        
        return data;
    },
    GetSocalLinkData: function () {
        //var aObj = new Object();
        var aObj = new FormData();
        aObj.SocialIcon = $('#txtIcon').val();
        aObj.SocialUrl = $("#txtProfileUrl").val();
        return aObj;
    },

}

