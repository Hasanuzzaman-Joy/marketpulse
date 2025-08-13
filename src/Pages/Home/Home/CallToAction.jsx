import { Link } from "react-router";

const CallToAction = () => {
    return (
        <section
            className="relative bg-fixed bg-cover bg-center bg-no-repeat mt-14 py-20 px-5 md:px-16"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)),
          url('https://res.cloudinary.com/dvkiiyhaj/image/upload/v1753282646/a3uib0qqmiymkmjkv2vm.jpg')`,
            }}
        >
                <div className="relative w-full md:max-w-screen-xl mx-auto px-4 z-10 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">
                        Stay Ahead of the Market
                    </h2>
                    <p className="text-base md:text-lg mb-8">
                        Explore daily price trends, analyze your local bazar, and make smart buying decisions with MarketPulse.
                    </p>
                    <Link to="/products">
                        <button className="text-white px-3 py-2 rounded bg-secondary hover:bg-accent transition font-semibold cursor-pointer border-2 border-white">
                            Explore Now
                        </button>
                    </Link>
                </div>
        </section>
    );
};

export default CallToAction;