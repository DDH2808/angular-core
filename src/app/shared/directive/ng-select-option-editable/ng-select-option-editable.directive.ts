import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ngSelectOptionEditFocused]',
})
export class NgSelectOptionEditableDirective implements OnInit {
  private option: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    console.log('zooo');
    if (!this.option) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.option) {
      this.hide();
    }
  }

  ngOnInit(): void {}

  show() {
    this.create();
    this.renderer.addClass(this.option, 'custom-options');
    this.renderer.addClass(this.option, 'custom-options-show');
  }

  hide() {
    this.renderer.removeClass(this.option, 'custom-options-show');
    this.renderer.removeClass(this.option, 'custom-options');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.option);
      this.option = null;
    }, 200);
  }

  create() {
    try {
      this.option = this.renderer.createElement('span');
      const icon = this.renderer.createElement('i');
      this.renderer.addClass(icon, 'fa-solid');
      this.renderer.addClass(icon, 'fa-ellipsis-vertical');
      this.renderer.appendChild(this.option, icon);
      this.renderer.appendChild(this.el.nativeElement, this.option);
    } catch (e) {
      console.log(e);
    }
  }
}
