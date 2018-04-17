import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProvider } from './components/context'
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<AppProvider>
		<App />
	</AppProvider>,
	document.getElementById('root')
)

//registerServiceWorker();
