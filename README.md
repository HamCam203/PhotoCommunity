# 📸 PhotoCommunity

PhotoCommunity est une application Angular permettant d'afficher et de gérer une galerie de photos interactives où les utilisateurs peuvent "snaper" (liker) leurs photos préférées.

## 🚀 Fonctionnalités

- 📷 Affichage dynamique des photos avec titre et description
- 👍 Possibilité de "snaper" une photo pour augmenter son compteur
- 🔄 Mise à jour des données via un backend RESTful

## 🛠️ Technologies utilisées

- **Frontend** : Angular (avec HttpClientModule et CommonModule)
- **Backend** : API REST (exemple avec Spring Boot)
- **Base de données** : (à définir selon implémentation)

## 📂 Structure du projet
```
src/
└── app/
    ├── assets/
    │   └── logo.jpg
    ├── components/
    │   ├── about/
    │   │   └── about.component.ts
    │   ├── header/
    │   │   ├── header.component.html
    │   │   ├── header.component.scss
    │   │   ├── header.component.spec.ts
    │   │   └── header.component.ts
    │   ├── landing-page/
    │   │   ├── landing-page.component.html
    │   │   ├── landing-page.component.scss
    │   │   ├── landing-page.component.spec.ts
    │   │   └── landing-page.component.ts
    │   ├── photo-create/
    │   │   ├── photo-create.component.css
    │   │   ├── photo-create.component.html
    │   │   ├── photo-create.component.scss
    │   │   ├── photo-create.component.spec.ts
    │   │   └── photo-create.component.ts
    │   ├── photo-detail/
    │   │   ├── photo-detail.component.css
    │   │   ├── photo-detail.component.html
    │   │   ├── photo-detail.component.spec.ts
    │   │   └── photo-detail.component.ts
    │   ├── photo-edit/
    │   │   ├── photo-edit.component.html
    │   │   ├── photo-edit.component.scss
    │   │   ├── photo-edit.component.spec.ts
    │   │   └── photo-edit.component.ts
    │   └── photo-list/
    │       ├── photo-list.component.css
    │       ├── photo-list.component.html
    │       ├── photo-list.component.spec.ts
    │       └── photo-list.component.ts
    ├── services/
    │   ├── photo.service.spec.ts
    │   └── photo.service.ts
    ├── app.component.css
    ├── app.component.html
    ├── app.component.spec.ts
    ├── app.component.ts
    ├── app.config.ts
    ├── app.routes.ts
    ├── index.html
    ├── main.ts
    └──  styles.css
```

## 🔧 API Backend

L'application consomme une API REST exposée sur [http://localhost:8080/api/facesnaps](http://localhost:8080/api/facesnaps) avec les routes suivantes :

- **`GET /api/facesnaps`** : Récupère toutes les photos  
- **`PUT /api/facesnaps/{id}`** : Met à jour une photo (notamment le nombre de snaps)  

L'API utilisée provient du projet suivant : [LearnSpringDataMongoDB](https://github.com/HamCam203/LearnSpringDataMongoDB).


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
