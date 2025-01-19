import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) navigate('/'); // Redirect to landing if not logged in
        });

        return () => unsubscribe();
    }, [navigate]);
};

export default useAuthRedirect;
