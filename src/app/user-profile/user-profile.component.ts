import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {



  dataInfo: any
  userData: any = [];
  isEditable: boolean = false;
  isNotEditable: boolean = true;

  constructor(private myservice: MyServiceService, private sanitizer: DomSanitizer) {
    console.log('heyyyyy')
  }

  name: any
  age: any
  email: any
  state: any
  tag: any
  pic= 'assets/images.png'

  ngOnInit(): void {
    this.myservice.getUserData().subscribe((data) => {
      debugger
      this.userData = data;
      if (this.userData.length > 0) {
        const lastIndex = this.userData.length - 1;
        this.name = this.userData[lastIndex].firstName + ' ' + this.userData[lastIndex].lastName;
        this.age = this.userData[lastIndex].age;
        this.email = this.userData[lastIndex].email;
        this.state = this.userData[lastIndex].state;
        this.tag = this.userData[lastIndex].tags;
        this.pic = this.userData[lastIndex].photo;
      } else {
        console.error('No user data available');
      }
    });
  }

  toggleEdit() {
    this.isEditable = true
  }

  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); 

    reader.onload = () => {
      
      this.pic = reader.result as string;
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };
  }

}
