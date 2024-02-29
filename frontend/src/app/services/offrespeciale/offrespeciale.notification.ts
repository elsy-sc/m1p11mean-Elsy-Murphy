import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Offrespeciale } from '../../models/offrespeciale.model';
import { io } from 'socket.io-client';
import { BASE_URL_NO_APP_NAME } from '../../utils/constante.util';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: any;
    private subject = new Subject<any>();

    public connect(): void {
        this.socket = io(BASE_URL_NO_APP_NAME);
        this.socket.on('nouvelle-offre-speciale', (data: Offrespeciale) => {
            this.subject.next(data);
        });
    }

    public getNotification(): Observable<any> {
        return this.subject.asObservable();
    }
}
