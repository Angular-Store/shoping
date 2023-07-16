import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToUserEdit() {
    this.router.navigate(['admin/user']);
  }

  navigateToInventoryEdit() {
    this.router.navigate(['admin/inventory']);
  }

  navigateToInventorySelected(id: number) {
    this.router.navigate(['admin/inventory', id]);
  }

}
