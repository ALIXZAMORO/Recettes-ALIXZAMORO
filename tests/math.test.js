// dans ce fichier, les tests unitaires pour tout le code qui est dans src/utils/math.js

// on importe le morceau de code à tester
import { sum } from 'src/utils/math';

// les tests unitaires, c'est valider des assertions
// Par exemple :
// sum(2, 3) devrait être 5
// sum(4, 5) devrait être 9
// => fonction jest pour valider une assertion = expect
// et ensuite on utilise un "comparateur" pour comparer avec la valeur attendue
// https://jestjs.io/docs/using-matchers

// une assertion écrite en syntaxe Jest
// expect(sum(2, 3)).toBe(5);
// expect(appel à notre fonction avec tels arguments) comparer avec (valeur attendue)

/* on organise nos assertions en chapitres et sous-chapitres, pour pouvoir
 s'y retrouver dans le compte-rendu

avec describe on définit "un chapitre"
2 paramètres :
  - un texte qui décrit le bloc de test (qui apparaîtra dans le compte-rendu)
  - une callback qui permet d'exécuter les tests pour ce bloc
On peut imbriquer les describe.

test permet d'écrire une assertion, avec un texte qui apparaitra dans le
compte-rendu
2 paramètres :
  - un texte qui décrit le cas de test (qui apparaitra dans le
compte-rendu)
  - une callback qui permet d'exécuter les tests pour ce cas
*/

describe('function sum', () => {
  test('should work with positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('should work with negative numbers', () => {
    // ici une ou plusieurs assertions : on choisit un ou plusieurs cas qui nous paraissent
    // être des bons exemples
    expect(sum(8, -5)).toBe(3);
    expect(sum(-5, -5)).toBe(-10);
  })
})
