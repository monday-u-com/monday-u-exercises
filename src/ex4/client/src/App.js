import TodoContainer from './components/todo-container/TodoContainer';
import StatisticsContainer from './components/statistics-container/StatisticsContainer';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchItems } from './reducers/items-entities-reducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems('createdAt'));
  }, [dispatch]);

  return (
    <Layout className="app">
      <Routes>
        <Route path="/" element={<TodoContainer />}></Route>
        <Route path="/stats" element={<StatisticsContainer />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
