function displayAd(adId) {
    $.ajax({
        method: "GET",
        url: kinveyAdUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/ads/" + adId,
        headers: getKinveyUserAuthHeaders(),
        success: displayAdForEditSuccess,
        error: handleAjaxError
    });

    $('#viewDetailsAd').empty();

    function displayAdForEditSuccess(ad) {
        let html = $('<div>');
        html.append(
            $('<img>').attr('src', ad.image),
            $('<br>'),
            $('<label>').text('Price:'),
            $('<h1>').text(ad.price),
            $('<label>').text('Title:'),
            $('<h1>').text(ad.title),
            $('<label>').text('Description:'),
            $('<p>').text(ad.description),
            $('<label>').text('Publisher:'),
            $('<div>').text(ad.publisher),
            $('<label>').text('Date:'),
            $('<div>').text(ad.dateOfPublishing)
        );

        html.appendTo($('#viewDetailsAd'));
        showView('viewDetailsAd');
    }
}