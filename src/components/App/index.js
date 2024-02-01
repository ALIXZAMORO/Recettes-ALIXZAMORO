import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import Menu from 'src/components/Menu';
import Home from 'src/components/Home';
import Recipe from 'src/components/Recipe';
import Error from 'src/components/Error';

import Loading from './Loading';

import './style.scss';
import { setRecipes } from '../../actions/recipes';

function App(props) {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.list);

  useEffect(() => {
    // console.log('il faut aller chercher les recettes');
    axios.get('http://localhost:3001/recipes')
      .then((response) => {
        dispatch(setRecipes(response.data));
      });
  }, []);
  // [] => l'effet se déclenche une seule fois juste après le premier rendu du composant

  // si recettes pas encore chargées, on affiche le loader
  if (recipes.length === 0) {
    return <Loading />;
  }
  // sinon on peut utiliser nos Routes
  return (
    <div className="app">
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:slug" element={<Recipe />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

App.propTypes = {
  loading: PropTypes.bool,
};

App.defaultProps = {
  loading: false,
};

export default App;
