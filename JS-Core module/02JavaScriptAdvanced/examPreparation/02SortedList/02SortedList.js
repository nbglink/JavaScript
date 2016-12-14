let SortedList = require('./skeleton').SortedList;
let expect = require('chai').expect;

describe ("SortedList", function () {
    let myList = {};

    beforeEach(function () {
        myList = new SortedList();
    });

    it("should have a constructor", function () {
        expect (typeof SortedList).to.equal('function');
        expect (SortedList.prototype.hasOwnProperty('add')).to.equal(true , "Didn't find add function.");
        expect (SortedList.prototype.hasOwnProperty('remove')).to.equal(true , "Didn't find remove function.");
        expect (SortedList.prototype.hasOwnProperty('get')).to.equal(true , "Didn't find get function.");
        expect (SortedList.prototype.hasOwnProperty('size')).to.equal(true , "Didn't find size function.");

    });

    it("shoud have size property", function () {
        expect(myList.size).to.equal(0);
    });

    it ("should have working add", function (){
        myList.add(5);
        expect(myList.size).to.equal(1);
    });

    it ("should have working add and get", function (){
        myList.add(4);
        expect(myList.get(0)).to.equal(4);
    });

    it ("should be sorted", function (){
        myList.add(4);
        myList.add(3);
        myList.add(10);
        myList.add(1);
        expect(myList.get(0)).to.equal(1);
        expect(myList.get(1)).to.equal(3);
        expect(myList.get(2)).to.equal(4);
        expect(myList.get(3)).to.equal(10);
        expect(myList.size).to.equal(4);
    });

    it ("should have working remove and get", function (){
        myList.add(4);
        myList.add(3);
        myList.add(10);
        myList.add(1);
        myList.remove(1);
        expect(myList.get(0)).to.equal(1);
        expect(myList.get(1)).to.equal(4);
        expect(myList.get(2)).to.equal(10);
        expect(myList.size).to.equal(3);
    });

    it ("should not work with negative index", function (){
        myList.add(4);
        myList.add(3);
        myList.add(10);
        myList.add(1);
        expect(() => myList.get(-1)).to.throw(Error);
        expect(() => myList.remove(-1)).to.throw(Error);
    });

    it ("should not work with outside index", function (){
        myList.add(4);
        myList.add(3);
        myList.add(10);
        myList.add(1);
        expect(() => myList.get(4)).to.throw(Error);
        expect(() => myList.remove(4)).to.throw(Error);
    });

    it ("should not work with empty collection", function (){
        expect(() => myList.get(0)).to.throw(Error);
        expect(() => myList.remove(0)).to.throw(Error);
    });


});