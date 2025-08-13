import React from 'react';

const FeaturedCategory = () => {
  const categories = [
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463327/ykpjzwtuhmcjdimziwov.png',
      title: 'Fruits',
      subtitle: 'Fresh & juicy',
    },
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463326/nbjfilqirimabszo3i5b.png',
      title: 'Vegetables',
      subtitle: 'Green & healthy',
    },
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463327/y5pcl2qa8gk9ofzembzc.png',
      title: 'Grains',
      subtitle: 'Nutritious staples',
    },
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463327/vizvgel4jqwsyzv1rly4.png',
      title: 'Dairy',
      subtitle: 'Quality products',
    },
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463327/rimjw9g1e3tlbcwwfery.png',
      title: 'Canned Products',
      subtitle: 'Shelf-stable essentials',
    },
    {
      icon: 'https://res.cloudinary.com/dvkiiyhaj/image/upload/v1754463327/jmjrrii0gya0j17c9knh.png',
      title: 'Oils',
      subtitle: 'Pure cooking oils',
    },
  ];

  return (
    <section className="w-full md:max-w-screen-xl mx-auto px-4 mt-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
        {categories.map(({ icon, title, subtitle }, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Circle background with image */}
            <div className="w-20 h-20 bg-indigo-100 rounded-full shadow-xl flex items-center justify-center mb-4">
              <img
                src={icon}
                alt={title}
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Title */}
            <h4 className="text-lg font-bold text-gray-800 mb-1">{title}</h4>

            {/* Subtitle */}
            <p className="text-base text-gray-500">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategory;
