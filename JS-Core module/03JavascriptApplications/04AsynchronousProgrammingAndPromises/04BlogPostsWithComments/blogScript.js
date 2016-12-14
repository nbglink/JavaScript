$(document).ready(function () {

    const kinveyAppId = "kid_rJRgxaQze";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppId;
    const kinveyUsername = "peter";
    const kinveyPassword = "p";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = { "Authorization": "Basic " + base64auth };



    $("#btnLoadPosts").click(loadPostsClicked);
    $("#btnViewPost").click(viewPostsClicked);

   function loadPostsClicked() {
       let getPostsRequest = {
           url: serviceUrl + "/posts",
           headers: authHeaders
       };
       $.ajax(getPostsRequest)
           .then(displayPostsInDropdown)
           .catch(displayError)
   }
   
   function displayPostsInDropdown(posts) {
       for (let post of posts){
           let option = $("<option>");
           option.text(post.title);
           option.val(post._id);
           $("#posts").append(option);
       }
   }

   function displayError(error) {
       let errorDiv = $("<div>").text("Error: " +
           error.status + ' (' + error.statusText + ')');
       $(document.body).prepend(errorDiv);
       setTimeout(function () {
           errorDiv.fadeOut(() => errorDiv.remove());
       }, 2000)
   }

    function viewPostsClicked(){
       let selectedPostId = $('#posts').val();
       let postRequest = $.ajax({
           url: serviceUrl + "/posts/" + selectedPostId,
           headers: authHeaders
       });




        let commentsRequest = $.ajax({
            url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}` ,
            headers: authHeaders
        });

        Promise.all([postRequest, commentsRequest])
            .then(displayPostWithCommnets)
            .catch (displayError());
        
    }
   
   function viewPostClicked() {
       $.ajax({
           url: serviceUrl + "/posts",
           headers:authHeaders
       })
           .then(displayPostsInDropdown)
           .catch(displayError)
   }
   function displayPostWithCommnets([post, comments]) {
       $("#post-title").text(post.title);
           $("#post-body").text(post.body);

           $("#post-comments").empty();
       for (let comment of comments){
           $("<li>").text(comment.text).appendTo($("#post-comments"))
       }
   }
});
