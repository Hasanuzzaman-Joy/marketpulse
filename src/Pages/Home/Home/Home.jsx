import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "./FeaturedProducts";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading";
import Banner from "./Banner";
import About from "./About";
// import Faq from "./Faq";
import { Suspense, useEffect } from "react";
import Testimonial from "./Testimonial";
import FeaturedCategory from "./FeaturedCategory";
import Ad from "./Ad";
import Discount from "./Discount";
import OurPartners from "./OurPartners";

// const faqData = fetch('/faq.json').then(res => res.json());
const testimonialData = fetch('/testimonial.json').then(res => res.json());

const Home = () => {

    useEffect(() => {
        document.title = "MarketPulse"
    }, [])

    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: featuredProducts = [], isLoading } = useQuery({
        queryKey: ["featuredProducts", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get("/getAll-products");
            return res.data.slice(0, 8);
        }
    });

    if (isLoading) return <Loading />;

    return (
        <>
            <Banner />
            <FeaturedCategory />
            <Ad />
            <FeaturedProducts products={featuredProducts} />
            <OurPartners />
            <Discount />
            <Suspense fallback={<Loading />}>
                <Testimonial testimonialData={testimonialData}></Testimonial>
            </Suspense>
            {/* <Suspense fallback={<Loading />}>
                <Faq faqData={faqData} />
            </Suspense> */}
        </>
    );
};

export default Home;
