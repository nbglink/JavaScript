//Adding a new item
function addItemToList (text){
    let li = $("<li>")
        .append($("<span>").text(text))
        .append(" ")
        .append($("<a href = '#' onclick='deleteItem(this)'>[Delete]</a>"));
    $("#items").append(li);
}

//Add some items in the list to test the above function.
$(function(){
    addItemToList("First")
    addItemToList("Second")
});

//On click on the delete link, delete its parent.
function deleteItem(link){
    $(link).parent().remove();
}

//create new item
function addItem(){
    let text = $('#newItemText').val();
    addItemToList(text);
    $('#newItemText').val("");
}


//make pressing [Enter] key in the text box to add new item without clicking on the [Add] button.
$(function(){

    $('#newItemText').keypress(function (e) {
        if (e.keyCode == 13) {
            console.log("natisna enter");
            $('#newItemText + input[type="button"]').click();
        }
    })


});





