import { AuthProvider } from './contexts/auth';
import Paths from './routes';

function App() {
 return (
   <AuthProvider>
     <Paths />
   </AuthProvider>
 )
}

export default App;
