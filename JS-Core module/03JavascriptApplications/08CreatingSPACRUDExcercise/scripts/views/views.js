function showHideMenuLinks() {
    $("#menu a").hide();
    if (sessionStorage.getItem("authToken")) {
        //Logged in user
        $("#linkHome").show();
        $("#linkListAds").show();
        $("#linkCreateAd").show();
        $("#linkLogout").show();
    }
    else {
        // No logged user
        $("#linkHome").show();
        $("#linkLogin").show();
        $("#linkRegister").show();
    }
}

//Implementing the views
function showView(viewName) {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
}

//Show View functions
function showHomeView() {
    showView("viewHome");
}

function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
}

function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('viewRegister');
}


function showCreateAdsView() {
    $('#formCreateAd').trigger('reset');
    showView('viewCreateAd');
}
