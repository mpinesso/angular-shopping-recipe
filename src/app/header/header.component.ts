import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output('changePage') changePageEventEmitter = new EventEmitter<string>();

  onChangePage(page){
    this.changePageEventEmitter.emit(page);
  }
}
