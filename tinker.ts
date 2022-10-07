import { Observable } from 'rxjs';

const a$ = Observable.create((observer) => observer.next(122));

a$.subscribe((e) => console.log({ e }));
