import React, { useEffect, useState } from 'react';
import { categories } from "@/frontend/constants/categories";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import { Separator } from '../components/ui/separator';
import { getPinList, getFromPinata } from "@/utils/pinata";
import { Loader2, Package, AlertCircle, Calendar, Building } from 'lucide-react';
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Skeleton } from "@/frontend/components/ui/skeleton";

interface Patent {
  patentName: string;
  patentNumber: string;
  companyName: string;
  createdDate: string;
  description?: string;
  category: string;
  subcategory: string;
  price: string;
  imageBase64: string | null;
  pdfBase64: string | null;
  ipfsHash?: string;
  metadata?: {
    keyvalues: {
      company: string;
      category: string;
      subcategory: string;
    }
  }
}

const PatentCard = ({ patent }: { patent: Patent }) => {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden bg-gray-50">
          {patent.imageBase64 ? (
            <img 
              src={patent.imageBase64}
              alt={patent.patentName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-300" />
            </div>
          )}
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
            ${patent.price}/mo
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-lg line-clamp-2 leading-tight">
            {patent.patentName}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="truncate">{patent.companyName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(patent.createdDate).toLocaleDateString()}</span>
            </div>
          </div>

          {patent.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {patent.description}
            </p>
          )}

          <div className="pt-2">
            <span className="text-xs text-gray-400">Patent No: {patent.patentNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ type }: { type: 'loading' | 'error' | 'empty' | 'no-category' }) => {
  const config = {
    loading: {
      icon: <Loader2 className="w-12 h-12 animate-spin text-blue-500" />,
      message: 'Loading patents from IPFS...',
      description: 'Please wait while we fetch the latest patent listings.'
    },
    error: {
      icon: <AlertCircle className="w-12 h-12 text-red-500" />,
      message: 'Failed to load patents',
      description: 'There was an error loading the patents. Please try again later.'
    },
    empty: {
      icon: <Package className="w-12 h-12 text-gray-400" />,
      message: 'No patents listed',
      description: 'No patents are currently listed in the marketplace.'
    },
    'no-category': {
      icon: <Package className="w-12 h-12 text-gray-400" />,
      message: 'No patents in this category',
      description: 'Be the first to list a patent in this category.'
    }
  };

  const { icon, message, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl my-4">
      {icon}
      <p className="mt-4 text-lg font-medium text-gray-900">{message}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-8 pl-16 pt-16">
    {[1, 2].map((category) => (
      <div key={category} className="space-y-4">
        <Skeleton className="h-10 w-64 ml-10" />
        <div className="space-y-4 px-10">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-[300px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ... previous imports remain the same ...

const MarketPlace = () => {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatentsFromIPFS = async () => {
      try {
        setLoading(true);
        const pinList = await getPinList();
        
        // Debug: Log the initial pin list
        console.log('Raw Pin List:', pinList);
        
        // Remove the company filter temporarily to see all pins
        const patentPins = pinList;
        
        if (!patentPins || patentPins.length === 0) {
          console.log('No pins found');
          setPatents([]);
          return;
        }

        const patentPromises = patentPins.map(async (pin: any) => {
          try {
            const patentData = await getFromPinata(pin.ipfs_pin_hash);
            console.log('Patent Data:', patentData); // Debug log

            // Accept any patent data that has the minimum required fields
            if (patentData && patentData.patentName) {
              return {
                ...patentData,
                ipfsHash: pin.ipfs_pin_hash,
                // Set defaults for missing fields to prevent rendering errors
                patentNumber: patentData.patentNumber || 'Unknown',
                companyName: patentData.companyName || 'Unknown Company',
                createdDate: patentData.createdDate || new Date().toISOString(),
                category: patentData.category || 'Technology',
                subcategory: patentData.subcategory || 'Software',
                price: patentData.price || '0',
                description: patentData.description || '',
                imageBase64: patentData.imageBase64 || null,
                pdfBase64: patentData.pdfBase64 || null
              };
            }
            return null;
          } catch (err) {
            console.error(`Error fetching patent with hash ${pin.ipfs_pin_hash}:`, err);
            return null;
          }
        });

        const fetchedPatents = (await Promise.all(patentPromises))
          .filter((p): p is Patent => p !== null);

        console.log('Final processed patents:', fetchedPatents);
        setPatents(fetchedPatents);
      } catch (err) {
        console.error('Error fetching patents:', err);
        setError('Failed to load patents from IPFS');
      } finally {
        setLoading(false);
      }
    };

    fetchPatentsFromIPFS();
  }, []);

  // Simplified category filtering for debugging
  const getPatentsBySubcategory = (categoryTitle: string, subcategoryName: string) => {
    console.log('Filtering for:', categoryTitle, subcategoryName);
    console.log('Available patents:', patents);
    return patents;  // Temporarily return all patents to verify rendering
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <EmptyState type="error" />;
  if (patents.length === 0) return <EmptyState type="empty" />;

  // Debug: Log the patents state before rendering
  console.log('Patents before rendering:', patents);

  // Simplified rendering for debugging
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">All Patents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patents.map((patent, index) => (
          <a href={`/buy/${encodeURIComponent(patent.patentNumber)}`}>
            <PatentCard patent={patent} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;