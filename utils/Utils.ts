//class to containing basic util methods
export class Utils{
    static getRandomNumber(min:number, max:number): number  {
        return Math.floor(Math.random() * (max - min) + min);
    }
}