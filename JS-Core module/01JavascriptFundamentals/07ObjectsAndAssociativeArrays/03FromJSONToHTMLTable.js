function JSONToHTMLTable([json]) {
    let html = "<table>\n";
    let arr = JSON.parse(json);

    html += "   <tr>";
    for (let key of Object.keys(arr[0])) {
        html += `<th>${htmlEscape(key)}</th>`;
    }
    html += "</tr>\n";

    for (let obj of arr) {
        html += "   <tr>";
        for (let values in obj) {
            html += `<td>${htmlEscape(obj[values].toString())}</td>`
        }
        html += "</tr>\n";
    }

    return html + "</table>";


    function htmlEscape(text) {
        let map = {'"': '&quot;', '&': '&amp;', "'": '&#39;', '<': '&lt;', '>': '&gt;'};
        return text.replace(/[\"&'<>"]/g, ch => map[ch]);
    }


}

console.log(JSONToHTMLTable(['[{"X":5,"Y":7},{"X":2,"Y":4}]']));
console.log(JSONToHTMLTable(['[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]']));

