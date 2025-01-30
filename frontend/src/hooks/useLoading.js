import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/adminRedux/loaderSlice";

// Custom hook to handle loading state
const useLoading = () => {
  const dispatch = useDispatch();

  const setLoading = (isLoading) => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  };

  return setLoading;
};

export default useLoading;
