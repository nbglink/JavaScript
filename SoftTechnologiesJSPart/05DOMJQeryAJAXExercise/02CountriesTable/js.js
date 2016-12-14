//add a country to the table function
function addCountryToTable(country, capital) {
    
    let row = $('<tr>')
        .append($("<td>").text(country))
        .append($("<td>").text(capital))
        .append($("<td>")
            .append($("<a href='#' onclick='moveRowUp(this)'>[Up]</a>"))
            .append(" ")
            .append($("<a href='#' onclick='moveRowDown(this)'>[Down]</a>"))
            .append(" ")
            .append($("<a href='#' onclick='deleteRow(this)'>[Delete]</a>"))
        );
    $("#countriesTable").append(row);
    return row;
}

// test
$(function() {
    addCountryToTable("Bulgaria", "Sofia")
    addCountryToTable("Germany", "Berlin")
    addCountryToTable("Russia", "Moscow")
    addCountryToTable("France", "Paris")
    addCountryToTable("India", "Delhi")
    fixRowLinks();
})

//adding a country in the table
function addCountry() {
    let country = $('#newCountryText').val();
    let capital = $('#newCapitalText').val();
    let row = addCountryToTable(country, capital);
    row.hide();
    row.fadeIn();
    $('#newCountryText').val("");
    $('#newCapitalText').val("");
    fixRowLinks();
}

//Delete row
function deleteRow(link) {
    let row = $(link).parent().parent();
    row.fadeOut(function() {
        row.remove();
        fixRowLinks();
    });

}

//move row up /down
function moveRowUp(link) {
    let row = $(link).parent().parent();
    row.fadeOut(function(){
        row.insertBefore(row.prev());
        row.fadeIn();
        fixRowLinks();
    });

}

function moveRowDown(link) {
    let row = $(link).parent().parent();
    row.fadeOut(function(){
        row.insertAfter(row.next());
        row.fadeIn();
        fixRowLinks();
    });

}

//hiding the [Up] and [Down] links when not needed.
function fixRowLinks() {
    //show all links in the table
    $('#countriesTable a').show();

    //Hide the [Up] link in the last table row
    let tableRows = $('#countriesTable tr');
    $(tableRows[1]).find("a:contains('Up')").hide();

    //Hide the [Down] link in the last table row
    $(tableRows[tableRows.length-1]).find("a:contains('Down')").hide();

}