import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Directive({
  selector: '[permissionsOnly]'
})

export class PermissionDirective implements OnInit {
  @Input() sherpaPermissionsOnly: Array<string>;

  constructor(
    private permissionService: NgxPermissionsService,
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {
  }

  ngOnInit() {
    let hasPermission = false;

    for (const permission of this.sherpaPermissionsOnly) {
      if (this.permissionService.getPermission(permission)) {
        hasPermission = true;
      }
    }

    if (!hasPermission) {
      this._renderer.addClass(this._el.nativeElement, 'disabled_permission');
    }
  }
}
