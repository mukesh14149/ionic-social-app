import { Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the ItemcardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'itemcard',
  templateUrl: 'itemcard.html'
})
export class ItemcardComponent {

  @Input('itemname') itemname
  @Input('index') index
  @Input('flag') flag=false;

  token = false;
  @Output() callfunction = new EventEmitter();
  constructor() {
    console.log('Hello ItemcardComponent Component');
  }


  click(){
    this.callfunction.emit(this.index);
  }
}
