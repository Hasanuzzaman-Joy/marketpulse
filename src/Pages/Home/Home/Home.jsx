import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "./FeaturedProducts";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading";
import Banner from "./Banner";
import About from "./About";
import CallToAction from "./CallToAction";
import Container from "../../shared/Container";
// import Faq from "./Faq";
import { Suspense, useEffect } from "react";
import Testimonial from "./Testimonial";
import AdSlider from "./AdSlider";

// const faqData = fetch('/faq.json').then(res => res.json());
const testimonialData = fetch('/testimonial.json').then(res => res.json());

const Home = () => {

    useEffect(() => {
        document.title = "MarketPulse"
    }, [])

    const { user } = useAuth();
    const axiosInstance= useAxios();

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
            <main className="px-4 md:px-8 lg:px-16">
                <Container>
                    <About />
                    <FeaturedProducts products={featuredProducts} />
                    <Suspense fallback={<Loading />}>
                        <Testimonial testimonialData={testimonialData}></Testimonial>
                    </Suspense>
                    <AdSlider />
                </Container>
                {/* <Suspense fallback={<Loading />}>
                <Faq faqData={faqData} />
            </Suspense> */}
            </main>
            <CallToAction />
        </>
    );
};

export default Home;
