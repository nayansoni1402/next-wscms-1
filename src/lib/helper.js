import { useDispatch, useSelector } from "react-redux";

export const getAuthentication1 = (url) => {
    const isAuthenticate = useSelector(state => state?.auth?.isLoaded);
    useDispatch();
    return isAuthenticate;
}

