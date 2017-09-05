import { Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') toggleMenu: boolean = false;

  @HostListener('click') onToggleMenu(eventData: Event) {
    this.toggleMenu = !this.toggleMenu;
  }
}
