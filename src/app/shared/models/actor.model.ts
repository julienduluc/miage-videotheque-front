export class Actor {

    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;


    constructor(obj?: Actor) {
        if (obj) {
            this.cast_id = obj.cast_id;
            this.character = obj.character;
            this.credit_id = obj.credit_id;
            this.gender = obj.gender;
            this.id = obj.id;
            this.name = obj.name;
            this.order = obj.order;
            this.profile_path = obj.profile_path;
        }
    }
}