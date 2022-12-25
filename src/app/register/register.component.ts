import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(private router: Router,public firebaseService: FireBaseService) { }
  ngOnInit() {}
  goLogin()
  {
    this.router.navigateByUrl("/login");
  }
  async onSignup(email:string,password:string)
  {
    await this.firebaseService.signup(email,password);
    if(this.firebaseService.isLoggedIn)
   {
    // this.firebaseService.createUser()
    this.router.navigateByUrl("/details");
   }
   else
   {
    console.log("ko thanh cong")
   }
  }
}
