import renderer from 'react-test-renderer';
import Item from '../Item';
import { Provider } from 'react-redux';
import { store } from '../../../store';

test('renders correctly an item', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Item id="1" text="test task" status={false} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
