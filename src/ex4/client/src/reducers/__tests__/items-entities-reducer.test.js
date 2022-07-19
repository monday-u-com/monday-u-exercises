import reducer from '../items-entities-reducer';
import { addItemSuccessAction } from '../../actions/add-item-actions';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    items: [],
    searchedItems: null,
    status: 'idle',
  });
});

test('should handle a todo being added to an empty list', () => {
  const previousState = {
    items: [],
    searchedItems: null,
    status: 'idle',
  };

  expect(
    reducer(
      previousState,
      addItemSuccessAction({ id: 0, name: 'Run the tests', status: false })
    )
  ).toEqual({
    items: [{ id: 0, name: 'Run the tests', status: false }],
    searchedItems: null,
    status: 'idle',
  });
});

test('should handle a todo being added to an existing list', () => {
  const previousState = {
    items: [{ id: 0, name: 'Run the tests', status: false }],
    searchedItems: null,
    status: 'idle',
  };
  expect(
    reducer(
      previousState,
      addItemSuccessAction({ id: 1, name: 'do something', status: false })
    )
  ).toEqual({
    items: [
      { id: 0, name: 'Run the tests', status: false },
      { id: 1, name: 'do something', status: false },
    ],
    searchedItems: null,
    status: 'idle',
  });
});
