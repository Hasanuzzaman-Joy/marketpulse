const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/10">
            <div className="bg-white backdrop-blur-md shadow-lg rounded-xl w-full max-w-2xl p-6 md:p-8 relative border border-white/40">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-800 hover:text-accent font-bold cursor-pointer"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
