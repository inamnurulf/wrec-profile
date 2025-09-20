export default function RelatedItemCard({ item }) {
  return (
    <li className="flex gap-3 group">
      <img
        src={item.thumb}
        alt={item.title}
        className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div>
        <p className="text-sm text-gray-500">{item.date}</p>
        <p className="font-medium group-hover:text-emerald-700 transition-colors">
          {item.title}
        </p>
      </div>
    </li>
  );
}
