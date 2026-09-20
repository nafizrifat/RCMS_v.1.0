$(document).ready(function() {
    $("#btnSendMessge").click(function () {
        
        ContactMeManager.SaveMessage();
    });
});

var ContactMeManager = {

    SaveMessage: function () {

        $.ajax({
            type: 'POST',
            url: "/ContactMe/SendMessae",
            data: JSON.stringify(ContactMeHelper.GetMessageData()),
           
            success: function (response) {

                if (response != null) {
                    
                    if (response.Status == true) {
                        $("#myModal #modal-body #rif").html(response.Message);
                        $('#name').val('');
                         $("#email").val('');
                        $("#subject").val('');
                        $("#message").val('');
                        $('#myModal').appendTo("body").modal('show');

                    } else {
                        $("#myModal #modal-body #rif").html(response.Message);
                        $('#myModal').appendTo("body").modal('show');
                    }
                }
            },
            error: function (response) {
         
                $("#myModal #modal-body #rif").html(response.Message);
                $('#myModal').appendTo("body").modal('show');
            },
            dataType: "json",
            contentType: "application/json",
            //   processData: false,
            //  async: false
        });

    },

}
var ContactMeHelper = {

    GetMessageData: function () {
        
        var aObj = new Object();
        aObj.name = $('#name').val();
        aObj.email = $("#email").val();
        aObj.subject = $("#subject").val();
        aObj.MessageDetails = $("#message").val();
        return aObj;
    },
}