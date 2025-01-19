import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Editor = () => {
    const { id } = useParams();
    const [modelData, setModelData] = useState<any>({
        name: '',
        keyPartnerships: '',
        keyActivities: '',
        keyResources: '',
        valuePropositions: '',
        customerRelationships: '',
        channels: '',
        customerSegments: '',
        costStructure: '',
        revenueStreams: '',
    });

    useEffect(() => {
        if (id !== 'new') {
            const fetchData = async () => {
                const docRef = doc(db, 'businessModels', id!);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setModelData(docSnap.data());
                }
            };
            fetchData();
        }
    }, [id]);

    const handleSave = async () => {
        const docRef = id === 'new' ? doc(collection(db, 'businessModels')) : doc(db, 'businessModels', id!);
        await setDoc(docRef, modelData, { merge: true });
        alert('Saved successfully!');
    };

    return (
        <div>
            <h1>{id === 'new' ? 'Create Business Model' : 'Edit Business Model'}</h1>
            <input
                type="text"
                value={modelData.name}
                onChange={e => setModelData({ ...modelData, name: e.target.value })}
                placeholder="Business Name"
            />
            {/* Add text fields for other fields */}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Editor;
