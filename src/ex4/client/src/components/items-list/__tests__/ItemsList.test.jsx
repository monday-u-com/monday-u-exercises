import { render, screen } from '@testing-library/react';
import ItemsList from '../ItemsList';
import App from '../../../App';
import { fetchItems } from '../../../reducers/items-entities-reducer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const items = [
  {
    id: '56',
    name: 'Take',
    status: false,
  },
  {
    id: '32',
    name: 'Do the dishes',
    status: true,
  },
];
const mockStore = configureStore();
const store = mockStore({
  itemsEntities: {
    items,
    searchedItems: null,
    status: 'idle',
  },
  itemsView: {
    show: 'all',
  },
});

describe('ListContainer', () => {
  test('should render both items (one done and one not)', async () => {
    render(
      <Provider store={store}>
        <ItemsList />
      </Provider>
    );

    expect(screen.getByText('Take')).toBeInTheDocument();

    expect(screen.getByText('Do the dishes')).toBeInTheDocument();
  });
});
