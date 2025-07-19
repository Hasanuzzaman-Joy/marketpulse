import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSuccessAlert from "../../../../hooks/useSuccessAlert";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { MdCampaign } from "react-icons/md";
import Button from "../../../shared/Button";
import Loading from "../../../shared/Loading";

const MyAdvertisements = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const showSuccess = useSuccessAlert();

    const {
        data: ads = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["my-ads", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-advertisements?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete your advertisement!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0a472e",
            cancelButtonColor: "#a8b324",
            confirmButtonText: "Yes, delete it!",
        }).then((res) => {
            if (res.isConfirmed) {
                axiosSecure.delete(`/delete-ad/${id}?email=${user?.email}`);
                showSuccess("Deleted!", "Your advertisement has been deleted.", "/my-advertisements");
                refetch();
            }
        });
    };

    return (
        <div className="p-6 md:p-10 bg-white text-main font-body">
            {/* Page Heading */}
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-heading font-bold text-secondary">
                    My Advertisements
                </h2>
                <p className="text-text-secondary text-base md:text-lg">
                    Manage all your ad listings here. You can update or remove them anytime.
                </p>
            </div>

            {/* Content */}
            {isLoading ? (
                <Loading />
            ) : ads.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-3 min-h-[60vh] bg-gray-100">
                    <MdCampaign className="text-secondary text-6xl mb-2" />
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary">
                        You haven’t posted any advertisements yet
                    </h3>
                    <p className="text-text-secondary text-lg leading-7 mb-6">
                        Start promoting your products by adding advertisements.
                    </p>
                    <Link to="/dashboard/add-advertisement">
                        <Button>Add Your First Ad</Button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-bg rounded shadow-sm">
                    <table className="min-w-full text-left text-base text-main">
                        <thead className="bg-secondary text-white text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Ad Title</th>
                                <th className="px-6 py-4">Short Description</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {ads.map((ad, index) => (
                                <tr key={ad._id} className="border-b border-border">
                                    <td className="px-6 py-4 font-bold">{index + 1}</td>
                                    <td className="px-6 py-4">{ad.title}</td>
                                    <td className="px-6 py-4">
                                        {ad.description.length > 40
                                            ? ad.description.slice(0, 40) + "..."
                                            : ad.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${ad.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : ad.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {ad.status || "pending"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2 flex justify-center items-center gap-2">
                                        <Link to={`/dashboard/update-advertisement/${ad._id}`}>
                                            <button className="text-white px-3 py-2 rounded bg-accent hover:bg-secondary transition font-semibold cursor-pointer">Update</button>
                                        </Link>
                                        <Button onClick={() => handleDelete(ad._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAdvertisements;
