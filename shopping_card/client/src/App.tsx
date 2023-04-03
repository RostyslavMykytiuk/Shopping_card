import {Routes,Route} from 'react-router-dom'
import { AddForm } from './components/AddForm/AddForm';
import ProductsCard  from './components/ProductsCard/ProductsCard';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

function App() {
  return(
    <AppProvider i18n={translations}>
      <div className='app'>
        <Routes>
          <Route path='/add' Component={AddForm} />
          <Route path='/'Component={ProductsCard}/>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
