# composant React en fléchée

```js
function Component({ a }) {
  return (
    <div>{a}</div>
  );
}
```

On peut écrire avec une autre syntaxe (fonction fléchée) :

```js
const Component = ({ a }) => {
  return (
    <div>{a}</div>
  );
};
```

Fonction fléchée : quand la seule instruction c'est un return on peut omettre le mot return et les accolades.

return implicite :

```js
const Component = ({ a }) => (
  <div>{a}</div>
);
```

Si on veut rajouter une instruction en plus du return (par exemple useSelector), il faut passer en return explicite.

Note : ESLint va souligner le code entier du composant tant qu'il n'y a pas encore d'instrucion avant le return.

```js
const Component = ({ a }) => {
  // ici on peut ajouter une instruction avant le return
  console.log(a);

  return (
    <div>{a}</div>
  );
};
```

Note : pour que ESLint ne râle pas avec les composants sous forme de fléchées : dans la partie _rules_ de .eslintrc, ajouter `"react/function-component-definition": "off"`.


# react-router-dom

## mise en place

- installer la bibliothèque : `yarn add react-router-dom`

- englober tous nos composants (généralement App) dans BrowserRouter

- changer l'URL dans la barre d'adresse quand on clique sur un lien (remplacer les balises a par Link ou NavLink)
=> NavLink est une version améliorée de Link, qui permet de mettre en valeur (CSS) un lien qui correspond à l'URL actuelle, donc souvent balise nav = NavLink

Exemple avec isActive : 
```js
      <NavLink
        className={({ isActive }) => (
          isActive ? 'classe(s) CSS si URL du lien = URL barre d adresse' : 'classe(s) CSS si URL du lien != URL barre d adresse'
        )}
        to="/"
      >
```

- faire un affichage conditionnel en fonction de l'URL avec les composants Routes/Route

```js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/faq" element={<Faq />} />
  <Route path="*" element={<NotFound />} />
<Routes>
```

Explication des Route :
si l'url est "/" alors on affiche le JSX suivant : <Home />
si l'url est "/faq" alors on affiche le JSX suivant : <Faq />
sinon on affiche le JSX suivant : <NotFound />

Englobé dans Routes : pour sélectionner la Route la plus précise qui correspond à l'URL

## route paramétrée

/recipe/quelquechose => et on veut se servir de ce "quelquechose" pour aller chercher les infos de la recette

Il faut préciser qu'on a un paramètre, avec ":" `<Route path="/recipe/:quelquechose" element={<Recipe />} />`

On pourra récupérer ce paramètre avec le hook useParams (de react-router-dom), accessible uniquement dans le composant qui est généré par la Route => ici le composant Recipe.



Quand on a une route paramétrée, on peut récupérer le(s) paramètre(s) de l'URL dans le composant qui est généré pour cette route.

```js
<Route path="/recipe/:type/:slug" element={<Recipe />} />
```

dans le composant Recipe :
```js
import { useParams } from 'react-router-dom';

function Recipe() {
  const params = useParams();
  console.log(params);

  // params.slug
}
```

Pour l'URL /recipe/dessert/crepes-raffinees affiche 
```js
{
  type: 'dessert',
  slug: 'crepes-raffinees'
}
```

Avec du destructuring :
```js
import { useParams } from 'react-router-dom';

function Recipe() {
  const { slug } = useParams();
  console.log(slug);
}
```


# Plan d'action pour récupérer les recettes depuis l'API

Point d'entrée : http://localhost:3001/recipes

- x installer axios
- x useEffect => pour aller récupérer les recettes juste après le premier affichage de la page
(envoi requête, récupération de la réponse)
- x traiter la réponse : 
    - x définir une action (il faut un payload pour transférer les infos de la réponse vers le state)
    - x traiter cette action dans un reducer
    - x dispatch cette action quand on a la réponse (useDispatch)

# devDependencies / dependencies

Pour fabriquer un gâteau on a différents "outils" : par exemple des pépites de chocolat et un four.

Une fois que le gâteau est fabriqué, les pépites de chocolat sont intégrées dedans, indispensables (comme la bibliothèque react pour notre code), mais le four n'est plus utile, on ne le livre pas avec le gâteau (comme ESLint qui nous a servi pour la mise en place du code, la phase de développement, mais qui n'est pas utile pour le navigateur ou l'internaute).

Quand on ajoute une bibliothèque, il faut choisir si c'est comme les pépites (dependencies) ou comme le four (devDependencies).
`yarn add lePaquet` => dependencies
`yarn add lePaquet --dev` => devDependencies

# partie scripts de package.json

Quelques commandes pratiques, des "raccourcis"

Exemple : 

```js
"scripts": {
    "start": "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js",
```
=> quand on lance "yarn start", en fait c'est un raccourci vers la commande "cross-env NODE_ENV=development webpack serve --config config/webpack.dev.js"

# defaultProps

Pour les props qui ne sont pas obligatoires, on peut préciser une valeur à utiliser si aucune valeur n'est fournie pour la prop.

```
function Component({ prop1, prop2 }) {
  return <div>{prop2}</div>
}

Component.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string,
}

// pour les props pas obligatoires
Component.defaultProps = {
  // nom de la prop : valeur à utiliser si aucune valeur n'est fournie par le composant parent
  prop2: 'non définie'
}
```

Si on fournit une valeur à prop2 : `<Component prop2="coucou" />` => `<div>Coucou</div>`
Si on ne donne pas de valeur : `<Component />` => `<div>non définie</div>`

# Réutilisation d'un composant React d'un autre projet

## Principe

Quand on découpe en composants, c'est souvent pratique de pouvoir réutiliser un composant fait pour un projet sur un autre projet (très fréquent en entreprise : interface commune entre plusieurs applications).

Pour qu'un composant soit réutilisable facilement, il faut qu'il soit "générique" => il a des infos qui proviennent de l'extérieur dans ses props, il travaille avec les props.

Si le composant a par exemple des liens direct avec un store redux (`useSelector((state) => state.recipes.list`)), alors pour le réutiliser tel quel dans un autre projet, le projet doit utiliser un store redux ET les infos doivent être rangées de la même façon dans le store.

Bonne pratique : ne pas modifier le composant qu'on réutilise.


## Etapes

- copier le composant dans notre projet
- comprendre comment le composant fonctionne => commentaires, props.

Deux possibilités : lire le code, ou jouer avec des props et regarder ce que ça donne

Exemple : 
```
 <LoginForm
      email="toto"
      password="123456789"
      changeField={(newValue, name) => {
        console.log(`changeField, newValue=${newValue} name=${name}`);
      }}
      handleLogin={() => {
        console.log('handleLogin');
      }}
      handleLogout={() => {
        console.log('handleLogout');
      }}
      isLogged={true}
      loggedMessage="Bienvenue"
    />
```

et on change les valeurs des props, et on regarde l'impact sur l'affichage.

- Utiliser le composant avec des valeurs réalistes pour les props (par exemple fournir dans une prop une info qu'on récupère du store avec useSelector)

# Plan d'action pour récupérer les recettes préférées de l'utilisateur

Authentification

- x intégration statique de LoginForm
- x champs contrôlés pour les 2 inputs
    - x ajout des emplacements dans le state
    - x contrôle en lecture
    - x contrôle en écriture : généralement on a une action pour chaque champ, mais ici le composant LoginForm déclenche le même traitement pour les 2 champs (fonction dans la prop changeField), donc on aura une seule action, et le reducer devra gérer le traitement, soit mettre la nouvelle valeur dans email, soit dans password
- x soumission du formulaire => requête POST vers /login, en fournissant les identifiants
- x adapter l'affichage quand on est connecté avec succès (mode connecté, et utiliser le prénom de l'utilisateur)
  
Récupération des recettes

- x parler d'authentification (notamment jwt)
- x Requête GET vers /favorites => une fois qu'on est authentifié
- comprendre et corriger le bug d'accès direct à une recette à partir de l'URL

Challenge : 
- on stocke les recettes préféres dans le state
- Utiliser les recettes préférées : ajouter une page sur le site qui affiche les recettes préférées (attention cette page devrait s'afficher que si on est authentifié, ou alors elle affiche un message spécial si on n'est pas authentifié)
- Regarder les liens dans les slides (en particulier la BD https)

# Payload d'action (redux)

Une action c'est un objet, qui a forcément un type (une propriété qui s'appelle "type")

Le type représente l'intention, ce qu'on voudrait que le reducer fasse comme changement
 sur le state.

Une intention ça peut être "OUVRE_LA_PORTE" => pas besoin d'infos supplémentaires pour appliquer l'intention.

Une intention ça peut être "FAIS_MOI_UN_CAFE" => besoin d'infos supplémentaires : décaféiné ou pas, nombre de sucres
=> ces deux infos c'est le payload de l'action, c'est quand l'intention ne suffit pas pour appliquer le traitement. Payload = "le chargement, la remorque", toujours au singulier

action creator :
```js
const faisMoiUnCafé(isDecaf, nbSugar) = ({
  type: "FAIS_MOI_UN_CAFE",
  payload: {
    isDecaf: isDecaf,
    nbSugar: nbSugar,
  }
});
```

Pour créer une action de ce type, il faudra fournir les infos :
```js
  dispatch(faisMoiUnCafé(true, 2));
```


# envoyer un token jwt dans les headers d'une requête avec axios

```js
  axios.get(
      // url
      'http://localhost:3001/favorites',
      // options, notamment les headers
      // => on transmet le token JWT au serveur, pour qu'il nous reconnaise et nous
      // renvoie nos recettes préférées
      {
        headers: {
          // nom du header: valeur
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
```


# Bug de la page d'erreur quand on accède au détail d'une recette à partir de l'URL

Bug fréquent quand on a react-router-dom et qu'on récupère des données initiales depuis une API (ici les recettes) => on essaie d'afficher le détail d'une recette quand on n'a pas encore de recettes.

Solution : empêcher l'affichage du composant à qui il manquera des infos (ici Recipe), généralement on empêche l'affichage de toutes les Routes. Ici on a même remplacé tout l'affichage par un loader.
