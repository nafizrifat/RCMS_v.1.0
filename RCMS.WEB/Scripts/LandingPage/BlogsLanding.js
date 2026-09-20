$(document).ready(function () {
    BlogsLandnigManager.GetBlogsData();

});

var BlogsLandnigManager = {
    GetBlogsData: function () {
        var url = window.location.href;
        var host = window.location.host;
        var isLoadAllData = 0;
        
        //if (url.indexOf("BlogsList") != -1) {
        //    isLoadAllData = 1;
        //}

        $.ajax({
            type: 'POST',
            url: "/Blogs/GetBlogData",
            //processData: false,
            //contentType: false,
            data: JSON.stringify({
                isLoadAllData: isLoadAllData

            }),
            success: function (response) {
                if (response != null) {


                    var blogData = "";
                    $.each(response.data, function (i, item) {

                    //    blogData += ' <div class="col-xs-12 col-sm-6 col-md-4 work-item design effect">' +
                    //        '<div class="single-work mb-30">' +
                    //        '<img class="effect" src="http://placehold.it/770x700" alt="work-2">' +
                    //        '<div class="text-center work-overlay effect">' +
                    //        '<div class="work-links">' +
                    //        '<a href="http://' + host + '/Blogs/BlogDetails?blogId=' + item.BlogId + ' class="pf-link ver-center effect"><i class="fa fa-link"></i></a>' +
                    //        '<a href="http://placehold.it/770x700" class="popup-link ver-center effect"><i class="fa fa-search"></i></a>' +
                    //        '</div>' +
                    //        '<h3 class="hor-center">'+ item.Title +'</h3>' +
                    //        '</div>' +
                    //        '</div>' +
                    //        '</div>';
                    //});  
                    //    blogData += ' <div class="col-xs-12 col-md-4 animate-on-scroll" data-animation="slide-up" data-delay="0.6">' +
                    //        '<div class="single-blog mb-30">' +
                    //        '<div class="blog-thumbnail">' +
                    //        '<img src="' + item.ImageLink + '" alt="work-5" style="height: 300px; width: 360px; object-fit: contain">' +
                    //        '<div class="b-thumbnail-overlay text-center effect">' +
                    //        '<a href="http://' + host + '/Blogs/BlogDetails?blogId=' + item.BlogId + ' class="main-color-bg center"><i class="fa fa-link"></i></a>' +
                    //        '</div>' +
                    //        '</div>' +
                    //        '<div class="blog-details">' +
                    //        '<h3 class="blog-title main-color">' +
                    //        '<a href="single-post.html" class="effect">Dont Just Be A Designer, Be A Good One</a>' +
                    //        '</h3>' +
                    //        '<p class="blog-meta">By Admin / In Tech</p>' +
                    //        '<p class="blog-text">Lorem ipsum dolor sit tempo amet eiusmod, do tempo cbibendumr sommodo incid idunt ut labore when an unknown ... </p>' +
                    //        '<a href="single-post.html" class="sb-link">' +
                    //        '<span class="main-color"> Read More <i class="fa fa-long-arrow-right effect"></i></span>' +
                    //        '</a>' +
                    //        '</div>' +
                    //        '<div class="border-animation main-color-bg">' +
                    //        '<div class="blog-line effect"></div>' +
                    //        '</div>' +
                    //        '</div>' +
                    //        '</div>';
                    //}); 
                        blogData += '<div class="col-xs-12 col-md-4 animate-on-scroll" data-animation="slide-up" data-delay="0.4">' +
                            '<div class="single-blog mb-30">' +
                            '<div class="blog-thumbnail">' +
                            '<img src="' + item.ImageLink + '" alt="work-5" style="height: 300px; width: 360px; object-fit: contain"">' +
                            '<div class="b-thumbnail-overlay text-center effect">' +
                            '<a href="http://' + host + '/Blogs/BlogDetails?blogId=' + item.BlogId + '" target="_blank" class="main-color-bg center"><i class="fa fa-link"></i></a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="blog-details">' +
                            '<h3 class="blog-title main-color">' +
                            '<a  href="http://' + host + '/Blogs/BlogDetails?blogId=' + item.BlogId + '" target="_blank"  class="effect">' + item.Title + '</a>' +
                            '</h3>' +
                            '<p class="blog-meta">By Admin</p>' +
                            '<p class="blog-text">' + item.Description + '</p>' +
                            '<a  href="http://' + host + '/Blogs/BlogDetails?blogId=' + item.BlogId + '" target="_blank" class="sb-link">' +
                            '<span class="main-color"> Read More <i class="fa fa-long-arrow-right effect"></i></span>' +
                            '</a>' +
                            '</div>' +
                            '<div class="border-animation main-color-bg">' +
                            '<div class="blog-line effect"></div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    });


                    $("#divBlogs").html("");
                    $('#divBlogs').append(blogData);
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

var BlogsLandnigHelper = {

}

