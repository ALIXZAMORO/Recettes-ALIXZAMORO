# champs contrôlés

Quasi systématique quand on a un champ de formulaire (input, select, textarea).

https://fr.reactjs.org/docs/forms.html

## C'est quoi ?

Si on utilise des éléments de formulaire (input, select, textarea), ces éléments
stockent leur valeur dans le DOM. On a besoin de stocker aussi la valeur
dans le state (adapter l'affichage quand la valeur change) => stockage à
2 endroits = risque de conflit.

On préfère mettre en place un champ contrôlé : c'est la valeur du state
qui pilote la valeur affichée dans l'input, et on interdit à l'input de
changer tout seul sa valeur.

## Comment on met en place un champ contrôlé ?

- avoir dans le state (dans le state de App, dans un store Redux) un emplacement pour la valeur de l'input
- contrôle en lecture : on transmet la valeur du state dans l'attribut value
de l'input
- contrôle en écriture : on écoute l'événement change de l'input, et on y
réagit en modifiant la valeur dans le state

### Contrôle en lecture

Contrôle en lecture = on transmet la valeur du state dans l'attribut value
de l'input (ajout d'une prop pour transmettre la valeur).

```js
function Component() {
  const valueFromState = useSelector((state) => state.inputValue);

  return <input value={valueFromState} />
}
```

A ce stade, c'est normal si on ne peut pas saisir des caractères dans
l'input (pour l'instant l'input est read-only).

Pour vérifier :
- si on est avec le state de App : modifier la valeur dans le state avec le React
Dev Tool => le contenu de l'input doit se mettre à jour
- si on est avec redux : modifier temporairement la valeur dans le state initial du reducer

On peut avoir dans la console un warning "Warning: You provided a `value` prop
to a form field without an `onChange` handler. This will render a
read-only field." => on n'y fait pas attention, il devrait disparaitre à
l'étape suivante

### Contrôle en écriture

Contrôle en écriture : on écoute l'événement change de l'input, et on y
réagit en modifiant la valeur dans le state, ce qui provoquera ensuite
une mise à jour de l'affichage donc de la valeur de l'input.

Si on est avec le state de App : on transmet au pseudo-setter la nouvelle valeur lue dans l'événement change. Pour vérifier : quand on saisit un caractère, il apparait dans l'input (et dans le
react dev tool on voit le state changer de valeur)

Si on est avec un store redux : on dispatch une action dans l'événement change pour aller modifier le state. Pour vérifier : quand on saisit un caractère, il apparait dans l'input (et dans le
redux dev tool on voit le state changer de valeur)

```js
function Component() {
  const valueFromState = useSelector((state) => state.inputValue);
  const dispatch = useDispatch();

  return <input
    value={valueFromState}
    onChange={(event) => {
      // on crée une action en fournissant la nouvelle valeur dans le payload (on récupère la nouvelle valeur dans l'événement change)
      dispatch(setNewValue(event.target.newValue));
    }}
  />
}
```

(il faut mettre en place l'action et son traitement au niveau du reducer)
