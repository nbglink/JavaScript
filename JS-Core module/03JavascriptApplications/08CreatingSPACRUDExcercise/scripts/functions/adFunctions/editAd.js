function editAd() {

    let bookData = {
        title: $('#formEditAd  input[name=title]').val(),
        description: $('#formEditAd  textarea[name=description]').val(),
        publisher: sessionStorage.getItem("username"),
        dateOfPublishing: $('#formEditAd  input[type="date"]').val(),
        price: Number($('#formEditAd  input[type="number"]').val()),
        image: $('#formEditAd input[name="image"]').val()
    };

    $.ajax({
        method: "PUT",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads/" +
        $('#formEditAd input[name=id]').val() ,
        headers: getKinveyUserAuthHeaders(),
        data: bookData,
        success: createBooksSuccess,
        error: handleAjaxError
    });

    function createBooksSuccess() {
        showInfo("Ad Edited.");
        listAds();
    }

}
