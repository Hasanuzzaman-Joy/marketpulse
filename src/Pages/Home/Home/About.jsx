import { motion } from "framer-motion";
import ZoomIn from "../../shared/ZoomIn";
const About = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-15 md:mt-10 md:px-0 px-4 mb-20'>
            <div>
                <ZoomIn>
                    <h1 className='text-3xl font-bold mb-5 text-center md:text-left text-secondary'>
                        About MarketPulse
                    </h1>
                    <p className='font-normal text-base leading-8'>
                        MarketPulse is your trusted platform for tracking daily prices of essential commodities across major US cities. Our mission is to provide consumers with up-to-date, reliable market information that helps them make informed shopping decisions.
                    </p>
                    <p className='font-normal text-base leading-8 pt-3'>
                        With MarketPulse, you can:
                    </p>
                    <ul className='list-disc list-inside font-normal leading-8 mb-3'>
                        <li>Monitor real-time prices of vegetables, fruits, meat, and fish across cities</li>
                        <li>Explore market trends and compare prices between locations</li>
                        <li>Make smart buying decisions based on reliable and daily updated data</li>
                    </ul>

                </ZoomIn>
            </div>
            <div>
                <ZoomIn>
                    <motion.img
                        src="https://res.cloudinary.com/dvkiiyhaj/image/upload/v1753282321/kqb1fwfs920wl43wf3kk.png"
                        alt="MarketPulse About"
                        className='w-3/4 block mx-auto mt-4 md:mt-7 md:rounded-lg'
                        animate={{
                            y: [0, 20, 0],
                            transition: { duration: 3, repeat: Infinity }
                        }}
                    />

                </ZoomIn>
            </div>
        </div>
    );
};

export default About;
