import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commentDate' })
export class CommentDatePipe implements PipeTransform {
    transform(value: Date): string {
        // return Math.pow(value, exponent);
        // if(value.getSeconds());
        let current = new Date();
        if (value.getFullYear() === current.getFullYear() && value.getMonth() === current.getMonth()
            && value.getDay() === current.getDay()) {
            if (value.getHours() === current.getHours()) {
                if (value.getMinutes() === current.getMinutes()) {
                    return `${current.getSeconds() - value.getSeconds()} Seconds Ago`
                }
                else {
                    return `${current.getMinutes() - value.getMinutes()} Minutes Ago`
                }
            }
            else {
                return `${current.getHours() - value.getHours()} Hours Ago`
            }
        }

        return `${value.getDay()}/${value.getMonth()}/${value.getFullYear()}`

    }
}