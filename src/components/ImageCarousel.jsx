import { useState, useEffect, useRef } from "react";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef(null);

  // Car images with attribution
  const carImages = [
    {
      src: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Sports Car",
      description: "Luxury sports car on a scenic road"
    },
    {
      src: "https://images.unsplash.com/photo-1587750059638-e7e8c43b99fc?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Classic Car",
      description: "Vintage classic car in perfect condition"
    },
    {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Luxury SUV",
      description: "Premium SUV on a mountain road"
    },
    {
      src: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Modern Sedan",
      description: "Elegant sedan with sleek design"
    },
    {
      src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Electric Vehicle",
      description: "Modern electric car with clean design"
    }
  ];

  // Auto-advance the carousel
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, carImages.length]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <h1 className="text-3xl font-bold text-white mb-2">Car Gallery</h1>
      <p className="text-gray-300 mb-8">Explore our collection of premium vehicles</p>
      
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
        {/* Carousel container */}
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {carImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold">{image.title}</h3>
                <p className="text-gray-200">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <button 
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-md transition-all"
          aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlay ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Swipe, use arrow buttons, or click on dots to navigate</p>
        <p>Images from Unsplash - free to use</p>
      </div>
    </div>
  );
}