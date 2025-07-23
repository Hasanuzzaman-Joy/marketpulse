import { use } from "react";
import StarRatings from "react-star-ratings";

const Testimonial = ({ testimonialData }) => {
    const testimonial = use(testimonialData);

    return (
        <div className=" mt-20 ">
            <h2 className="text-3xl font-heading font-bold text-secondary mb-6">
                Real Reviews, Real Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    testimonial.map((test, index) => (
                        <div key={index} className="flex flex-col w-full p-1 mx-auto divide-y divide-gray-300 rounded-md shadow bg-white">
                            <div className="flex justify-between p-4">
                                <div className="flex space-x-4">
                                    <div>
                                        <img
                                            src={test.avatar}
                                            alt={test.name}
                                            className="object-cover w-12 h-12 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#242253]">{test.name}</h4>
                                        <span className="text-xs">{test.date}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-x-2 ">
                                    <StarRatings
                                        rating={test.rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        starDimension="18px"
                                        starSpacing="1px"
                                        name="rating"
                                    />
                                    <div className="text-base font-bold text-[#242253]">{test.rating}</div>
                                </div>
                            </div>
                            <div className="p-4 space-y-2 text-sm ">
                                {test.feedback.map((line, index) => (
                                    <p key={index} className='text-base leading-7'>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Testimonial;