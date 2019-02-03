$('#event-form').on("submit", (e) => {
    e.preventDefault();
    let body = {
        name: $('#event-name').val(),
        date: $('#event-date').val()
    }

    $.ajax({
        url: "/api/admin/event/create",
        headers: {
            "Authorization": getCookie("jwtToken")
        },
        dataType: "json",
        data: body,
        type: "POST",
        success: (result) => {
            console.log(result);
            if (result.success) {
                var message = `${body.name} is successfully created`;
            } else {
                var message = `Failed to add ${body.name}`;
            }

            alert(message);
        }
    });
});

function getCookie(cookiename) {
    var cookiestring = RegExp(""+cookiename+"[^;]+").exec(document.cookie);

    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}