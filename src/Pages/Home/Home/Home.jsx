import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "./FeaturedProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading";

const Home = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: featuredProducts = [], isLoading } = useQuery({
        queryKey: ["featuredProducts", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-products?email=${user?.email}`);
            return res.data.slice(0, 8);
        },
        enabled: !loading && !!user?.email
    });

    if (isLoading) return <Loading />;

    return (
        <main className="px-4 md:px-8 lg:px-16">
            <FeaturedProducts products={featuredProducts} />
        </main>
    );
};

export default Home;
