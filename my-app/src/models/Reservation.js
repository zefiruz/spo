
export class Reservation{
    constructor(id, userId, startDate, endDate, roomId){
            this.id = id;
            this.userId = userId;
            this.startDate = startDate;
            this.endDate = endDate;
            this.roomId = roomId;
            this.status = 'pending'
    }
}