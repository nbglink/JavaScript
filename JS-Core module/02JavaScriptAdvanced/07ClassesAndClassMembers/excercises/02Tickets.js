function result(input, sortby) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = +price;// +пред стринг число го обръща в число както е например Number(стринг число)
            this.status = status
        }


    }

    let ticket = [];

    for (let line of input) {

        let dbArr = line.split('|');
        let destination = dbArr[0];
        let price = dbArr[1];
        let status = dbArr[2];


        ticket.push(new Ticket(destination, price, status));

    }


    if (sortby == "destination") {

        ticket.sort((a, b) => {
            if (a.destination > b.destination) {
                return 1;
            }
            if (a.destination < b.destination) {
                return -1;
            }
            return 0;
        });
    }

    if (sortby == "status") {

        ticket.sort((a, b) => {
            if (a.status > b.status) {
                return 1;
            }
            if (a.status < b.status) {
                return -1;
            }
            return 0;
        });
    }

    if (sortby == "price") {

        ticket.sort((a, b) => {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }

            return 0;
        });
    }



    return ticket;

}

let ResultArray = result(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination');

console.log(ResultArray);
