import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from './breadcrumb.interface'


@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})


export class BreadcrumbComponent {

  breadcrumbItems: BreadcrumbItem[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.generateBreadcrumb();
    });
  }

  private generateBreadcrumb(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Home', url: '/' });
    this.generateBreadcrumbRecursively(this.activatedRoute.root, '', this.breadcrumbItems);
  }

  private generateBreadcrumbRecursively(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): void {
    const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }

    const label = route.snapshot.data['breadcrumbLabel'];
    if (label) {
      breadcrumbs.push({ label, url });
    }

    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      // Set breadcrumbItems property at the end of the recursion
      this.breadcrumbItems = breadcrumbs;
      return;
    }

    for (const child of children) {
      // Recursive call to handle nested routes
      this.generateBreadcrumbRecursively(child, url, breadcrumbs);
    }
  }

}
