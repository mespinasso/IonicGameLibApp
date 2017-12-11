export class GameModel {
    constructor(
        public id: number,
        public name: string,
        public summary: string,
        public rating: number,
        public first_release_date: number
    ) {}
}