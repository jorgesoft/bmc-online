import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import Navbar from "../components/Navbar";

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [businessModel, setBusinessModel] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const fetchBusinessModel = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    navigate('/');
                    return;
                }

                const docRef = doc(db, 'businessModels', id!);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    console.error('Business model not found');
                    navigate('/home');
                    return;
                }

                const data = docSnap.data();
                if (data.userId !== user.uid) {
                    console.error('Unauthorized access');
                    navigate('/');
                    return;
                }

                setBusinessModel(data);
            } catch (error) {
                console.error('Error fetching business model:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessModel();
    }, [id, auth, navigate]);

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'businessModels', id!);
            await updateDoc(docRef, businessModel);
            alert('Business model saved successfully!');
        } catch (error) {
            console.error('Error saving business model:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Navbar /> 
            <div className="container mt-4">
                <h1>Edit Business Model</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="businessName" className="form-label">Business Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="businessName"
                            value={businessModel.businessName}
                            onChange={(e) => setBusinessModel({ ...businessModel, businessName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="businessHypothesis" className="form-label">Business Hypothesis</label>
                        <textarea
                            className="form-control"
                            id="businessHypothesis"
                            value={businessModel.businessHypothesis}
                            onChange={(e) => setBusinessModel({ ...businessModel, businessHypothesis: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="keyPartnerships" className="form-label">Key Partnerships</label>
                        <textarea
                            className="form-control"
                            id="keyPartnerships"
                            value={businessModel.keyPartnerships}
                            onChange={(e) => setBusinessModel({ ...businessModel, keyPartnerships: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="keyActivities" className="form-label">Key Activities</label>
                        <textarea
                            className="form-control"
                            id="keyActivities"
                            value={businessModel.keyActivities}
                            onChange={(e) => setBusinessModel({ ...businessModel, keyActivities: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="keyResources" className="form-label">Key Resources</label>
                        <textarea
                            className="form-control"
                            id="keyResources"
                            value={businessModel.keyResources}
                            onChange={(e) => setBusinessModel({ ...businessModel, keyResources: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="valuePropositions" className="form-label">Value Propositions</label>
                        <textarea
                            className="form-control"
                            id="valuePropositions"
                            value={businessModel.valuePropositions}
                            onChange={(e) => setBusinessModel({ ...businessModel, valuePropositions: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerRelationships" className="form-label">Customer Relationships</label>
                        <textarea
                            className="form-control"
                            id="customerRelationships"
                            value={businessModel.customerRelationships}
                            onChange={(e) => setBusinessModel({ ...businessModel, customerRelationships: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="channels" className="form-label">Channels</label>
                        <textarea
                            className="form-control"
                            id="channels"
                            value={businessModel.channels}
                            onChange={(e) => setBusinessModel({ ...businessModel, channels: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerSegments" className="form-label">Customer Segments</label>
                        <textarea
                            className="form-control"
                            id="customerSegments"
                            value={businessModel.customerSegments}
                            onChange={(e) => setBusinessModel({ ...businessModel, customerSegments: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="costStructure" className="form-label">Cost Structure</label>
                        <textarea
                            className="form-control"
                            id="costStructure"
                            value={businessModel.costStructure}
                            onChange={(e) => setBusinessModel({ ...businessModel, costStructure: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="revenueStreams" className="form-label">Revenue Streams</label>
                        <textarea
                            className="form-control"
                            id="revenueStreams"
                            value={businessModel.revenueStreams}
                            onChange={(e) => setBusinessModel({ ...businessModel, revenueStreams: e.target.value })}
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={handleSave}>
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default Editor;
