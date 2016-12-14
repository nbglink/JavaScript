function loginUser() {
    if ($('#formLogin input[name=username]').val() !== "" && $('#formLogin input[name=passwd]').val() !== "") {
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            data: JSON.stringify(userData),
            contentType: "application/json",
            headers: kinveyAppAuthHeaders,
            success: loginUserSuccess,
            error: handleAjaxError
        });

        function loginUserSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('Login successful.');
        }

    } else {
        showError("Please fill both fields: Username and Password")
    }

}


