import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

export class IConfigSocketService {
  module: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket | undefined = undefined;

  constructor(private readonly config: IConfigSocketService) {}

  connect() {
    if (this.socket) return;
    this.socket = io(environment.socketAddress, {
      transports: ['websocket'],
      path: `/socket/${this.config.module}`,
      auth: {
        token: localStorage.getItem('primev_token'),
      },
    }) as any;
    this.socket?.on('connect', () => {
      console.log('Socket connect success!');
    });
    this.socket?.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  fromEvent<T>(eventName: string): Observable<T> {
    return new Observable((observer) => {
      this.socket?.on(eventName, (res: any) => {
        observer.next(res);
      });
    });
  }

  offEvent(evenName: string) {
    this.socket?.off(evenName);
  }
}

@Injectable({providedIn: 'root'})
export class ExperimentSocket extends SocketService {
  constructor() {
    super({
      module: 'chat',
    });
  }
}
