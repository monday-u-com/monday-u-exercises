import { Tab } from 'monday-ui-react-core';
import Card from './ui/Card';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigator = useNavigate();

  return (
    <Card>
      <section>
        <Tab onClick={() => navigator('/')}>Tasks</Tab>
        <Tab onClick={() => navigator('/stats')}>Statistics</Tab>
      </section>
      <section>{children}</section>
    </Card>
  );
}

export default Layout;
