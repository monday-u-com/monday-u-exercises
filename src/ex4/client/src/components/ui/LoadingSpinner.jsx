import { Loader } from 'monday-ui-react-core';

const LoadingSpinner = () => {
  return (
    <div className="empty-list">
      <Loader size={Loader.sizes.MEDIUM} hasBackground />
    </div>
  );
};

export default LoadingSpinner;
