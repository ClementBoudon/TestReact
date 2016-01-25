# Repo de test de ReactJS / React Native

## Notes d'étude

### Stratégie d'apprentissage

 - Monter une app SPA
 - Utiliser AngularJS pour la gestion **M**odel et **C**ontroller
 - Utiliser React pour la **V**iew, via la gestion des composants
 - *Enfin* utiliser React Native pour générer non pas un DOM HTML depuis

### Plan de présentation

1. Rappel :
  1. SPA
  2. Framework MVC
  3. V *via* React
2. React Native
3. Explorons...
  1. l'app iOS
  2. l'app Android
4. Et si on utilisait Cordova ?


## Notes de tests

### Angular 2

 - [Angular 2 QuickStart](https://angular.io/docs/ts/latest/quickstart.html) *Version JavaScript*
   - Installer [npm](https://docs.npmjs.com/getting-started/installing-node) (on check : `npm -v`)
   - On installe via fichier `package.json` et `npm install` les librairies qui vont bien (Angular 2, mais aussi les outils nécessaires : chargeur, modules ES6, etc)
   - On crée le répertoire `app` contenant nos composants. À l'intérieur :
     - On crée un fichier `app.component.js`
       - On déclare le composant principal de l'App, en utilisant les méthodes `.Component` (à laquelle on passe les éléments de configuration comme le selecteur et le template HTML du composant) et `.Class` (où l'on déclare les propriétés et méthodes associées au composant, soit la logique métier de ce dernier), méthodes du namespace fourni par Angular `ng.core`. Tout est ajouté dans dans le namespace `app`.
     - On crée un fichier `boot.js`
        - Pour lancer l'application, on utilise la méthode `bootstrap` du navigateur Angular (on englobe notre appli pour modifier facilement le contexte de lancement de notre app) à laquelle on passe le composant *racine* de notre application, `AppComponent`.
        - Quand le contenu du DOM est chargé, on lance notre application.
   - À la racine du projet, on crée la page `index.html`, qui va :
     - Charger les librairies nécessaires (téléchargées précédemment via npm)
     - Charger **nos** fichiers, d'abord `app.component.js` puis `boot.js` (qui a besoin du composant en amont donc)
     - Intégrer notre app, via le tag `<my-app>` (le selecteur défini dans le composant)
   - Quand Angular appelle la fonction `Bootstrap()` à la fin du chargement du contenu du DOM dans `boot.js`, il lit les méta-données du composant `AppComponent`, recherche (et trouve) le tag du sélecteur (ici `my-app`), et charge l'application dans le tag.
   - On lance l'application :
     - `npm start` (qui lance le script `start` - donc `lite` donc `lite-server`, un serveur node allégé mais avec pleins d'outils pratiques - déclaré dans le `package.json`)
     - Thats All Folks!


## Biblio

 - [React](https://facebook.github.io/react/)
 - [React Native](https://facebook.github.io/react-native/)

 - [Angular 2](https://angular.io/)
