# Tienda Deportiva App

Una aplicación móvil de comercio electrónico desarrollada con **Ionic + Angular** para la venta de productos deportivos.

## 🚀 Características

### ✅ Funcionalidades Implementadas
- **Autenticación**: Login y registro de usuarios
- **Catálogo de productos**: Visualización de productos deportivos
- **Búsqueda y filtros**: Por categoría, nombre y marca
- **Carrito de compras**: Agregar, quitar y modificar cantidades
- **Perfil de usuario**: Gestión de cuenta y configuraciones
- **Diseño responsive**: Optimizado para móviles y tablets
- **Almacenamiento local**: Persistencia de carrito y preferencias

### 🎨 UI/UX
- **Loading Skeleton**: Mejor experiencia durante cargas
- **Componentes reutilizables**: ProductCard, LoadingSkeleton
- **Tema deportivo**: Colores azul, naranja y verde
- **Animaciones suaves**: Transiciones y hover effects
- **Diseño moderno**: Cards, shadows y border radius

### 📱 Tecnologías
- **Frontend**: Ionic 7 + Angular 16
- **Capacitor**: Para funcionalidades nativas
- **TypeScript**: Tipado estático
- **SCSS**: Estilos avanzados
- **RxJS**: Programación reactiva

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/IvanSz04/tienda-deportiva-app.git
cd tienda-deportiva-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ionic serve

# Build para producción
ionic build

# Agregar plataforma móvil
ionic capacitor add android
ionic capacitor add ios

# Ejecutar en dispositivo
ionic capacitor run android
ionic capacitor run ios
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── product-card/
│   │   └── loading-skeleton/
│   ├── pages/              # Páginas principales
│   │   ├── home/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── profile/
│   │   ├── login/
│   │   └── register/
│   ├── services/           # Servicios de datos
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   ├── auth.service.ts
│   │   └── storage.service.ts
│   ├── models/             # Interfaces y tipos
│   ├── shared/             # Módulo compartido
│   └── tabs/               # Navegación por tabs
├── assets/                 # Recursos estáticos
├── theme/                  # Variables de tema
└── global.scss            # Estilos globales
```

## 🎯 Funcionalidades Principales

### 🏠 Página Principal
- Hero section con call-to-action
- Categorías de productos
- Productos destacados
- Navegación intuitiva

### 🛍️ Catálogo de Productos
- Grid responsive de productos
- Búsqueda en tiempo real
- Filtros por categoría
- Información detallada (precio, rating, tallas)

### 🛒 Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Cálculo de totales
- Proceso de checkout simulado

### 👤 Perfil de Usuario
- Información personal
- Menú de opciones
- Cerrar sesión
- Configuraciones

## 🔧 Servicios Implementados

### ProductService
- Catálogo de 6+ productos deportivos
- Búsqueda y filtros
- Productos por categoría
- Productos destacados

### CartService
- Gestión completa del carrito
- Persistencia en localStorage
- Observables para reactividad
- Cálculos automáticos

### AuthService
- Autenticación simulada
- Gestión de sesiones
- Almacenamiento de usuario

### StorageService
- Almacenamiento local mejorado
- Historial de búsquedas
- Favoritos
- Preferencias de usuario

## 🎨 Diseño y UX

### Responsive Design
- Grid adaptativo
- Breakpoints para móvil/tablet
- Componentes flexibles

### Loading States
- Skeleton screens
- Spinners
- Estados de carga

### Interactividad
- Hover effects
- Animaciones CSS
- Feedback visual

## 📦 Productos de Ejemplo

1. **Camiseta Nike Dri-FIT** - $45.000
2. **Zapatillas Adidas Ultraboost** - $180.000
3. **Shorts Under Armour** - $35.000
4. **Chaqueta Puma Training** - $85.000
5. **Leggings Nike Pro** - $55.000
6. **Sudadera Adidas Essentials** - $75.000

## 🚀 Próximas Funcionalidades

- [ ] Detalle de producto
- [ ] Wishlist/Favoritos
- [ ] Historial de pedidos
- [ ] Notificaciones push
- [ ] Integración con API real
- [ ] Pasarela de pagos
- [ ] Geolocalización
- [ ] Reviews y comentarios

## 👨‍💻 Desarrollador

**Ivan Sz** - [GitHub](https://github.com/IvanSz04)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.