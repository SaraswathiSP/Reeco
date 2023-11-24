
import './App.css';
import Header from './components/Header/Header';
import OrderConfirm from './components/OrderConfirm/OrderConfirm';
import OrderDetail from './components/OrderDetails/OrderDetail';


function App() {
  return (
    <div>
      <Header/>
      <OrderConfirm/>
      <OrderDetail/>
    </div>
  );
}

export default App;
