import { useState, useCallback } from 'react';
import { ListControls } from './components/ListControls/ListControls';
import { ListItem } from './components/ListItem/ListItem';
import { useItem } from './hooks/useItem';
import './App.css';

function App() {
	const { getItems } = useItem();
	const [itemsList, setItemsList] = useState([]);

	const renderItems = useCallback(async () => {
		setItemsList(await getItems());
	}, []);

	return (
		<div className="app-container">
			<div className="list-container">
				<h1 className="app-name">DoneDay App</h1>
				<ListControls renderItems={renderItems} />
				<ListItem itemsList={itemsList} renderItems={renderItems} />
			</div>
		</div>
	);
}

export default App;
