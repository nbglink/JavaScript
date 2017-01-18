// function formatDate(dateISO8601) {
//     let date = new Date(dateISO8601);
//     if (Number.isNaN(date.getDate()))
//         return '';
//     return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
//         "." + date.getFullYear() + ' ' + Number(date.getHours() -3)  + ':' +
//         padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());
//
//     function padZeros(num) {
//         return ('0' + num).slice(-2);
//     }
// }
//
//
// console.log(formatDate('2015-07-22T13:30:00.000Z'));


let moment = require('moment');

var now = moment('2015-07-22T13:30:00.000Z'); //todays date
var end = moment('2015-07-22T13:45:00.000Z'); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asMinutes();
console.log(days)
