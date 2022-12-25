import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth"
import { FireBaseService } from '../service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSignedIn = false;

  constructor(private router: Router,public firebaseService: FireBaseService) {

   }
  ngOnInit() {
    if(localStorage.getItem("user") !== null)
    {
      this.isSignedIn = true;
    }
    else
    {
      this.isSignedIn = false;
    }
  }
  // checkedUser(id:any)
  // {

  //   this.firebaseService.getItem().subscribe((item:any) =>
  //   {
  //     this.arrproduct.forEach(item =>
  //       {
  //         if(item.id == id)
  //           this.checked_user = !this.checked_user;
  //       }
  //       )
  //       if(this.checked_user)
  //       {
  //         this.firebaseService.createUser(id,this.data_new);
  //       }
  // }
  // );
  // }
  registerlink()
  {
    this.router.navigateByUrl('/register');
  }
  async onSignIn(email:string,password:string)
  {
   await this.firebaseService.signin(email,password);
   if(this.firebaseService.isLoggedIn)
   {
    this.isSignedIn=true;
    this.router.navigateByUrl("/details");
   }
   else
   {
    alert("Nhap khong dung tai khoan")
   }
  }

}
