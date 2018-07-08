import { Component, OnInit } from '@angular/core';
// import { ROUTES } from './sidebar-routes.config';
// import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from '@angular/router';
import { Broadcaster } from '../broadcaster';
declare var $: any;
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    // public menuItems: any[];
    userRole: string = null;
    isVendor: boolean;
    constructor(private router: Router,
        private route: ActivatedRoute, private broadcaster: Broadcaster) {
        this.userRole = localStorage.getItem('userrole');
        if (this.userRole === '2') {
            this.isVendor = true;
        }
    }
    ngOnInit() {
      $.getScript('./assets/app-assets/js/core/app-menu.js');

      // this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.initLeftSidebar();
    }
    toggleSideBarMenu () {
      if (window.innerWidth < 768) {
        console.log('test');
        this.broadcaster.broadcast('toggle_sidebar_menu');
      }
    }
    initLeftSidebar() {
      setTimeout(function() {
        console.log('-------Inside setTimeOut: ----------');
        // $.app.menu.toggle()
      }, 2000);
    }
    onClickMenuContent(e) {
      // setTimeout(function() {
      //   $.app.menu.collapse('hide');
      // }, 2000);
    }
}
