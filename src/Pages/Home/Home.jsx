import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "./Components/FeaturedProducts";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../shared/Loading";
import Banner from "./Components/Banner";
import CallToAction from "./Components/CallToAction";
import { Suspense, useEffect } from "react";
import Testimonial from "./Components/Testimonial";
import FeaturedCategory from "./Components/FeaturedCategory";
import Ad from "./Components/Ad";
import Discount from "./Components/Discount";
import OurPartners from "./Components/OurPartners";

const testimonialData = fetch("/testimonial.json").then((res) => res.json());

const Home = () => {
  useEffect(() => {
    document.title = "MarketPulse";
  }, []);

  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featuredProducts", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/getAll-products");
      return res.data.slice(0, 8);
    },
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
      <CallToAction />
      <Suspense fallback={<Loading />}>
        <Testimonial testimonialData={testimonialData}></Testimonial>
      </Suspense>
    </>
  );
};

export default Home;
