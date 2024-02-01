# au choix

- Challenge "Login" sur oRecipes
- Pratiquer les tests
- Comprendre et corriger le bug sur oRecipe : quand on va directement sur l'URL d'une recette sans passer par la page, d'accueil, on tombe sur la page d'erreur

## Challenge "Login" sur oRecipes

- copier dans oRecipes (src/components) le dossier LoginForm
Le composant est fonctionnel. Mais il va falloir comprendre comment il fonctionne => commentaires, props.

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

- Utiliser le composant
- Généralement, quand on réutilise un composant, on évite de modifier le code et on préfère le piloter avec ses props (sinon on casse la réutilisabilité) => si on a besoin par exemple de faire le lien avec le store Redux, on écrire useSelector dans un composant à nous, et on transmettra la valeur dans la prop de LoginForm qui va bien.

## pratiquer les tests

- (défi) écrire des test unitaires pour la fonction findRecipe (src/selectors/recipes.js)
- mettre en place une fonction et ses tests unitaires, éventuellement en méthodologie TDD
  
Fonction pour obtenir le titre à afficher (lorem ipsum) en fonction du nombre de recettes :
=> si 0 recettes, "Bienvenue sur Orecipes, reviens bientôt pour découvrir nos recettes"
=> si 1 recette, "Bienvenue sur Orecipes, découvre la meilleure recette du monde"
=> si n recettes, "Bienvenue sur Orecipes, découvre nos recettes"

On peut aussi faire exprès de casser le code de la fonction, et regarder si les tests unitaires plantent bien dans ce cas... et sinon tenter d'ajouter les tests unitaires qui détectent ce cas.
