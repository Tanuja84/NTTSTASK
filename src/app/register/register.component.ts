import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  interests = [
    { key: 'cricket', label: 'Cricket' },
    { key: 'football', label: 'Football' },
    { key: 'hockey', label: 'Hockey' }
  ];
  formData: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private myservice: MyServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      photo: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern("^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$")]],
      tags: ['', Validators.required],
      country: ['', Validators.required],
      age: [18, Validators.required],
      interest: ['', Validators.required],
      addressType: [''],
      homeAddress1: ['', Validators.required],
      homeAddress2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      hockey: ['', Validators.required],
      football: ['', Validators.required],
      cricket: ['', Validators.required],
    });
    // Listen to changes in cricket and football checkboxes
    this.registrationForm.get('cricket')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.addTag('Cricket');
      } else {
        this.removeTag('Cricket');
      }
    });

    this.registrationForm.get('football')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.addTag('Football');
      } else {
        this.removeTag('Football');
      }
    });

    this.registrationForm.get('hockey')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.addTag('Hockey');
      } else {
        this.removeTag('Hockey');
      }
    });

  }

  addTag(tag: string) {
    const currentTags = this.registrationForm.get('tags')?.value;
    const updatedTags = currentTags ? currentTags + ', ' + tag : tag;
    this.registrationForm.get('tags')?.setValue(updatedTags);
  }

  removeTag(tag: string) {
    const currentTags = this.registrationForm.get('tags')?.value;
    if (currentTags) {
      const updatedTags = currentTags.replace(tag, '').replace(/,\s*,/g, ',').trim();
      this.registrationForm.get('tags')?.setValue(updatedTags);
    }
  }

  get email() {
    return this.registrationForm.get('email');
  }

  toggleAddressFields(): void {
    const addressType = this.registrationForm.get('addressType')?.value;
    if (addressType === 'Home') {
      this.registrationForm.get('homeAddress1')?.setValidators(Validators.required);
      this.registrationForm.get('homeAddress2')?.setValidators(null);
      this.registrationForm.get('companyAddress1')?.setValidators(null);
      this.registrationForm.get('companyAddress2')?.setValidators(null);
    } else {
      this.registrationForm.get('homeAddress1')?.setValidators(null);
      this.registrationForm.get('homeAddress2')?.setValidators(null);
      this.registrationForm.get('companyAddress1')?.setValidators(Validators.required);
      this.registrationForm.get('companyAddress2')?.setValidators(null);
    }
    this.registrationForm.updateValueAndValidity();
  }



  toggleCheckbox(interest: any): void {
    const checkbox = this.registrationForm.get(interest.key);
    if (checkbox?.value) {
      checkbox.patchValue(false);
    } else {
      checkbox?.patchValue(true);
    }
  }


  triggerFileInput() {
    const photoInput = document.getElementById('photo');
    if (photoInput instanceof HTMLInputElement) {
        photoInput.click();
    } else {
        console.error('Element with ID "photo" is not an input element');
    }
}

  onFileSelected(event: any) {
    let file: File = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 

    reader.onload = () => {
      let base64Image: string = reader.result as string;
      console.log(base64Image); 
      this.registrationForm.patchValue({
        photo: base64Image
      })
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };
  }


  submit() {
    let formData = this.registrationForm.value;
    this.myservice.submitRegistration(formData).subscribe(
      (response) => {
        debugger
        console.log('Data posted successfully:', response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error posting data:', error);
      }
    );
  }


}



