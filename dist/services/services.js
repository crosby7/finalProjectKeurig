export function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    
    if (pageID != "")
    {
        $.get(`pages/${pageID}.html`, function (data) {
            $('#app').html(data);
        })
        .fail(function () {
            alert("Error 404, page not found");
        });
    }
    else
    {
        $.get(`pages/home.html`, function (data) {
            $('#app').html(data);
        })
        .fail(function () {
            alert("Error 404, page not found");
        });
    }
}