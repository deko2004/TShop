import React from "react";

const Reviews = ({ rating, reviews, isDark, productId }) => {
  // Example review data (in a real app, this would come from an API)
  const reviewsList = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2023-12-01",
      comment: "Excellent product! The sound quality is amazing.",
      verified: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2023-11-28",
      comment: "Good value for money. Battery life could be better.",
      verified: true,
    },
  ];

  return (
    <div>
      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{rating}</div>
          <div className="flex text-yellow-400 justify-center">
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className={`w-5 h-5 ${
                  idx < Math.floor(rating) ? "fill-current" : "fill-gray-300"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.93 5.781 1.4 8.168L12 18.896l-7.338 3.863 1.4-8.168-5.93-5.781 8.2-1.192z" />
              </svg>
            ))}
          </div>
          <p
            className={`mt-1 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Based on {reviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 max-w-md">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <div className="text-sm w-6">{star}</div>
              <div className="flex-1 h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{
                    width: `${
                      (reviewsList.filter((r) => Math.floor(r.rating) === star)
                        .length /
                        reviewsList.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviewsList.map((review) => (
          <div
            key={review.id}
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{review.user}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, idx) => (
                      <svg
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating ? "fill-current" : "fill-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.93 5.781 1.4 8.168L12 18.896l-7.338 3.863 1.4-8.168-5.93-5.781 8.2-1.192z" />
                      </svg>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-green-500 text-sm">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
