$(document).ready(function () {
    $("#btnAddNewBlog").click(function () {
        // $('#popup').dialog('open');
        $("#divAddNewBlog").toggle();
        $("#content").toggle();
    });
    $("#imgInp").change(function () {
        readURL(this);
    });
    CKEDITOR.replace('ckeditor', {
        FormatOutput: false
    });
    $('#txtSequence').on('blur', function (e) {
        //  BlogManager.CheckBlogSequence();
    });
    $("#btnDeleteBlog").click(function () {
        BlogManager.DeleteBlogData();
    });
    $("#btnSaveBlog").click(function () {
        BlogManager.SaveBlog();
    });
    BlogManager.GetBlogData();
    $('#txtSequence').on('blur', function (e) {
        BlogManager.CheckSequence();
    });

});

function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var toBeDelete = 0;
var o = 0;

function TableBlogActions(value, row, index) {

    return [
        '<button class="like" href="javascript:void(0)" id="btnBlogEdit" title="Edit">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</button> ',
        '<a class="danger remove" title="Remove"  onClick=" BlogHelper.DeletBlog(' + row.BlogId + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
};
function ShowImage(value, row, index) {
    return [
        '<img class="img" src="' + value + '" width="100" height="100" alt="">'
    ].join('');
};
window.actionEventsPort = {
    'click #btnBlogEdit': function (e, value, row, index) {
        //alert('You click like icon, row: ' + JSON.stringify(row));
        //console.log(value, row, index);
        
        BlogHelper.LoadBlogDataObj(row);
    },

};

var BlogManager = {
    SaveBlog: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());

        var data = new FormData();
        var files = $("#imgInp").get(0).files;
        if (files.length > 0) {

            if (files[0].size > 4194304) {
                $("#myModal #modal-body #rif").html("Image size is too large! Highest size id 4MB");
                $('#myModal').appendTo("body").modal('show');
                return 0;
            } else {

                data.append("MyImages", files[0]);
            }
        }
        //aObj.Details = CKEDITOR.instances.txtDetails.getData();
        //

        data.append("BlogId", $("#hdnBlogId").val());
        data.append("Title", $("#txtTitle").val());
        data.append("Sequence", $("#txtSequence").val());
        data.append("IsPublished", $('#chkIsPublished').is(":checked"));
        data.append("Description", $("#txtDescription").val());
        data.append("ImageLink", $("#hdnImageLink").val());
        var xx = CKEDITOR.instances.txtDetails.getData();


        //  var aaaqa = xx.replace('\r', '').replace('\n', '');
        data.append("Details", xx);
        
        // data.Details = xx;
        $.ajax({
            type: 'POST',
            url: "/blogs/SaveBlogs",
            //data: JSON.stringify(PortfolioHelper.GetWorkObj()),
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {

                if (response != null) {


                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    $('#popup').dialog('close');
                    //   PortfolioHelper.ClearForm();
                    BlogHelper.ClearBlogForm();
                    BlogManager.GetBlogData();
                   
                }
                // PortfolioManager.GetHobbiesData();
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            //contentType: "application/json",

        });

    },
    GetBlogData: function () {

        $.ajax({
            type: 'POST',
            url: "/blogs/GetBlogData",
            //processData: false,
            //contentType: false,
            data: JSON.stringify({
                isLoadAllData: 1

            }),
            success: function (response) {
                if (response != null) {
                    var xxx = response.data;

                    if (o > 0) {

                        $("#worksTable").bootstrapTable('load', xxx);
                    }
                    o++;
                    $("#worksTable").bootstrapTable({
                        data: xxx
                    });
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
    CheckSequence: function () {
        var givenSeq = $("#txtSequence").val();
        $.ajax({
            type: 'POST',
            url: "/blogs/CheckSequence",
            data: JSON.stringify({
                id: givenSeq

            }),

            success: function (response) {
                
                if (response != null) {
                    if (response.aData.Status == true) {

                        $("#myModal #modal-body #rif").html(response.aData.Message);
                        $('#myModal').appendTo("body").modal('show');
                        $("#txtSequence").val('');
                    }
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

    DeleteBlogData: function () {
        $('#myModalDeleteBlog').modal('toggle');
        if (toBeDelete < 1 || typeof toBeDelete === 'undefined') {
            return 0;
        }
        
        $.ajax({
            type: 'POST',
            url: "/blogs/DeleteBlog",
            data: JSON.stringify({
                id: toBeDelete

            }),

            success: function (response) {

                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.aData.Message);
                    $('#myModal').appendTo("body").modal('show');
                    BlogManager.GetBlogData();
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

var BlogHelper = {
    DeletBlog: function (id) {
        
        toBeDelete = id;
        $("#myModalDeleteBlog #modal-body #rif").html("Do you wnat to delete?");
        $('#myModalDeleteBlog').appendTo("body").modal('show');
    },
    ClearBlogForm: function () {

        $("#divAddNewBlog").toggle();
        $("#content").toggle();
        $('#hdnBlogId').val(0);
        $('#txtTitle').val('');
        $('#txtSequence').val('');
        $('#txtDescription').val('');
        $("#hdnImageLink").val('');
        $("#blah").attr('src', '');
        CKEDITOR.instances.txtDetails.setData('');
    },

    
    LoadBlogDataObj: function (aData) {
     //   BlogHelper.ClearBlogForm();
        $("#divAddNewBlog").toggle();
        $("#content").toggle();
       
        $('#hdnBlogId').val(aData.BlogId);
        $('#txtTitle').val(aData.Title);
        $("#txtSequence").val(aData.Sequence);
        $("#txtDescription").val(aData.Description);
        $("#hdnImageLink").val(aData.ImageLink);
        $("#blah").attr('src', aData.ImageLink);
        
        CKEDITOR.instances.txtDetails.setData(aData.Details);
        },
}