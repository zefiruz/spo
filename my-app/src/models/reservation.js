

class Reservation{
    constructor(id, title, description, type, cost, count, badForRoom, guestForRoom, params, bookedDates){
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.count = count;
        this.badForRoom = badForRoom;
        this.guestForRoom = guestForRoom;
        this.params = params;
        this.bookedDates = bookedDates;    }
}

export default Reservation;