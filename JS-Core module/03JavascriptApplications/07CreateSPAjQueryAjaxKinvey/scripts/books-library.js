function startApp() {
    sessionStorage.clear(); // Clear user auth data


    showHideMenuLinks();


    showView('viewHome');

    // Bind the navigation menu links
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListBooks").click(listBooks);
    $("#linkCreateBook").click(showCreateBookView);
    $("#linkLogout").click(logoutUser);


    // Bind the form submit buttons
    $("#buttonLoginUser").click(loginUser);
    $("#buttonRegisterUser").click(registerUser);
    $("#buttonCreateBook").click(createBook);
    $("#buttonEditBook").click(editBook);

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

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_ryIMCovMx";
    const kinveyAppSecret =
        "6bf1b8e961874d48ae5d9f833664208b";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " +
        btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };


    function showHideMenuLinks() {
        $("#menu a").hide();
        if (sessionStorage.getItem("authToken")) {
            //Logged in user
            $("#linkHome").show();
            $("#linkListBooks").show();
            $("#linkCreateBook").show();
            $("#linkLogout").show();
        }
        else {
            // No logged user
            $("#linkHome").show();
            $("#linkLogin").show();
            $("#linkRegister").show();
        }
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }


    function showHomeView() {
        showView("viewHome");
    }

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
                listBooks();
                showInfo('Login successful.');
            }

        } else {
            showError("Please fill both fields: Username and Password")
        }

    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }


    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }


    function getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authToken")
        }
    }

    function listBooks() {
        $('#books').empty();
        showView('viewBooks');
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
            headers: getKinveyUserAuthHeaders(),
            success: loadBooksSuccess,
            error: handleAjaxError
        });
        function loadBooksSuccess(books) {
            let table = $(`  
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </table>`);
            for (let book of books) {
                let tr = $("<tr>");
                displayTableRow(tr, book);
                tr.appendTo(table);
            }
            $("#books").append(table);
        }

        function displayTableRow(tr, book) {
            let links = [];
            if (book._acl.creator == sessionStorage.getItem("userId")) { //връзва книгата с автора и и ако двете съвпадат вади delete и edit
                let deleteLink = $("<a href='#'>[Delete]</a>")
                    .click(function () {
                        deleteBookById(book._id);
                    });
                let editLink = $("<a href='#'>[Edit]</a>")
                    .click(function () {
                        loadBookForEdit(book._id);
                    });
                links.push(deleteLink);
                links.push(" ");
                links.push(editLink);
            }
            tr.append(
                $("<td>").text(book.title),
                $("<td>").text(book.author),
                $("<td>").text(book.description),
                $("<td>").append(links)
            );
        }

        function deleteBookById(bookId) {
            $.ajax({
                method: "DELETE",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books/" + bookId,
                headers: getKinveyUserAuthHeaders(),
                success: deleteBooksSuccess,
                error: handleAjaxError
            });

            function deleteBooksSuccess() {
                showInfo("Book deleted");
                listBooks();
            }
        }

    }

    function showCreateBookView() {
        $('#formCreateBook').trigger('reset');
        showView('viewCreateBook');
    }


    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text("");
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }

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
                listBooks();
                showInfo('User registration successful.');
            }

        } else {
            showError("Please fill both fields: Username and Password")
        }

    }

    function saveAuthInSession(userInfo) {
        sessionStorage.setItem("username", userInfo.username);
        sessionStorage.setItem("authToken", userInfo._kmd.authtoken);
        sessionStorage.setItem("userId", userInfo._id); //запазва userId в sessionStorage
        $("#loggedInUser").text("Welcome, " + userInfo.username);
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


    function createBook() {
        if ($('#formCreateBook input[name=title]').val() !== "" && $('#formCreateBook input[name=author]').val() !== "") {
            let bookData = {
                title: $('#formCreateBook input[name=title]').val(),
                author: $('#formCreateBook input[name=author]').val(),
                description: $('#formCreateBook textarea[name=descr]').val()
            };

            $.ajax({
                method: "POST",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books",
                headers: getKinveyUserAuthHeaders(),
                data: bookData,
                success: createBooksSuccess,
                error: handleAjaxError
            });

            function createBooksSuccess() {
                showInfo("Book created.");
                listBooks();
            }
        } else {
            showError("Title and description fields are required")
        }

    }

    function editBook() {

            let bookData = {
                title: $('#formEditBook input[name=title]').val(),
                author: $('#formEditBook input[name=author]').val(),
                description: $('#formEditBook textarea[name=descr]').val()
            };

            $.ajax({
                method: "PUT",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/books/" +
                    $('#formEditBook textarea[name=id]').val() ,
                headers: getKinveyUserAuthHeaders(),
                data: bookData,
                success: createBooksSuccess,
                error: handleAjaxError
            });

            function createBooksSuccess() {
                showInfo("Book created.");
                listBooks();
            }



    }

    function loadBookForEdit(bookId) {
        $.ajax({
            method: "GET",
            url: kinveyBookUrl = kinveyBaseUrl + "appdata/" +
                kinveyAppKey + "/books/" + bookId,
            headers: getKinveyUserAuthHeaders(),
            success: loadBookForEditSuccess,
            error: handleAjaxError
        });

        function loadBookForEditSuccess(book) {
            $('#formEditBook input[name=id]').val(book._id);
            $('#formEditBook input[name=title]').val(book.title);
            $('#formEditBook input[name=author]')
                .val(book.author);
            $('#formEditBook textarea[name=descr]')
                .val(book.description);
            showView('viewEditBook');

        }

    }
}





