import Layout from './components/UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import NewsPage from './containers/NewsPage/NewsPage.tsx';
import NewsForm from './components/NewsForm/NewsForm.tsx';

const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/news/new" element={(<NewsForm/>)}/>
          <Route path="/news/:id" element={(<NewsPage/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
