import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
  exportAs:'athul'
})
export class AppDropdownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false
  @HostListener('click') setOpen(){
    this.isOpen = !this.isOpen
  }

}
