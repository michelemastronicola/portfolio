import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../../../store/deviceSlice';

const UseDeviceDetection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobile = () => {
      dispatch(setIsMobile(window.innerWidth <= 768));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [dispatch]);
};

export default UseDeviceDetection;
