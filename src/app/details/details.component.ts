import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subject, SubscriptionLike } from 'rxjs';
import { FireBaseService } from '../service/user.service';
import { Storage,ref,uploadBytesResumable,getDownloadURL, deleteObject } from "@angular/fire/storage";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
@Output() isLogout = new EventEmitter<void>();
currentPage =1 ;
perPage = 4;
start = (this.currentPage -1)*this.perPage;
end = this.currentPage * this.perPage;
tab=0;
add=0;
id_user = '';
productAll: any[] ;
arrproduct:any[];
user:any;
event : any = {};
file : any = {};
UrlFileImg:any;
qtyProduct=0;
id_delete = 0;
category = [];
product :any[];
subscription: SubscriptionLike | undefined;
type = "Tất cả";
// Tạo 1 object để chứa các thông tin sản phẩm thêm
product_add : any = {
  name:"",
  price:"",
  phanloai:false,
  price_nhap:"",
  price_buon_si:"",
  soluongmax:"",
  checked_1:false,
  checked_2:false,
  checked_3:false,
  thuonghieu:"",
  danhmuc:"",
  barcode:"",
  iduser:"",
  donvi:"",
  file:"",
}

// Tạo 1 object để chứa thông tin sản phẩm sẽ sửa
product_edit : any = {
  name:"",
  price:"",
  phanloai:false,
  price_nhap:"",
  price_buon_si:"",
  soluongmax:"",
  checked_1:false,
  checked_2:false,
  checked_3:false,
  thuonghieu:"",
  danhmuc:"",
  barcode:"",
  iduser:"",
  donvi:"",
  file:"",
}

constructor(private router: Router,public firebaseService:FireBaseService,public storage:Storage) {
  this.productAll = [];
  this.arrproduct = [];
  this.product = [];
 }


ngOnInit() {
this.push();
}

push()
{
  this.user = localStorage.getItem("user");
  this.id_user = JSON.parse(this.user);
  this.firebaseService.getItem().subscribe((item:any) =>
  {
    this.arrproduct = item;
    this.productAll = [];
    this.arrproduct.forEach(item =>
      {
        if(item.id == this.id_user)
        {
          this.productAll = item.product;
          this.category = item.category;
        }
        this.qtyProduct = this.productAll.length;
      })
this.product = this.productAll.slice(this.start,this.end);
console.log(this.product);
console.log(this.productAll)

}
);
}

nextPage()
{

  this.currentPage++;
  this.start = (this.currentPage -1)*this.perPage;
  this.end = this.currentPage * this.perPage;
  this.product = this.productAll.slice(this.start,this.end);
}
previousPage()
{
  this.currentPage--;
  this.start = (this.currentPage - 1)*this.perPage;
  this.end = this.currentPage * this.perPage;
  this.product = this.productAll.slice(this.start,this.end);
}


back()
{
  this.firebaseService.logout();
  this.isLogout.emit();
  this.router.navigateByUrl("/login");
}
chossefile(event:any)
{
  this.file = event.target.files[0];
}
saveProduct()
  {
  // this.tab=0;
  this.product_add.iduser = this.id_user;
  this.product_add.file =this.UrlFileImg;
  this.productAll.push(this.product_add);
  this.firebaseService.addProduct(this.id_user,this.productAll);
  this.product_add  = {
    name:"",
    price:"",
    price_nhap:"",
    phanloai:false,
    price_buon_si:"",
    soluongmax:"",
    checked_1:false,
    checked_2:false,
    checked_3:false,
    thuonghieu:"",
    danhmuc:"",
    barcode:"",
    iduser:"",
    donvi:"",
    file:"",
  }
  }
addData(name_img_file:any)
{
  const storageRef = ref(this.storage,'Product/' + name_img_file);
  const uploadTask =  uploadBytesResumable(storageRef,this.file);
   uploadTask.on('state_changed',
  (snapshot)=> {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
    console.log('Upload is' + progress + '%done');
  },
  (error)=> {
    console.log("loi")
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      this.UrlFileImg = downloadURL;
      this.saveProduct();
    });
  }
  )

}

deleteItem(name_img_file:any)
{
  this.deleteImg(name_img_file);
  this.productAll.splice(this.id_delete,1);
  this.firebaseService.deleteItem(this.id_user,this.productAll)
  this.add=0;
}

deleteImg(name_img_file:any)
{
const desertRef = ref(this.storage,'Product/'+name_img_file);
// Delete the file
  deleteObject(desertRef).then(() => {
  console.log("Xoa thanh cong")
  }).catch((error) => {
  console.log("loi cmnr")
  });
}

getDataEdit(data:any,index:number)
{
  this.add=1;
  this.product_edit = data;
  this.id_delete = index;
}
}
