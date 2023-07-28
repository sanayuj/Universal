
import './App.css';
import  {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserRouter from "./Routes/userRouter"
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import AdminRouter from "./Routes/adminRouter"
function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/*' element={<UserRouter/> }/>
      <Route path='/admin/*' element={<AdminRouter/> }/>

    </Routes>
    <ToastContainer/>
   </BrowserRouter>
   
  )
}

export default App;
