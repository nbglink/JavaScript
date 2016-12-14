import $ from 'jquery';

let KinveyRequester = (function() {
 const base_url = "https://baas.kinvey.com/";
 const app_id = "kid_ByeagnCH";
 const app_secret = "1e61d7e53e714c86a18aa1f3b8c55ecd";
 const appAuthHeaders = {
     Authorization: "Basic " + btoa(app_id + ':' + app_secret)
 };




 function loginUser(username, password) {
     return $.ajax({
         method: 'POST',
         url: base_url + "user/" + app_id + "/login",
         headers: appAuthHeaders,
         data: {username, password}

     });
 }

    function registerUser(username, password) {
        return $.ajax({
            method: 'POST',
            url: base_url + "user/" + app_id,
            headers: appAuthHeaders,
            data: JSON.stringify({username, password}),
            contentType: "Application/JSON"

        });
    }

    function loadBooks() {
        return $.ajax({
            method: 'GET',
            url: base_url + "appdata/" + app_id  + "/books/",
            headers: getUserAuthHeaders(),
            contentType: "Application/JSON"
        });
    }

    function findBookById(bookId) {
        return $.ajax({
            method: "GET",
            url: base_url + "appdata/" + app_id + "/books/" + bookId,
            headers: getUserAuthHeaders()
        });
    }

    function createBook(title, author, description) {
        return $.ajax({
            method: 'POST',
            url: base_url + "appdata/" + app_id  + "/books/",
            headers: getUserAuthHeaders(),
            data: {title, author, description}
        });
    }

    function editBook(bookId, title, author, description) {
        return $.ajax({
            method: 'PUT',
            url: base_url + "appdata/" + app_id  + "/books/" + bookId,
            headers: getUserAuthHeaders(),
            data: {title, author, description}
        });
    }

   function getUserAuthHeaders() {
        return{
            Authorization: "Kinvey " + sessionStorage.getItem("authToken")
        }
   }
 return {
     loginUser,
     registerUser,
     loadBooks,
     createBook,
     findBookById,
     editBook
 }

})();

export default KinveyRequester;