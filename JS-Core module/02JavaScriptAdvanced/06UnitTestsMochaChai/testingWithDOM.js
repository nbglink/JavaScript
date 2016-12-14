let expect =  require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');


document.body.innerHTML = `<div id="wrapper">
<input type="text" id="name">
<input type="text" id="income">
<div>`;

describe('DOM testing', function () {
    it('test that DOM elements exist', function () {
        let nameTextbox = $('#name');
        nameTextbox.val("Pesho")
        expect(nameTextbox.val()).to.equal('Pesho');
    });
});
