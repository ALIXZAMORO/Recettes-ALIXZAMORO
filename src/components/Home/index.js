import { useSelector } from 'react-redux';

import Page from 'src/components/Page';
import AppHeader from 'src/components/AppHeader';
import Content from 'src/components/Content';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.list);
  return (
    <Page>
      <AppHeader />
      <Content
        title="Aza-Recettes"
        text="Voici une liste de plusieurs recettes de cuisine :D"
        recipes={recipes}
      />
    </Page>
  );
};

export default Home;
