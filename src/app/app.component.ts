import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) { }

  ngOnInit() {
  
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result: any) => {
          console.log(result,"kkkkkk");
          this.setLoginDisplay();
        },
        error: (error: any) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
