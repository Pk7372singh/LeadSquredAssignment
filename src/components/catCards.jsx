const CatCard = ({ cat, index }) => (
  <div className="border rounded-lg overflow-hidden shadow-md">
    <div className="p-4">
      <img
        src={cat.url}
        alt={`Cat ${index + 1}`}
        className="w-full h-48 object-cover rounded-md"
      />
    </div>
  </div>
);

export default CatCard;
