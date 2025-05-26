import { Edit, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchUserByEmail } from '../../features/userSlice';

const ProfileHeadrer = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        // Récupérer le token depuis le localStorage
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // On suppose que l'email est dans decoded.email
                const email = decoded.email;
                if (email && (!user || user.email !== email)) {
                    dispatch(fetchUserByEmail(email));
                }
            } catch (e) {
                // Token invalide
            }
        }
    }, [dispatch, user]);

    return (
        <span className="text-bold text-accent text-2xl ">
          Bonjour, {user?.nom || "Utilisateur"} {user?.prenom}
        </span>
       
    );
};

export default ProfileHeadrer;