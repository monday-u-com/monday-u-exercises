import renderer from 'react-test-renderer';
import StatisticsContainer from '../StatisticsContainer';
import { Provider } from 'react-redux';
import { store } from '../../../store';

test('renders correctly the StatisticsContainer', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <StatisticsContainer />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
