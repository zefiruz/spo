

class Room{
    constructor(id, title, description, type, cost, badForRoom, guestForRoom, params){
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.badForRoom = badForRoom;
        this.guestForRoom = guestForRoom;
        this.params = params;
 }
}

export default Room;