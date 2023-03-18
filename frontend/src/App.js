import './assets/scss/app.scss';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <>
      <Header title="Media Browser" headerOptions={[{
        title: 'All',
        icon: '',
        href: '/all'
      }, {
        title: 'Images',
        icon: '',
        href: '/images'
      }, {
        title: 'Videos',
        icon: '',
        href: '/videos'
      }, {
        title: 'PDF',
        icon: '',
        href: '/pdf'
      }]} />
      <Footer title="Made by likith sai" />
    </>
  );
}

export default App;
