import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: false
})
export class DateAgoPipe implements PipeTransform {
  

  transform(value: any): any {
    if (value) {

      const dateNow = new Date();
      let currentTimeServer = new Date(dateNow.getUTCFullYear(),
                                      dateNow.getUTCMonth(),
                                      dateNow.getUTCDate(),
                                      dateNow.getUTCHours(),
                                      dateNow.getUTCMinutes(),
                                      dateNow.getUTCSeconds()
                                      );

        const seconds = Math.floor((+currentTimeServer - +new Date(value)) / 1000);
        if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
            return 'Agora';
        const intervals = {
            'ano': 31536000,
            'mes': 2592000,
            'semana': 604800,
            'dia': 86400,
            'hora': 3600,
            'minuto': 60,
            'segundo': 1
        };
        let counter;
        for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0)
                if (counter === 1) {
                    return counter + ' ' + i; // singular (1 day ago)
                } else {
                    return counter + ' ' + i + 's'; // plural (2 days ago)
                }
        }
    }
    return value;
  }
}
