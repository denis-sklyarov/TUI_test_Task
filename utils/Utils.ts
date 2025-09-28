//class to containing basic util methods
export class Utils{
    static getRandomNumber(min:number, max:number): any  {
        return Math.floor(Math.random() * (max - min) + min);
    }
}