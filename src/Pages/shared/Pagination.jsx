import Button from "../shared/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ pages, handlePage, handlePrv, handleNext, currentPage }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pages.length;

    return (
        <div className="flex justify-center items-center mt-20 gap-2">
            {/* Previous Button */}
            <Button
                onClick={!isFirstPage ? handlePrv : null}
                disabled={isFirstPage}
                className={`transition-all duration-300 ${isFirstPage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <FaChevronLeft className="inline mr-1" />
            </Button>

            {/* Page Buttons */}
            {
                pages.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePage(page)}
                        className={`w-10 h-10 rounded font-medium font-heading cursor-pointer transition-all duration-500 ${currentPage === page
                            ? "bg-accent text-white"
                            : "bg-secondary hover:bg-accent text-white"
                            }`}>
                        {page}
                    </button>
                ))
            }

            {/* Next Button */}
            <Button
                onClick={!isLastPage ? handleNext : null}
                disabled={isLastPage}
                className={`transition-all duration-300 ${isLastPage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <FaChevronRight className="inline ml-1" />
            </Button>
        </div>
    );
};

export default Pagination;
