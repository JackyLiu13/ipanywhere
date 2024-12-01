import React from 'react';
import { Link } from 'react-router-dom';
import "./hero.css"
import BackgroundPicture from "../assets/bgPicture.png"
import Card1 from "../assets/card1.gif"
import Card2 from "../assets/card2.gif"
import Card3 from "../assets/card3.gif"
import Card4 from "../assets/card4.gif"

const Hero = () => {
    return (
        <div className="relative min-h-screen css-selector ">
            <img src={BackgroundPicture} className='absolute top-0 left-0 w-full h-full object-cover opacity-25' />

            {/* Main Content Section */}
            <div className="relative w-full max-w-7xl mx-auto px-6 pt-20 ">

                {/* Hero Text */}
                <div className="w-full relative flex flex-row items-stretch">
                    <div className='flex flex-col w-1/2'>
                        <h1 className="text-6xl md:text-7xl font-serif italic mb-4 bg-clip-text w-full bord">
                            Borrow Brilliance,
                            <br />
                            Build Success.
                        </h1>
                        {/* CTA Buttons */}
                        <div className="flex gap-4 mb-20 mt-10">
                            <Link
                                to="/marketplace"
                                className="px-6 py-3 bg-[#272D42] text-white rounded-lg hover:bg-[#272D42]/80 transition-colors"
                            >
                                Explore Patents
                            </Link>
                            <Link
                                to="/sell"
                                className="px-6 py-3 border border-[#272D42] text-[#272D42] rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                List Your Patent
                            </Link>
                        </div>
                    </div>
                    <p className="text-right text-3xl md:text-5xl text-gray-700 mb-12 border-orange-3  w-1/2">
                        <span className="font-thin">Effortlessly manage patent leases</span>, gain actionable insights
                        with analytics, <span className="font-thin">and borrow patents with complete transparency and security</span>.
                    </p>
                </div>



                {/* Feature Cards Grid */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        title="Real-time Analytics"
                        description="Allows leasers visualize their analytics and recommend actionable insights"
                        icon={Card1}
                    />
                    <FeatureCard
                        title="Transparency and Security"
                        description="By using StarkNet tech, smart contracts are non-tamperable and secure."
                        icon={Card2}
                    />
                    <FeatureCard
                        title="Monetizing Dormant IP"
                        description="Generate income, making the most of intellectual property portfolios."
                        icon={Card3}
                    />
                    <FeatureCard
                        title="Global Reach"
                        description="Connecting patent owners and lessees from around the world, broadening opportunities for innovation and commercialization."
                        icon={Card4}
                    />
                </div>
            </div>
        </div>
    );
};

// Define the props interface
interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="bg-white/25 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-105 h-[38vh]">
        <img src={icon} className="text-2xl mb-4 h-1/3 opacity-30"/>
        <h3 className="text-4xl  mb-2">{title}</h3>
        <p className="text-gray-600  text-xl leading-relaxed font-thin ">{description}</p>
    </div>
);


export default Hero;

