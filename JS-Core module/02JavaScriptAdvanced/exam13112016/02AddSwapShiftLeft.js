let expect =  require('chai').expect;

function createList() {
    let data = [];
    return {
        add: function (item) {
            data.push(item)
        },
        shiftLeft: function () {
            if (data.length > 1) {
                let first = data.shift();
                data.push(first);
            }
        },
        shiftRight: function () {
            if (data.length > 1) {
                let last = data.pop();
                data.unshift(last);
            }
        },
        swap: function (index1, index2) {
            if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
                !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
                index1 === index2) {
                return false;
            }
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            return true;
        },
        toString: function () {
            return data.join(", ");
        }
    };
}



describe('list', function () {
    let list = {};
    beforeEach(function () {
        list = createList();
    });

    describe('add', function () {

        it('add one item', function () {
            list.add(1);
            expect(list.toString()).to.equal("1");
        });
        it('add 3 items', function () {
            list.add(1);
            list.add("two");
            list.add(3);
            expect(list.toString()).to.equal("1, two, 3");
        });

        it('add empty string', function () {
            list.add("");

            expect(list.toString()).to.equal("");
        });

        it('add null', function () {
            list.add(null);

            expect(list.toString()).to.equal("");
        });

        it('empty list', function () {
            expect(list.toString()).to.equal("");
        });
    });

    describe('shiftLeft', function () {

        it('shifted', function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.shiftLeft();
            expect(list.toString()).to.equal("two, 3, 1");
        });

        it('shifted and add four to end', function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.shiftLeft();
            expect(list.toString()).to.equal("two, 3, 1");
            list.add("four");
            expect(list.toString()).to.equal("two, 3, 1, four")
        });

    });

    describe('shiftRight', function () {


        it('shifted Right', function () {
            list.add("two");
            list.add(3);
            list.add(1);
            list.add("four");
            list.shiftRight();
            expect(list.toString()).to.equal("four, two, 3, 1")
        });

    });

    describe('swap', function () {


        it('swap 0 and 3 expected true', function () {
            list.add("four");
            list.add("two");
            list.add(3);
            list.add(1);

            expect(list.swap(0,3)).to.equal(true)
        });

        it('swap 0 and 3 printed', function () {
            list.add("four");
            list.add("two");
            list.add(3);
            list.add(1);
            list.swap(0,3);
            expect(list.toString()).to.equal("1, two, 3, four");
        });

        it('swap 1 and 1 expected false', function () {
            list.add("four");
            list.add("two");
            list.add(3);
            list.add(1);

            expect(list.swap(1,1)).to.equal(false)
        });

        it('swap 1 and 1 printed', function () {
            list.add(1);
            list.add("two");
            list.add(3);
            list.add("four");

            list.swap(1,1);
            expect(list.toString()).to.equal("1, two, 3, four");
        });


        it('swap 0 and 1 false', function () {
            list.add(1);
            list.swap(0,1);
            expect(list.swap(0,1)).to.equal(false);
        });

        it('swap 0 and 1 printed', function () {
            list.add(1);
            list.swap(0,1);
            expect(list.toString()).to.equal("1");
        });

        it('index1 < 0 expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(-1,1)).to.equal(false)
        });

        it('index2 < 0 expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(1,-2)).to.equal(false)
        });

        it('index2 > list.length expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(1,3)).to.equal(false)
        });

        it('index1 > list.length expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(5,1)).to.equal(false)
        });

        it('index1 = list.length expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(list.length,1)).to.equal(false)
        });

        it('index2 = list.length expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(1,list.length)).to.equal(false)
        });


        it('index1 > list.length expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(5,1)).to.equal(false)
        });

        it('index1 is not a number expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap("test",1)).to.equal(false)
        });

        it('index2 is not a number expected false', function () {
            list.add(1);
            list.add(2);
            expect(list.swap(1, "test")).to.equal(false)
        });

        it('swap 1 and 0 printed', function () {
            list.add(1);
            list.swap(1,0);
            expect(list.toString()).to.equal("1");
        });

        it('swap 1 and 0 expect false', function () {
            list.add(1);
            expect(list.swap(0,1)).to.equal(false);
        });

        it('swap 0 and 2 expect false', function () {
            list.add(1);
            expect(list.swap(0,1)).to.equal(false);
        });




        it('if index1 < 0', function () {
            expect(list.swap(0,1)).to.equal(false);
        });

        it('if index2 < 0', function () {
            expect(list.swap(1,0)).to.equal(false);
        });

        it('if index1 < 0', function () {
            expect(list.toString()).to.equal("");
        });




    });

    describe('toString', function () {


        it('empty list', function () {
            expect(list.toString()).to.equal("")
        });

    });



});
