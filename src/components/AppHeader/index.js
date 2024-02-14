import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import LoginForm from 'src/components/LoginForm';

import './style.scss';

import logo from 'src/assets/recettes.png';
import { changeLoginField, saveLoginSuccessful } from '../../actions/user';

const AppHeader = () => {

  const emailValue = useSelector((state) => state.user.email);
  const passwordValue = useSelector((state) => state.user.password);
  const logged = useSelector((state) => state.user.logged);
  const nickname = useSelector((state) => state.user.nickname);

  const dispatch = useDispatch();


  function fetchFavoriteRecipes(jwt) {
    axios.get(

      'http://localhost:3001/favorites',

      {
        headers: {

          Authorization: `Bearer ${jwt}`,
        },
      },
    )
      .then((response) => {
        console.log(response);


      });
  }

  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="Logo aza-recettes" />
      <LoginForm
        email={emailValue}
        password={passwordValue}
        changeField={(newValue, identifier) => {
          // console.log(`changeField: newValue=${newValue}, identifier=${identifier}`);
          dispatch(changeLoginField(newValue, identifier));
        }}
        handleLogin={() => {
          // on valide les infos auprès du back-end
          axios.post('http://localhost:3001/login',
            {
              email: emailValue,
              password: passwordValue,
            },
          ).then((response) => {
            dispatch(saveLoginSuccessful(response.data.pseudo, response.data.token));

            fetchFavoriteRecipes(response.data.token);
          }).catch((error) => {
            alert('Mauvais identifiants');
            console.log(error);
          });
        }}
        handleLogout={() => {
          console.log('handleLogout');
        }}
        loggedMessage={`Bienvenue ${nickname}`}
        isLogged={logged}
      />
    </header>
  );
};

export default AppHeader;
