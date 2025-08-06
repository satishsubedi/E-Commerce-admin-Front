import { Star } from "lucide-react";

const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <Star
      key={index}
      className={`w-4 h-4 ${
        index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
      }`}
    />
  ));
};

export default renderStars;
