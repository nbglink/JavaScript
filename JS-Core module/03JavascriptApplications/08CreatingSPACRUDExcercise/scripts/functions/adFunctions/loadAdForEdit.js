function loadAdForEdit(adId) {
    $.ajax({
        method: "GET",
        url: kinveyAdUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/ads/" + adId,
        headers: getKinveyUserAuthHeaders(),
        success: loadAdForEditSuccess,
        error: handleAjaxError
    });

    function loadAdForEditSuccess(ad) {
        $('#formEditAd input[name=id]').val(ad._id);
        $('#formEditAd input[name=publisher]').val(sessionStorage.getItem("username"));
        $('#formEditAd input[name=title]').val(ad.title);
        $('#formEditAd textarea[name=description]').val(ad.description);
        $('#formEditAd input[type="date"]').val(ad.dateOfPublishing);
        $('#formEditAd input[type="number"]').val(ad.price);
        $('#formEditAd input[name=image]').val(ad.image);
        showView('viewEditAd');
    }

}
