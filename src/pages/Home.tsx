import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Home = () => {
    const [businessModels, setBusinessModels] = useState<any[]>([]);

    useEffect(() => {
        const fetchBusinessModels = async () => {
            const querySnapshot = await getDocs(collection(db, 'businessModels'));
            setBusinessModels(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchBusinessModels();
    }, []);

    return (
        <div>
            <h1>Your Business Models</h1>
            <button onClick={() => (window.location.href = '/editor/new')}>Create New</button>
            <ul>
                {businessModels.map(model => (
                    <li key={model.id} onClick={() => (window.location.href = `/editor/${model.id}`)}>
                        {model.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
