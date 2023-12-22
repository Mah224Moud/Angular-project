import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

/**
 * This method is triggered when the mouse enters the element. 
 * It removes the 'border-danger' class and adds the 'bg-warning' and 'border-primary' classes to the element. 
 * It also changes the color of any button within the element from 'btn-outline-primary' to 'btn-outline-light'.
 */
@HostListener('mouseenter') onMouseEnter() {
  this.renderer.removeClass(this.el.nativeElement, 'border-danger');
  this.renderer.addClass(this.el.nativeElement, 'bg-warning');
  this.renderer.addClass(this.el.nativeElement, 'border-primary');
  this.changeLinkColor('btn-outline-primary', 'btn-outline-light');
}

  /**
   * This method is triggered when the mouse leaves the element. 
   * It removes the 'bg-warning' and 'border-primary' classes and adds the 'border-danger' class to the element. 
   * It also changes the color of any button within the element from 'btn-outline-light' to 'btn-outline-primary'.
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'bg-warning');
    this.renderer.removeClass(this.el.nativeElement, 'border-primary');
    this.renderer.addClass(this.el.nativeElement, 'border-danger');
    this.changeLinkColor('btn-outline-light', 'btn-outline-primary');
  }

  /**
   * This method changes the color of all 'a' elements within the host element.
   * It removes the class specified by 'oldColor' and adds the class specified by 'newColor'.
   *
   * @param oldColor - The CSS class to remove from the 'a' elements.
   * @param newColor - The CSS class to add to the 'a' elements.
   */
  private changeLinkColor(oldColor: string, newColor: string) {
      const links = this.el.nativeElement.querySelectorAll('a');
      links.forEach((link: Element) => {
        this.renderer.removeClass(link, oldColor);
        this.renderer.addClass(link, newColor);
      });
  }
}