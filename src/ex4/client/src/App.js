import TodoContainer from './components/TodoContainer';
import StatisticsContainer from './components/StatisticsContainer';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import './App.css';

function App() {
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
