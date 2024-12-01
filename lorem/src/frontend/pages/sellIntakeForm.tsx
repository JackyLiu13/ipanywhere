import React, { useState } from 'react';
import { Slider } from "@/frontend/components/ui/slider";
import { Progress } from "@/frontend/components/ui/progress";
import { Upload, Check, X, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadJSONToPinata } from "../../utils/pinata";

interface Patent {
    patentName: string;
    patentNumber: string;
    date: string;
    companyName: string;
    category: string;
    subcategory: string;
    imageBase64: string | null;
    pdfBase64: string | null;
    price: string;
    months: number;
    description: string;
    ipfsHash?: string;
    currentOwner?: string;
    previousOwners?: string[];
    transferHistory?: {
        from: string;
        to: string;
        date: string;
        price: string;
    }[];
}

interface UploadState {
    image: 'idle' | 'uploading' | 'success' | 'error';
    pdf: 'idle' | 'uploading' | 'success' | 'error';
}

const PatentIntakeForm = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<Patent>({
        patentName: '',
        patentNumber: '',
        date: '',
        companyName: '',
        category: '',
        subcategory: '',
        imageBase64: null,
        pdfBase64: null,
        price: '',
        months: 1,
        description: '',
        previousOwners: [],
        transferHistory: []
    });

    const [uploadState, setUploadState] = useState<UploadState>({
        image: 'idle',
        pdf: 'idle'
    });

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('');
    const [errorMessage, setErrorMessage] = useState({ image: '', pdf: '' });

    // Convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrorMessage(prev => ({ ...prev, image: 'Please upload a valid image file' }));
            setUploadState(prev => ({ ...prev, image: 'error' }));
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage(prev => ({ ...prev, image: 'File size must be less than 10MB' }));
            setUploadState(prev => ({ ...prev, image: 'error' }));
            return;
        }

        try {
            setUploadState(prev => ({ ...prev, image: 'uploading' }));
            const base64String = await fileToBase64(file);
            
            setFormData(prev => ({
                ...prev,
                imageBase64: base64String
            }));
            setUploadState(prev => ({ ...prev, image: 'success' }));
            setErrorMessage(prev => ({ ...prev, image: '' }));
        } catch (error) {
            setErrorMessage(prev => ({ ...prev, image: 'Failed to process image' }));
            setUploadState(prev => ({ ...prev, image: 'error' }));
        }
    };

    const handlePDFChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setErrorMessage(prev => ({ ...prev, pdf: 'Please upload a PDF file' }));
            setUploadState(prev => ({ ...prev, pdf: 'error' }));
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage(prev => ({ ...prev, pdf: 'File size must be less than 10MB' }));
            setUploadState(prev => ({ ...prev, pdf: 'error' }));
            return;
        }

        try {
            setUploadState(prev => ({ ...prev, pdf: 'uploading' }));
            const base64String = await fileToBase64(file);
            
            setFormData(prev => ({
                ...prev,
                pdfBase64: base64String
            }));
            setUploadState(prev => ({ ...prev, pdf: 'success' }));
            setErrorMessage(prev => ({ ...prev, pdf: '' }));
        } catch (error) {
            setErrorMessage(prev => ({ ...prev, pdf: 'Failed to process PDF' }));
            setUploadState(prev => ({ ...prev, pdf: 'error' }));
        }
    };

    const renderUploadState = (type: 'image' | 'pdf') => {
        const state = uploadState[type];
        const error = errorMessage[type];
        
        switch (state) {
            case 'uploading':
                return (
                    <div className="flex flex-col items-center space-y-2 text-blue-600">
                        <Loader2 className="animate-spin" size={24} />
                        <span>Processing {type}...</span>
                    </div>
                );
            case 'success':
                return (
                    <div className="flex flex-col items-center space-y-2 text-green-600">
                        <Check size={24} />
                        <div className="flex items-center space-x-2">
                            <FileText size={16} />
                            <span className="text-sm">{type === 'image' ? 'Image' : 'PDF'} uploaded</span>
                        </div>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex flex-col items-center space-y-2 text-red-600">
                        <X size={24} />
                        <span className="text-sm">{error}</span>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center space-y-2 text-gray-600">
                        <Upload size={24} />
                        <span className="text-sm">Drop {type} here or click to upload</span>
                        <span className="text-xs text-gray-500">(Max size: 10MB)</span>
                    </div>
                );
        }
    };

    const isFormValid = (): boolean => {
        return Boolean(
            formData.patentName &&
            formData.patentNumber &&
            formData.date &&
            formData.companyName &&
            formData.category &&
            formData.subcategory &&
            formData.imageBase64 &&
            formData.pdfBase64 &&
            formData.price &&
            formData.description
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!isFormValid()) {
            alert("Please fill out all required fields and upload both files.");
            return;
        }

        try {
            setLoading(true);
            setProgress(20);
            setLoadingText('Preparing data for IPFS...');

            // Mock user data (replace with actual auth)
            const currentOwner = {
                address: '0xMockAddress',
                name: 'Mock User'
            };

            // Prepare patent data with ownership info
            const patentData = {
                ...formData,
                currentOwner: currentOwner.address,
                previousOwners: [],
                transferHistory: []
            };

            setProgress(50);
            setLoadingText('Uploading to IPFS...');

            // In handleSubmit of Sell component
                const uploadResponse = await uploadJSONToPinata(patentData, {
                    pinataMetadata: {
                        name: formData.patentNumber,
                        keyvalues: {
                            company: 'PatentMarketplace',
                            patentNumber: formData.patentNumber,
                            category: formData.category,
                            subcategory: formData.subcategory
                        }
                    }
                });

            console.log('IPFS Upload Response:', uploadResponse);

            if (!uploadResponse?.ipfsHash) {
                throw new Error('Failed to get IPFS hash from upload');
            }

            // Mock Starknet transaction
            console.log('Simulated Starknet transaction:', {
                type: 'PATENT_CREATION',
                patentNumber: formData.patentNumber,
                owner: currentOwner.address,
                ipfsHash: uploadResponse.ipfsHash
            });

            setFormData(prev => ({ ...prev, ipfsHash: uploadResponse.ipfsHash }));
            setProgress(100);
            setLoadingText('Upload complete! Redirecting to marketplace...');
            
            setTimeout(() => {
                navigate('/marketplace');
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            setLoadingText('Error occurred during submission. Please try again.');
            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    // ... Rest of your component's JSX stays the same ...
    return (
        <>
            {loading && <Progress value={progress} />}
            <form onSubmit={handleSubmit} className="w-full p-4 flex flex-row justify-center gap-x-4 mx-16">
                <div className="flex flex-col shadow-md rounded-lg border w-1/3 p-4 mt-16">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                                accept="image/*"
                                disabled={loading}
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                                {renderUploadState('image')}
                            </label>
                            {formData.imageBase64 && (
                                <div className="mt-4">
                                    <img
                                        src={formData.imageBase64}
                                        alt="Preview"
                                        className="max-w-full h-auto rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
                        <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                            <input
                                type="file"
                                onChange={handlePDFChange}
                                className="hidden"
                                id="pdf-upload"
                                accept="application/pdf"
                                disabled={loading}
                            />
                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                {renderUploadState('pdf')}
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2 h-32 resize-none"
                            placeholder="Enter your patent description here..."
                            required
                        />
                    </div>
                </div>

                <div className="w-1/3 shadow-md rounded-lg border p-4 mt-16">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Patent Name</label>
                        <input
                            type="text"
                            value={formData.patentName}
                            onChange={(e) => setFormData(prev => ({ ...prev, patentName: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Patent Number</label>
                        <input
                            type="text"
                            value={formData.patentNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, patentNumber: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                            disabled={loading}
                        >
                            <option value="">Select category</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Energy">Energy</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select
                            value={formData.subcategory}
                            onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                            disabled={loading}
                        >
                            <option value="">Select subcategory</option>
{formData.category === 'Technology' && (
   <>
       <option value="Software">Software</option>
       <option value="Hardware">Hardware</option>
       <option value="AI">AI</option>
   </>
)}
{formData.category === 'Healthcare' && (
   <>
       <option value="Medical Devices">Medical Devices</option>
       <option value="Pharmaceuticals">Pharmaceuticals</option>
       <option value="Biotechnology">Biotechnology</option>
   </>
)}
{formData.category === 'Energy' && (
   <>
       <option value="Renewable">Renewable</option>
       <option value="Storage">Storage</option>
       <option value="Grid">Grid</option>
   </>
)}
                       </select>
                   </div>

                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">Date</label>
                       <input
                           type="date"
                           value={formData.date}
                           onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                           className="mt-1 block w-full border rounded-md p-2"
                           required
                           disabled={loading}
                       />
                   </div>

                   <div className="mb-4">
                       <label className="block text-sm font-medium text-gray-700">Price per Month</label>
                       <input
                           type="number"
                           value={formData.price}
                           onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                           className="mt-1 block w-full border rounded-md p-2"
                           placeholder="Enter price in USD"
                           step="0.01"
                           required
                           disabled={loading}
                       />
                   </div>

                   <div className="mb-6">
                       <label className="block text-sm font-medium text-gray-700">Number of Months Available</label>
                       <Slider
                           defaultValue={[formData.months]}
                           max={24}
                           step={1}
                           onValueChange={(value) => setFormData(prev => ({ ...prev, months: value[0] }))}
                           disabled={loading}
                       />
                       <p className="mt-2 text-sm text-gray-600">Selected Months: {formData.months}</p>
                   </div>

                   <button
                       type="submit"
                       className="w-full bg-[#272D42] text-white font-light py-2 rounded-md hover:bg-[#363f5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                       disabled={loading || !isFormValid()}
                   >
                       {loading ? 'Uploading...' : 'Upload Patent'}
                   </button>
               </div>
           </form>

           {loadingText && (
               <div className="flex items-center w-full text-center mt-8 text-xl">
                   <div className="w-full">{loadingText}</div>
               </div>
           )}
       </>
   );
};

export default PatentIntakeForm;