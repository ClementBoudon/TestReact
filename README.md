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
5. Angular + Ionic + Cordova = Angular + React + React Native ?


## Notes de tests

### React

 - [Starter Kit](https://facebook.github.io/react/downloads/react-0.14.6.zip)
   - Pour faire du React sans outils (et donc sans JSX), on peut utiliser ce starter kit et inclure les libraires react.js et react-dom.js. Et coder du React.

 - [React Tutorial](https://facebook.github.io/react/docs/tutorial.html)
   - Objectif : système de commentaire.
   - On Utilisera un serveur local pour fournir une API pour simuler le backend.
   - On télécharge [l'archive d'exemple](https://github.com/reactjs/react-tutorial/archive/master.zip) et on décompress dans le dossier `react-tutorial`
   - On lance un serveur node.js : `npm install` et `node server.js` (pour tester : [http://localhost:3000](http://localhost:3000/)).
   - On va éditer le fichier `public/index.html`
   - On supprimme l'inclusion du script `scripts/example.js` pour partir de 0.
   - On crée un fichier `tutorial1.js` initial :
     - Les composants sont organisés tels que : `CommentBox` contient une liste `CommentList` qui contient des `Comment`, ainsi qu'un `CommentForm`
     - Le fichier contient du JSX, qui permet d'utiliser des balises type XML dans le code pour représenter les composants. Ici le JSX est transformé en JavaScript via la librairie Babel. On pourrait également directement codé en JS (cf `tutorial1-raw.js`).
     - On crée un nouveau composant via la méthode fournie par React `React.createClass()`, où l'on défini le nom du composant, mais surtout la méthode `render` qui retourne le contenu du composant (ici, `div` n'est pas un élement div du DOM classique, mais un composant existant fourni par React).
     - La méthode `ReactDOM.render` permet d'intégrer le composant *racine* dans l'élément défini dans le second paramètre.
     - Pour tester, on inclus le script `scripts/tutorial1.js` dans la page `public/index.html` (simple div affichée).
   - Ajoutons quelques éléments
     - On crée deux autres composants `CommentList` et `CommentForm` (de simples div pour l'instant), et on garde le code précédent en bas de fichier.
     - Sauf que l'on modifie le composant `CommentBox` pour inclure nos deux nouveaux composants.
   - Jouons avec les `props`
     - On ajoute un nouveau composant `Comment` qui va utiliser les propriétés fournie par l'élément parent (propriétés qui seront donc définies lors du l'intégration du composant dans `CommentList`).
     - Une propriété peut être référencée par une clé (ici `author` par exemple) ou par les éléments imbriqués via `this.props.children`.
     - Du coup on modifie `CommentList` pour intégrer : les différents composants `Comment`, et pour chacun la propriété `author` et le contenu.
   - On ajoute des `Markdown`
     - Si l'on veut ajouter la gestion des Markdown, sachant que nous avons déjà inclus le script `marked` dans l'index, on va simplement transformer la propriété enfant en chaine, et utiliser la fonction `marked`.
     - Mais React protège automatiquement des failles XSS, et donc affiche directement les balises HTML. Du coup on utilise un petit workaround (mais pas conseillé).
   - La gestion du modèle :
     - On crée dans le fichier la variable json (qui viendra plus tard de l'API)
     - Pour que les composants restent modulables : on passe les données à la `CommentBox` via une propriété `data`.
     - Enfin dans `CommentList` et sa fonction `render`, on crée un variable `commentNodes` qui pour chaque propriété data (`.map()`) va inclure un composant `Comment` rempli de ses propriétés (dont `id` qui est nativement disponible).
   - Gestion du `state`
     - les `props` sont immuables, fournies par le parent d'un composant. Pour faire varier des éléments propres à un composant, on utilise les 'états', soit les méthodes `state` (`getInitialState`, `setState`, `this.state.`)
     - Ici on utilise ces méthodes pour *puller* une URL fournie en propriété, qui va mettre à jour le `state` *data*.
  - Gestion du formulaire pour rajouter de nouveaux commentaires
    - Tout d'abord on modifie le composant `CommentForm`
    - Pour que le composant représente constamment ce qu'il est dans le navigateur (c'est-à-dire constamment à jour à partir des informations saisies par l'utilisateur), nous allons utiliser des fonctions appelées sur le `onChange`, qui vont mettre à jour le `state` du composant. Ce `state` sera définie à vide à l'affichage du formulaire via `getInitialState`, puis utilisé dans les `value` des input). Il s'agit donc ici d'un composant controllé, appelé `controlled component` par React.
    - Lors de la soumission du formulaire, nous allons le vider, envoyer son contenu au server et rafraichir la liste des commentaires.
    - On écoute la soumission du formulaire via `onSubmit={this.handleSubmit}` (et on définit la méthode *handle* correspondante).
    - Après avoir bloqué le comportement par défaut du navogateur, on traite les données (récupérées via le `state`), on envoie les données (on y reviendra), et on vide les données dans le `state.
    - Pour le rafraichissement de la liste des commentaire : comme c'est `CommentBox` qui détient la liste `CommentList`, c'est à la box de rafraichir cette liste. On crée donc une fonction `handleCommentSubmit` dans `CommentBox`. On veut faire remonter les informations (contenues dans le `state` du `CommentForm`) pour l'appel à la fonction `handleCommentSubmit`, fonction définie dans le composant parent. Pour cela, on va passer, via une propriété, la fonction vers le composant enfant (en ajoutant `onCommentSubmit={this.handleCommentSubmit}`). On pourra donc appeler `onCommentSubmit` via les `props`, dans le composant enfant.
    - Il reste donc à ajouter la requete ajax dans la fonction `handleCommentSubmit`.
  - (Mini) Optimisation
    - Pour ne pas attendre la soumission du nouveau commentaire au serveur, son insertion dans le fichier json qui sert de BDD, puis le re-affichage de la liste pour voir apparaitre le nouveau commentaire, on peut intégrer le commentaire directement dans la liste.
    - On stock dans une variable la liste des commentaires actuelle, on génère un id temporaire (basique ici, en prod on fait différement, etc.) pour le nouveau commentaire qui sera remplacé par celui du serveur à réception des données après insertion et on ajoute le nouveau commentaire aux existants dans une nouvelle variable (qui viendra remplacé le `state` du composant). En cas de succès ou d'erreur de la requête ajax, on mets à jour le `state`en fonction.
  - Thats All Folks!

En résumé : Chez M. React, on crée des composants qui s'imbriquent, qui ont des propriétés fournies par leurs parents, des valeurs d'état qui peuvent être modifiées et des méthodes propres. On modifie le `state` ? React modifie l'affichage. L'utilisateur modifie une valeur ? On fait remonter via les props la valeur au composant qui détient le `state` (et donc permet de garder un composant à jour).

On ne manipule pas directement le DOM (même si on peut via ReactDOM), pour laisser React gérer son DOM virtuel au mieux en fonction du browser (ou un équivalent, coucou React Native ;)) lorsqu'on utilise sa méthode `.render`.

Et on peut directement utiliser ces composants "faits maison" en XML-like (via du JSX qui sera compilé en JS par la suite).


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
 - [ngReact](http://ngreact.github.io/ngReact/)
 - [Angular 2](https://angular.io/)
