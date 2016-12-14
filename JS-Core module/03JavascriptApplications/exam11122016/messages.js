function startApp() {

    sessionStorage.clear(); // Clear user auth data

    showHideMenuLinks();

    showView('viewAppHome');

    // Bind the navigation menu links

    $("#linkMenuAppHome").click(showHomeView);

    $("#linkMenuLogin").click(showLoginView);
    $("#linkMenuRegister").click(showRegisterView);
    $("#linkMenuUserHome").click(showUserHomeView);
    $("#linkMenuMyMessages").click(showMyMessagesView);
    $("#linkMenuArchiveSent").click(showArchiveSentView);
    $("#linkMenuSendMessage").click(showSendMessageView);
    $("#linkMenuLogout").click(logoutUserEx);

    //Bind the user menu links
    $("#linkUserHomeMyMessages").click(showMyMessagesView);
    $("#linkUserHomeSendMessage").click(showSendMessageView);
    $("#linkUserHomeArchiveSent").click(showArchiveSentView);


    // Bind the form submit buttons
    $("#formLogin").submit(loginUserEx);
    $("#formRegister").submit(registerUser);
    $("#formSendMessage").submit(sendMessage);




    // Bind the info / error boxes: hide on click
    $("#infoBox, #errorBox").click(function () {
        $(this).fadeOut();
    });

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_BJ4cCdqmx";
    const kinveyAppSecret =
        "a09082591d0b4882b9b93229e5373701";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " +
        btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };



    function showHideMenuLinks() {
        $("#menu a").hide();
        if (sessionStorage.getItem("authToken")) {
            //Logged in user
            $("#linkMenuAppHome").show();
            $("#linkMenuMyMessages").show();
            $("#linkMenuArchiveSent").show();
            $("#linkMenuSendMessage").show();
            $("#linkMenuLogout").show();

        }
        else {

            // No logged user
            $("#linkMenuAppHome").show();
            $("#linkMenuLogin").show();
            $("#linkMenuRegister").show();



        }
    }


    function showHomeView() {
        if(sessionStorage.getItem("username")){
            showView('viewUserHome');
        }
        else{
            showView('viewAppHome');
        }


    }

    function showLoginView() {
        $('#formLogin').trigger('reset');
        showView('viewLogin');
    }


    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function showUserHomeView() {
        showView('viewUserHome');
    }

    function showMyMessagesView() {
        $('#myMessages').empty();
        showView('viewMyMessages');

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages?query={\"recipient_username\":\"" + sessionStorage.getItem("username") +"\"}",
            headers: getKinveyUserAuthHeaders(),
            success: loadMessagesSuccess,
            error: handleAjaxError
        });

        function loadMessagesSuccess(messages) {
            let table = $(`  
                <table>
                    <thead>
                        <tr>
                            <th>Form</th>
                            <th>Message</th>
                            <th>Date Received</th>
                        </tr>
                    </thead>
                </table>`);
            for (let message of messages) {
                let tr = $("<tr>");
                displayTableRow(tr, message);
                tr.appendTo(table);
            }



            function displayTableRow(tr, message) {
                tr.append(
                    $("<td>").text(message.sender_username),
                    $("<td>").text(message.text),
                    $("<td>").text(message._kmd.lmt)
                );
            }

            $("#myMessages").append(table);
        }
    }





    function showArchiveSentView() {
        $('#sentMessages').empty();
        showView('viewArchiveSent');

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages?query={\"recipient_username\":\"" + sessionStorage.getItem("username") +"\"}",
            headers: getKinveyUserAuthHeaders(),
            success: loadMessagesSuccess,
            error: handleAjaxError
        });

        function loadMessagesSuccess(messages) {
            let table = $(`  
                <table>
                    <thead>
                        <tr>
                            <th>To</th>
                            <th>Message</th>
                            <th>Date Sent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>`);
            for (let message of messages) {
                let tr = $("<tr>");
                displayTableRow(tr, message);
                tr.appendTo(table);
            }


            function displayTableRow(tr, message) {
                let deleteLink = $("<button>Delete</button>")
                    .click(function () {
                        deleteMessageById(message._id);
                    });

                tr.append(
                    $("<td>").text(message.recipient_username),
                    $("<td>").text(message.text),
                    $("<td>").text(message._kmd.lmt),
                    $("<td>").append(deleteLink)
                );
            }

            $("#sentMessages").append(table);
        }

        function deleteMessageById(messageId) {
            $.ajax({
                method: "DELETE",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages/" + messageId,
                headers: getKinveyUserAuthHeaders(),
                success: deleteMessageSuccess,
                error: handleAjaxError
            });
        }

        function deleteMessageSuccess() {
            showInfo("Message deleted");
            showView('viewArchiveSent');
        }
    }


    function showSendMessageView() {
        showView('viewSendMessage');
    }

    function registerUser(event) {

        event.preventDefault();
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=password]').val(),
            name: $('#formRegister input[name=name]').val()
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
            showView('viewUserHome');
            showInfo('User registration successful.');
        }

    }

    function saveAuthInSession(userInfo) {
        sessionStorage.setItem("username", userInfo.username);
        sessionStorage.setItem("authToken", userInfo._kmd.authtoken);
        sessionStorage.setItem("userId", userInfo._id);
        $("#spanMenuLoggedInUser").text("Welcome, " + userInfo.username);
        $("#viewUserHomeHeading").text("Welcome, " + userInfo.username);
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }


    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }


    function loginUserEx(event) {
        event.preventDefault();
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=password]').val()
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
            showView('viewUserHome');
            showInfo('Login successful.');
        }
    }


    function getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authToken")
        }
    }

    function logoutUserEx() {
            sessionStorage.clear();
            $('#spanMenuLoggedInUser').text("");
            showHideMenuLinks();
            showView('viewLogin');
            showInfo('Logout successful.');
    }



    function sendMessage() {

    }



}