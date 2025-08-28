import Modal from "../../shared/Modal";
import Button from "../../shared/Button";

const RejectionModal = ({ isOpen, onClose, rejectionReason, rejectionFeedback }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-main font-body space-y-4">
                <h2 className="text-2xl font-bold font-heading text-center text-primary">Product Rejected</h2>
                <div>
                    <h3 className="font-semibold text-base mb-1">Reason:</h3>
                    <p className="bg-gray-100 border border-accent p-3 rounded">{rejectionReason || "No reason provided"}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-base mb-1">Feedback:</h3>
                    <p className="bg-gray-100 border border-accent p-3 rounded">{rejectionFeedback || "No feedback provided"}</p>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RejectionModal;
