export class User{
    constructor(
        public email: string,
        public username: string,
        public year: number,
        public _id?: string,
        public password?: string,
        public country?: string,
        public city?: string,
        public jobs?: string,
        public position?: string
        ) { }
}