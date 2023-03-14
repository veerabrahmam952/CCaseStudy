import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ItemCartCountService {
    private itemCartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public itemsCart$ = this.itemCartCountSubject.asObservable();
    public updateItemCartCont(value: number): void {
        this.itemCartCountSubject.next(value);
    }
}