import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.removeClass(this.el.nativeElement, 'border-danger');
    this.renderer.addClass(this.el.nativeElement, 'bg-warning');
    this.renderer.addClass(this.el.nativeElement, 'border-primary');
    this.changeLinkColor('btn-outline-primary', 'btn-outline-light');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'bg-warning');
    this.renderer.removeClass(this.el.nativeElement, 'border-primary');
    this.renderer.addClass(this.el.nativeElement, 'border-danger');
    this.changeLinkColor('btn-outline-light', 'btn-outline-primary');
  }

  private changeLinkColor(oldColor: string, newColor: string) {
    const links = this.el.nativeElement.querySelectorAll('a');
    links.forEach((link: Element) => {
      this.renderer.removeClass(link, oldColor);
      this.renderer.addClass(link, newColor);
    });
  }
}