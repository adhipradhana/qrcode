$(document).ready(() => {

    $.ajax({
        url: "/api/admin/event/list",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": getCookie("jwtToken")
        },
        success: (result) => {
            if (result.success) {
                $(result.data).each((_, data) => {
                    let option = document.createElement("option");
                    option.setAttribute("value", data.id);
                    let name = data.name;
                    option.append(name);

                    $('#guest-event').append(option);
                });
            }
        }
    });

});

$('#guest-form').on("submit", (e) => {
    e.preventDefault();
    let name = $('#guest-name').val();
    let eventId = parseInt($('#guest-event option:selected').val());

    if (eventId !== -1) {
        let body = {
            name: name,
            eventId: eventId
        }

        $.ajax({
            url: "/api/admin/guest/create",
            method: "POST",
            dataType: "json",
            headers: {
                "Authorization": getCookie("jwtToken")
            },
            data: body,
            success: (result) => {
                console.log(result);
                if (result.success) {
                    var message = `Guest ${name} is successfully created`;
                } else {
                    var message = `Failed to create guest ${name}`;
                }

                alert(message);
            }
        });
    } 
});


function getCookie(cookiename) {
    var cookiestring = RegExp(""+cookiename+"[^;]+").exec(document.cookie);

    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}