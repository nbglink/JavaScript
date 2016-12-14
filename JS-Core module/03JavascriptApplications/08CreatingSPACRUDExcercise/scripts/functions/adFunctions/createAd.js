function createAd() {
    if ($('#formCreateAd input[name=title]').val() !== "" && $('#formCreateAd  textarea[name=description]').val() !== "") {
        let adData = {
            title: $('#formCreateAd  input[name=title]').val(),
            description: $('#formCreateAd  textarea[name=description]').val(),
            publisher: sessionStorage.getItem("username"),
            dateOfPublishing: $('#formCreateAd  input[type="date"]').val(),
            price: Number($('#formCreateAd  input[type="number"]').val()),
            image: $('#formCreateAd  input[name="image"]').val()

        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads",
            headers: getKinveyUserAuthHeaders(),
            data: adData,
            success: createAdsSuccess,
            error: handleAjaxError
        });

        function createAdsSuccess() {
            showInfo("Ad created.");
            listAds();
        }
    } else {
        showError("Title and Description fields are required ")
    }

}