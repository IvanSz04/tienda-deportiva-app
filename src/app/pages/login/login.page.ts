import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 2000
      });
      await loading.present();

      // Simulación de login
      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/tabs/home']);
      }, 2000);
    } else {
      this.showAlert('Error', 'Por favor completa todos los campos correctamente');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
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