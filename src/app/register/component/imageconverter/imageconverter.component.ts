import { Component } from '@angular/core';

@Component({
  selector: 'app-imageconverter',
  templateUrl: './imageconverter.component.html',
  styleUrls: ['./imageconverter.component.scss']
})
export class ImageconverterComponent {
  selectedImage: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  convertedBase64: string | null = null;
  errorMessage: string | null = null;

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     this.selectedImage = file;
  //     this.previewSelectedImage(file);
  //   }
  // }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (this.checkFileSize(file, 500)) { // Check if file size is within 500KB
        this.errorMessage = null;
        this.selectedImage = file;
        this.previewSelectedImage(file);
      } else {
        this.errorMessage = 'Image size should be less than 500KB.';
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

  convertToBase64(): void {
    if (this.selectedImage) {
      console.log(this.selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        this.convertedBase64 = reader.result as string;
        console.log(this.convertedBase64);

        console.log('Base64 String:', this.convertedBase64.split(',')[1]);
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
}
