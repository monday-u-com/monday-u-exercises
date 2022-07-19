import { Flex, TextField } from 'monday-ui-react-core';
import { Search } from 'monday-ui-react-core/dist/allIcons';
import { useRef } from 'react';
import 'monday-ui-react-core/dist/main.css';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { search } from '../../actions/search-items-actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef('');

  const searchItemHandler = () => {
    dispatch(search(inputRef.current.value));
  };

  return (
    <Flex style={{ margin: '5px 0' }}>
      <TextField
        ref={inputRef}
        iconName={Search}
        labelIconName="search for item"
        placeholder="Search..."
        onIconClick={searchItemHandler}
        onChange={() => {
          searchItemHandler();
        }}
      />
    </Flex>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onAdd: PropTypes.func,
};
