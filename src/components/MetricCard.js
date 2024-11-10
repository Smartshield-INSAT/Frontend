const MetricCard = ({ title, value, subtext ="" }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    );
  }

export default MetricCard;