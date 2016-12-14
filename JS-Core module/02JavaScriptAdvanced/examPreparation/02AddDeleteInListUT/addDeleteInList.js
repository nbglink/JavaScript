let expect = require("chai").expect;

function produce(){
    let data = [];
    return {
        add: function(item) {
            data.push(item);
        },
        delete: function(index) {
            if (Number.isInteger(index) && index >= 0 && index < data.length) {
                return data.splice(index, 1)[0];
            } else {
                return undefined;
            }
        },
        toString: function() {
            return data.join(", ");
        }
    };
};

describe('list', function () {
    let list = {};
    beforeEach(function () {
        list = produce()
    });

    it('constructor should produce object with correct functions', function () {
        expect(typeof(list.add)).to.equal('function');
        expect(typeof(list.delete)).to.equal('function');
        expect(typeof(list.toString())).to.equal('string');
    });

    it('constructor should produce and empty list', function () {
        expect(list.toString()).to.equal('', 'To string did not produce expected result!')
    });

    describe("add", function () {
        it('should add correct value', function () {
            list.add(5);
            expect(list.toString()).to.equal('5', "Add did not add correct value")
        });

        it('should add correct amount of times', function () {
            list.add('Pesho');
            expect(list.toString()).to.equal('Pesho', "Add did not add correct value")
        });

        it('should add to the end of the list', function () {
            list.add('Pesho');
            list.add('Stamat');
            list.add('Gosho');
            expect(list.toString()).to.equal('Pesho, Stamat, Gosho', "Add did not add correct value")
        });
    })

    describe("delete", function () {
        it('with string should return undefined', function () {
            expect(list.delete('Pesho')).to.equal(undefined, "Delete did not return correct value")
        });

        it('with floating point number should not delete any elements', function () {
            expect(list.delete(3.14)).to.equal(undefined, "Delete did not return correct value")
        });

        it('with floating point number should not delete any elements', function () {
            list.add(15);
            list.delete(3.14);
            expect(list.toString()).to.equal("15", "Delete deleted an existing value")
        });

        it('with 0 and no items list, should not delete anything', function () {
            expect( list.delete(0)).to.equal(undefined, "Delete deleted an existing value")
            expect(list.toString()).to.equal("", "Delete deleted an existing value")
        });

        it('with index equal to the length of the list should not delete anything', function () {
            list.add(5);
            list.add("two")
            expect( list.delete(2)).to.equal(undefined, "Delete deleted an existing value")
            expect(list.toString()).to.equal("5", "two", "Delete deleted an existing value")
        });
//nedovyrshena
    })
});
