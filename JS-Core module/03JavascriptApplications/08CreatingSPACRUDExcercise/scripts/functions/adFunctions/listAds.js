function listAds() {
    $('#ads').empty();
    showView('viewAds');
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads",
        headers: getKinveyUserAuthHeaders(),
        success: loadAdsSuccess,
        error: handleAjaxError
    });
    function loadAdsSuccess(ads) {
        let table = $(`  
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Publisher</th>
                        <th>Date of publishing</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </table>`);
        for (let ad of ads) {
            let tr = $("<tr>");
            displayTableRow(tr, ad);
            tr.appendTo(table);
        }
        $("#ads").append(table);
    }

    function displayTableRow(tr, ad) {

        let detailLink = $("<a href='#'>[Read more]</a>")
            .click(function () {
                displayAd(ad._id);
            });

        let links = [];// добавяме detailLink съдържанието като първи елемент в масива, ако се влезе в
        // if-а значи потребителя има право да редактира и трие.

        links.push(detailLink);
        links.push(" ");
        if (ad._acl.creator == sessionStorage.getItem("userId")) { //връзва книгата с автора и и ако двете съвпадат вади delete и edit
            let deleteLink = $("<a href='#'>[Delete]</a>")
                .click(function () {
                    deleteAdById(ad._id);
                });
            let editLink = $("<a href='#'>[Edit]</a>")
                .click(function () {
                    loadAdForEdit(ad._id);
                });
            links.push(deleteLink);
            links.push(" ");
            links.push(editLink);
        }

        tr.append(
            $("<td>").text(ad.title),
            $("<td>").text(ad.description),
            $("<td>").text(ad.publisher),
            $("<td>").text(ad.dateOfPublishing),
            $("<td>").text(ad.price),
            $("<td>").append(links)
        );
    }

    function deleteAdById(adId) {
        $.ajax({
            method: "DELETE",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads/" + adId,
            headers: getKinveyUserAuthHeaders(),
            success: deleteAdsSuccess,
            error: handleAjaxError
        });

        function deleteAdsSuccess() {
            showInfo("Book deleted");
            listAds();
        }
    }

}
