import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientService, Client } from '../service/client.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LivreurService } from '../service/livreur.service';
import { CompanyService } from '../service/company.service';
import { Router } from '@angular/router'; 
import { AuthService } from '../service/services.service';
import { FoodService } from '../service/food.service';

@Component({
  selector: 'app-admin-space',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.css']
})
export class AdminSpaceComponent {
  
  isPopupVisible = false;
  isPopupRestoVisible = false ;
  isPopupClientVisible = false ;
  msgError: string = 'Client existe déjà';

  isClientListPopupVisible = false;
  isCompanyListPopupVisible = false;

  client = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  livreur = {
    name: '',
    email: '',
    phone: '',
    cin: '',
    vehicleType: '',
    availabilityStatus: ''
  };


  file: File | null = null;
  fileName: string = '';
  fileSize: string = '';
  
  company = {
    name: '',
    email: '',
    phone: '',
    companyName: '',
    type: '',
    address: '',
    openingHours: '',
    closingHours: ''
  };
 

  food = {
    name: '',
    description: '',
    photos: [] as File[]
  };

  files: FileList | null = null;
  imagePreviews: string[] = [];
  isFoodListPopupVisible = false;
  clients: Client[] = [];
  livreurs: any[] = [];
  companies: any[] = [];

  constructor(private clientService: ClientService, private livreurService: LivreurService, private companyService: CompanyService,private router: Router,  private authService: AuthService ,  private foodService: FoodService) { }



  showFoodPopup() {
    this.isFoodListPopupVisible = true;
    document.body.classList.add('blurred');
  }

  hideFoodPopup() {
    this.isFoodListPopupVisible = false;
    document.body.classList.remove('blurred');
  }

  showCompanyPopup() { 
    this.companyService.getAllCompanies().subscribe(
      (companies: any[]) => {
        this.companies = companies;
        this.isCompanyListPopupVisible = true;
        document.body.classList.add('blurred');
      },
      error => {
        console.error('Error fetching companies', error);
      }
    );
  }

  hideCompanyPopup() { 
    this.isCompanyListPopupVisible = false;
    document.body.classList.remove('blurred');
  }

  
  toastMessages: string[] = [];
  showToast(msg: string) {
    this.toastMessages.push(msg);
    setTimeout(() => {
      this.toastMessages.shift();
    }, 5000);
  }

  toastMessagesError: string[] = [];
 showToastError(msgError: string) {
    this.toastMessagesError.push(msgError);
    setTimeout(() => {
      this.toastMessagesError.shift();
    }, 5000);
  }


  showClientPopup() {
    this.clientService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        this.isClientListPopupVisible = true;
        document.body.classList.add('blurred');
      },
      error => {
        console.error('Error fetching clients', error);
      }
    );
  }

  hideClientPopup() {
    this.isClientListPopupVisible = false;
    document.body.classList.remove('blurred');
  }


  registerClient(form: NgForm) {
    if (form.valid) {
      this.clientService.createClient(this.client).subscribe(
        response => {
          console.log('Client created successfully', response);
          this.showToast('Enregistré avec Succès');
          this.hidePopupClient();
        },
        error => {
          console.error('Error creating client', error);
          this.showToastError('Client existe déjà ');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      document.getElementById('file-details')!.style.display = 'block';
    }
  }

  removeFile() {
    this.file = null;
    this.fileName = '';
    this.fileSize = '';

    document.getElementById('file-details')!.style.display = 'none';
  }

  triggerFileInputClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  registerLivreur(form: NgForm) {
    if (form.valid && this.file) {
      const formData = new FormData();
      formData.append('name', this.livreur.name);
      formData.append('email', this.livreur.email);
      formData.append('phone', this.livreur.phone);
      formData.append('cin', this.livreur.cin);
      formData.append('vehicleType', this.livreur.vehicleType);
      formData.append('availabilityStatus', this.livreur.availabilityStatus);
      formData.append('avatar', this.file);

      this.livreurService.createLivreur(formData).subscribe(
        response => {
          console.log('Livreur created successfully', response);
          this.showToast('Enregistré avec Succès');
          this.hidePopup();
        },
        error => {
          console.error('Error creating livreur', error);
          this.showToastError('Livreur existe déjà');
        }
      );
    } else {
      console.log('Form is invalid or file is missing');
    }
  }

  registerCompany(form: NgForm) {
    if (form.valid && this.file) {
      const formData = new FormData();
      formData.append('name', this.company.name);
      formData.append('email', this.company.email);
      formData.append('phone', this.company.phone);
      formData.append('companyName', this.company.companyName);
      formData.append('type', this.company.type);
      formData.append('address', this.company.address);
      formData.append('openingHours', this.company.openingHours);
      formData.append('closingHours', this.company.closingHours);
      formData.append('avatar', this.file);

      this.companyService.createCompany(formData).subscribe(
        response => {
          console.log('Company created successfully', response);
          this.showToast('Enregistré avec Succès');
          this.hidePopupRestaurant();
        },
        error => {
          console.error('Error creating company', error);
          this.showToastError('Entreprise existe déjà');
        }
      );
    } else {
      console.log('Form is invalid or file is missing');
    }
  }


  ngOnInit() {
    console.log('AdminSpaceComponent initialized');
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }


  isLivreurListPopupVisible = false;
   showLivreurPopup() {
    this.livreurService.getAllLivreurs().subscribe(
      (livreurs: any[]) => {
        this.livreurs = livreurs;
        this.isLivreurListPopupVisible = true;
        document.body.classList.add('blurred');
      },
      error => {
        console.error('Error fetching livreurs', error);
      }
    );
  }

  hideLivreurPopup() {
    this.isLivreurListPopupVisible = false;
    document.body.classList.remove('blurred');
  }

  onImgError(event: any) {
    event.target.src = 'assets/food.png'; 
  }

  onFileChangeFood(event: any) {
    this.files = event.target.files;
    if (this.files && this.files.length > 0) {
      this.food.photos = Array.from(this.files);

      // Generate image previews
      this.imagePreviews = [];
      Array.from(this.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(preview: string) {
    const index = this.imagePreviews.indexOf(preview);
    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
      this.food.photos.splice(index, 1);
    }
  }
  
  registerFood(form: NgForm) {
    if (form.valid && this.food.photos.length > 0) {
      const formData = new FormData();
      formData.append('name', this.food.name);
      formData.append('description', this.food.description);
      this.food.photos.forEach((file) => {
        formData.append('photos', file, file.name);
      });

      this.foodService.createFood(formData).subscribe(
        response => {
          console.log('Food created successfully', response);
          this.showToast('Enregistré avec succès');
          this.hideFoodPopup();
        },
        error => {
          console.error('Error creating food', error);
          this.showToastError('Erreur lors de la création de la nourriture');
        }
      );
    } else {
      console.log('Form is invalid or files are missing');
    }
  }



  showPopupClient() {
    this.isPopupClientVisible = true;
    document.body.classList.add('blurred');
  }
  
  hidePopupClient() {
    this.isPopupClientVisible = false;
    document.body.classList.remove('blurred');
  }
  
  showPopup() {
    this.isPopupVisible = true;
    document.body.classList.add('blurred');
  }
  
  hidePopup() {
    this.isPopupVisible = false;
    document.body.classList.remove('blurred');
  }
  
  showPopupRestaurant() {
    this.isPopupRestoVisible = true;
    document.body.classList.add('blurred');
  }
  
  hidePopupRestaurant() {
    this.isPopupRestoVisible = false;
    document.body.classList.remove('blurred');
  }
  
  
}