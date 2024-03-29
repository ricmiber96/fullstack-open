import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store} >
    <Router>
        <App />
        <Toaster />
    </Router>
</Provider>
)
