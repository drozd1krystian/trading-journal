import { useSelector } from "react-redux";

const mapState = ({ modal }) => ({
  show: modal.show,
  loading: modal.loading,
  done: modal.done,
  error: modal.error,
});

const useModal = () => {
  const { loading, done, error, show } = useSelector(mapState);
  return {
    show,
    loading,
    done,
    error,
  };
};

export default useModal;
