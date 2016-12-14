function registerUser() {
    if ($('#formRegister input[name=username]').val() !== "" && $('#formRegister input[name=passwd]').val() !== "") {
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey,
            data: JSON.stringify(userData),
            contentType: "application/json",
            headers: kinveyAppAuthHeaders,
            success: registerUserSuccess,
            error: handleAjaxError
        });



        function registerUserSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('User registration successful.');
        }

    } else {
        showError("Please fill both fields: Username and Password")
    }
}


