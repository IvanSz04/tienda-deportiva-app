import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tiendadeportiva.app',
  appName: 'Tienda Deportiva',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;