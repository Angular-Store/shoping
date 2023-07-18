import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}
  link: string = 'https://shoping-m8nqguz79-iparadise.vercel.app/';

  copyToClipboard(link: string): void {
    this.clipboard.copy(link);
    this.showNotification('Link copied to clipboard!');
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  ngOnInit(): void {}
}
