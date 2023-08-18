import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage,ref,uploadBytesResumable,getDownloadURL } from "@angular/fire/storage";

@Component({
  selector: 'app-sellmaterials',
  templateUrl: './sellmaterials.component.html',
  styleUrls: ['./sellmaterials.component.scss'],
})
export class SellmaterialsComponent {
  selectedImage: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  convertedBase64: string | null = null;
  errorMessage: string | null = null;
  showDatePicker: boolean = false;

  sellMaterialForm!: FormGroup; // Add the '!' non-null assertion operator here
  constructor(private formBuilder: FormBuilder,private productsService:ProductService,private router: Router,private storage:Storage) {}
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.sellMaterialForm = this.formBuilder.group({
      materialtype: ['', Validators.required],
      category: ['', Validators.required],
      quality: ['', Validators.required],
      availability: ['', Validators.required],
      description: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      productPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      location: ['', Validators.required],
      image: ['', Validators.required],
      address: ['', Validators.required],
      selectedDate: [''], // FormControl for the selected date
      userId: ['']

    });
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.sellMaterialForm.patchValue({
        userId: userId
      });
    }
  }

  // below method image preview
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (this.checkFileSize(file, 50000)) {
        // Check if file size is within 50MB (50000KB)
        this.errorMessage = null;
        this.selectedImage = file;
        this.previewSelectedImage(file);
      } else {
        this.errorMessage = 'Image size should be less than 50MB.';
        this.selectedImage = null;
        this.previewImage = null;
        this.convertedBase64 = null;
      }
    }
  }
  checkFileSize(file: File, maxSizeInKB: number): boolean {
    const fileSizeInKB = file.size / 1024;
    return fileSizeInKB <= maxSizeInKB;
  }
  previewSelectedImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onAvailabilityChange() {
    const availabilityControl = this.sellMaterialForm.get('availability');
    this.showDatePicker = availabilityControl?.value === 'date';
    if (!this.showDatePicker) {
      this.sellMaterialForm.patchValue({ selectedDate: null });
    }
  }

  onSellSubmit() {
    Object.keys(this.sellMaterialForm.controls).forEach(controlName => {
      this.sellMaterialForm.controls[controlName].markAsTouched();
    });
    if (this.sellMaterialForm.valid) {
      // Handle form submission here
      // if (this.selectedImage) {
      //   console.log(this.selectedImage);

      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     this.convertedBase64 = reader.result as string;
      //     console.log(this.convertedBase64);
      //     this.sellMaterialForm.value.image=this.convertedBase64
      //     console.log(this.sellMaterialForm.value.image);

      //     console.log('Base64 String:', this.convertedBase64.split(',')[1]);
      //   };
      //   reader.readAsDataURL(this.selectedImage);
      //   console.log(this.sellMaterialForm.value);
      //   console.log(this.sellMaterialForm.value.image)
      // }
      if (this.selectedImage) {
        const storageRef=ref(this.storage,`sellmaterials/${this.selectedImage.name}`);
        const uploadTask=uploadBytesResumable(storageRef,this.selectedImage);
        uploadTask.on('state_changed',
        (snapshot)=>{
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        },
        (err) => {},
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            console.log(downloadURL);
            this.sellMaterialForm.value.image=downloadURL
            console.log(this.sellMaterialForm.value.image);
            setTimeout (() => {
              console.log(this.sellMaterialForm.value);
              console.log(this.sellMaterialForm.value.image);
              this.productsService.createSellMaterials(this.sellMaterialForm.value).subscribe((response:any)=>{
                console.log(response);
                Swal.fire(
                  'Good job!',
                  'Your product uploaded successfully!',
                  'success'
                )
                this.router.navigate(['']);
              },
              (error) => {
                console.log('Error:', error);
                if (error.status==403) {

                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong !',

                  })
                }
              }
              )
           }, 300);
          })
        }
        )
      }

    }

  }


}
