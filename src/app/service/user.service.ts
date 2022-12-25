import { Injectable } from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth"
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map,Observable, SubscriptionLike } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  isLoggedIn = false;
  subscription1: SubscriptionLike | undefined;
  ItemCollectiom: AngularFirestoreCollection<any>;
  Item: Observable<any[]>;
  checked_user = false;
  arrproduct:any[];
  id_user : any;
  data_new :  any = {
  category : ["Áo","Quần","Điện thoại"],
  product : []
}
subscription: SubscriptionLike | undefined;
  constructor(private firebaseAuth: AngularFireAuth,public db:AngularFirestore) {
    this.ItemCollectiom = this.db.collection('product');
    this.Item = this.ItemCollectiom.snapshotChanges().pipe(map((actions:any[]) => actions.map(a => {
    const data = a.payload.doc.data(); //lấy data
    const id = a.payload.doc.id; //lấy id
    return { id, ...data };
  }
  )))
  this.arrproduct = [];

}
async signin(email:string,password:string)
{
  await this.firebaseAuth.signInWithEmailAndPassword(email,password)
  .then(res=>
    {this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user?.uid));


    })
    .catch(err=>{this.isLoggedIn = false;})
}
async signup(email:string,password:string)
{
  await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
  .then(res=>
    {
      this.isLoggedIn = true;
      localStorage.setItem("user",JSON.stringify(res.user?.uid));
      this.id_user = res.user?.uid;
      console.log(this.id_user);
      this.checkedUser(this.id_user);
})
}



checkedUser(id:any)
{
  this.subscription =  this.getItem().subscribe((item:any) =>
  {
    this.arrproduct = item;
    this.arrproduct.forEach(item =>
      {
        if(item.id == id)
          this.checked_user = !this.checked_user;
      }
      )
      if(!this.checked_user)
      {
        console.log(123)
        this.createUser(id,this.data_new);
      }
      else
      {
        return;
      }
}
);
}
ngOnDestroy() {
  // unsubscribe
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
logout()
{
  this.firebaseAuth.signOut();
  localStorage.removeItem("user");
}
getItem() {
  return this.Item;
}
getItemType(data:string) {
  return new Promise<any>((resolve)=> {this.db.collection(data).valueChanges({ idField: 'id' }).subscribe((ss)=> resolve(ss));})
}

getItemUser(id:string) {
  return this.db.doc(id).valueChanges();
}
addProduct(id:any,data : any)
{
  this.ItemCollectiom.doc(id).update({product:data});
}

deleteItem(id:string,data:any)
{
  this.ItemCollectiom.doc(id).update({product:data});
}

createUser(id:string,data:any)
{
  this.ItemCollectiom.doc(id).set(data);
}
}

