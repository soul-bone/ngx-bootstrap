import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DraggableItem } from './draggable-item';

@Injectable()
export class DraggableItemService {
    private draggableItem: DraggableItem;

    private onCapture: Subject<DraggableItem> = new Subject<DraggableItem>();

    public dragStart(item: DraggableItem): void {
        this.draggableItem = item;
    }

    public getItem(): DraggableItem {
        return this.draggableItem;
    }

    public captureItem(overZoneIndex: number, newIndex: number): DraggableItem {
        if (this.draggableItem.overZoneIndex !== overZoneIndex) {
            this.draggableItem.lastZoneIndex = this.draggableItem.overZoneIndex;
            this.draggableItem.overZoneIndex = overZoneIndex;
            this.onCapture.next(this.draggableItem);
            this.draggableItem = Object.assign(
                {},
                this.draggableItem,
                { overZoneIndex, i: newIndex }
            );
        }
        return this.draggableItem;
    }

    public onCaptureItem(): Observable<DraggableItem> {
        return this.onCapture;
    }
}
