$(document).ready(() => {
    $.ajax({
        url: "/api/admin/guest/list",
        headers: {
            "Authorization": getCookie("jwtToken")
        },
        dataType: "json",
        type: "GET",
        success: (result) => {
            if (result.success) {
                $(result.data).each((_, data) => {
                    let row = $("<tr></tr>");
                    $("#body-table-guest").append(row);

                    let id = document.createElement("td");
                    id.innerHTML = data.id;
                    let name = document.createElement("td");
                    name.innerHTML = data.name;
                    let event = document.createElement("td");
                    event.innerHTML = data.eventId;
                    let token = document.createElement("td");
                    token.innerHTML = data.token;

                    let file = document.createElement("td");
                    let fileLink = document.createElement("a");
                    fileLink.setAttribute("href", "/files/" + data.file);
                    fileLink.innerHTML = data.file;
                    file.append(fileLink);

                    let attended = document.createElement("td");
                    attended.innerHTML = data.attended;

                    let removeButton = document.createElement("button");
                    removeButton.classList.add("btn","btn-primary");
                    removeButton.val = data.id;
                    removeButton.innerHTML = "REMOVE";
                    removeButton.onclick = (e) => {
                        e.preventDefault();

                        $.ajax({
                            url: "/api/admin/guest/delete",
                            method: "POST",
                            data: {
                                id: data.id
                            },
                            headers: {
                                "Authorization": getCookie("jwtToken")
                            },
                            dataType: "json",
                            success: (result) => {
                                if (result.success) {
                                    var message = `${data.name} is successfully deleted`;
                                    alert(message);
                                    location.reload();
                                } else {
                                    var message = `Failed to delete ${data.name}`;
                                    alert(message);
                                }
                            }
                        });
                    }

                    row.append(id, name, event, token, file, attended, removeButton);
                });
            }
        }
    });
    $.ajax({
        url: "/api/admin/event/list",
        headers: {
            "Authorization": getCookie("jwtToken")
        },
        dataType: "json",
        type: "GET",
        success: (result) => {
            if (result.success) {
                $(result.data).each((_, data) => {
                    let row = $("<tr></tr>");
                    $("#body-table-event").append(row);

                    let id = document.createElement("td");
                    id.innerHTML = data.id;
                    let name = document.createElement("td");
                    name.innerHTML = data.name;
                    let date = document.createElement("td");
                    date.innerHTML = data.date;

                    let removeButton = document.createElement("button");
                    removeButton.classList.add("btn","btn-primary");
                    removeButton.val = data.id;
                    removeButton.innerHTML = "REMOVE";
                    removeButton.onclick = (e) => {
                        e.preventDefault();

                        $.ajax({
                            url: "/api/admin/event/delete",
                            method: "POST",
                            data: {
                                id: data.id
                            },
                            headers: {
                                "Authorization": getCookie("jwtToken")
                            },  
                            dataType: "json",
                            success: (result) => {
                                console.log(result);
                                if (result.success) {
                                    var message = `${data.name} is successfully deleted`;
                                    alert(message);
                                    location.reload();
                                } else {
                                    var message = `Failed to delete ${data.name}`;
                                    alert(message);
                                }
                            }
                        });
                    }
                    
                    row.append(id, name, date, removeButton);
                });
            }
        }
    });
});

$('a#event-tab').on('click', () => {
    $('a#guest-tab').removeClass("active");
    $('a#event-tab').addClass("active");
    $('#guest').removeClass("active");
    $('#guest').addClass("fade");
    $('#event').removeClass("fade");
    $('#event').addClass("active");
});

$('#guest-tab').on('click', () => {
    $('a#event-tab').removeClass("active");
    $('a#guest-tab').addClass("active");
    $('#event').removeClass("active");
    $('#event').addClass("fade");
    $('#guest').removeClass("fade");
    $('#guest').addClass("active");
});

$('#download-button').on('click', (e) => {
    e.preventDefault();

    window.open('/api/admin/guest/download', '_blank');
});

function getCookie(cookiename) {
    var cookiestring = RegExp(""+cookiename+"[^;]+").exec(document.cookie);

    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}
