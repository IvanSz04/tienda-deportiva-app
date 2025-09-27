import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User | null = null;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  async showInfo(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}