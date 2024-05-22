import {IMaterial} from "./IMaterial";

export interface IExam {
    id:number,
    subject:string,
    date:Date,
    difficulty_rating:number,
    type:string,
    materials:IMaterial[]
}
