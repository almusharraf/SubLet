import 'react-native-get-random-values';
import App from './src/App';

// Initialize Firebase configuration first
import './src/config/firebase';

// Register the app
import { registerRootComponent } from 'expo';
registerRootComponent(App);

export default App; 