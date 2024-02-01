# Installation de Jest avec le React-modele

- installation du package : `yarn add jest --dev`
- créer un dossier pour nos tests : dossier "tests" à la racine du projet, à côté de src
- ajouter la configuration de jest dans package.json, avant la dernière accolade
```
,
"jest": {
  "modulePaths": [
    "./"
  ],
  "roots": [
    "<rootDir>/src",
    "<rootDir>/tests"
  ]
}
```

- configuration pour que ESlint se mette en mode spécial pour le dossier tests, créer un fichier tests/.eslintrc

```
{
  "env": {
      "jest/globals": true
  },
  "rules": {
      "no-unused-expressions": "off"
  }
}
```
- ajout du script pour lancer les tests unitaires, dans la section _scripts_ de package.json
```
"test": "jest"
```

# exemple d'utilisation des tests unitaires

Pour la fonctionnalité qu'on met en place, on a besoin d'une fonction qui fait la somme de 2 nombres.

On code cette fonction (on la place dans src/utils/math.js).

## Mise en place de tests unitaires pour cette fonction

On va prendre le temps de vérifier si la fonction fait ce qu'elle est censée faire, voir s'il y a des bugs => on va écrire des tests unitaires pour cette fonction.

On crée un fichier tests/math.test.js (extension à respecter, pour que jest reconnaisse que ce fichier est pour lui).

On a une assertion pour le moment, le compte-rendu nous dit que ça marche comme attendu.

```
 PASS  tests/math.test.js
  function sum
    ✓ should return 5 when called with 2 et 3 (2 ms)
```

On ajoute un deuxième cas de test, pour vérifier les nombres négatifs => toujours OK pour le compte-rendu, notre fonction n'a pas l'air d'avoir de bug.

## suite de l'écriture du code

On met en place la fonctionnalité, on continue à ajouter du code...

On se promène sur StackOverflow, et on trouve une façon qui a l'air plus classe pour faire une somme => `Math.abs(value1) + Math.abs(value2)`, hop on refactor notre fonction sum : `return Math.abs(a) + Math.abs(b);`.

Comme on avait écrit des tests unitaires, on en profite pour les relancer, et vérifier qu'on n'a pas de régression.

Oups, on a cassé quelque chose...

```
 FAIL  tests/math.test.js
  function sum
    ✓ should work with positive numbers (2 ms)
    ✕ should work with negative numbers (3 ms)

  ● function sum › should work with negative numbers

    expect(received).toBe(expected) // Object.is equality

    Expected: 3
    Received: 13
```

Mais en fait, c'est pas grave grâce aux tests unitaires : on va pouvoir corriger rapidement sans que le bug ait des conséquences. Et en plus le compte-rendu va nous pointer ce qui est cassé.

On corrige le code => les tests unitaires permettent de faire du refactoring plus sereinement, on pourra vérifier facilement si après ça fonctionne comme avant.

# Automatisation ultime des tests unitaires

On peut par exemple demander à Github d'appliquer tous les tests unitaires à chaque commit envoyé... Et il peut même être configuré pour refuser le commit s'il y a au moins un test qui ne produit pas le résultat attendu.

=> Intégration Continue, "CI" en anglais




  
  

