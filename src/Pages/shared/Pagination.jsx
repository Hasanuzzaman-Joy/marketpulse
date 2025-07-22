import Button from "../shared/Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ pages, handlePage, handlePrv, handleNext, currentPage }) => {
    return (
        <div className="flex justify-center items-center mt-7 mb-10 gap-2">
            <Button onClick={handlePrv}> <FaChevronLeft className="inline mr-1" /> </Button>
            {
                pages.map(page => <button key={page} onClick={() => handlePage(page)} className={`w-10 h-10 rounded font-medium font-heading cursor-pointer transition-all duration-500 ${currentPage === page
                        ? "bg-accent text-white"
                        : "bg-secondary hover:bg-accent text-white"
                    }`}>{page}</button>)
            }
            <Button onClick={handleNext}><FaChevronRight className="inline ml-1" /></Button>
        </div>
    );
};

export default Pagination;