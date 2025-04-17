
const helpers = {
    navigate: function(array, navigate){
        navigate(`/featured`, {
          state: {
            gender: array.gender,
            category: array.category,
            fabric: array.fabric,
            rating: array.rating,
            size: array.size,
            color: array.color,
            discount: array.discount,
          },
        });
      }
}

export default helpers;