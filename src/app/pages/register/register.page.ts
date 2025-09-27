import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Creando cuenta...',
        duration: 2000
      });
      await loading.present();

      // Simulación de registro
      setTimeout(() => {
        loading.dismiss();
        this.showAlert('Éxito', 'Cuenta creada exitosamente');
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.showAlert('Error', 'Por favor completa todos los campos correctamente');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}