

class Room{
    constructor(id, title, description, type, cost, bedsForRoom, guestForRoom, params){
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.bedsForRoom = bedsForRoom;
        this.guestForRoom = guestForRoom;
        this.params = params;
 }
}

export default Room;