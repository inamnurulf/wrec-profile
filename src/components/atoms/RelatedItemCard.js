export default function RelatedItemCard({ item }) {
  return (
    <li className="flex items-center gap-3">
      <a
        href={`/articles/${item.slug}`}
        className="flex items-center gap-3 group"
      >
        <img
          src={item.thumb}
          alt={item.title}
          className="w-16 h-16 rounded object-cover"
        />
        <div>
          <div className="text-sm font-medium group-hover:underline">
            {item.title}
          </div>
          {item.date && (
            <div className="text-xs text-gray-500">{item.date}</div>
          )}
        </div>
      </a>
    </li>
  );
}
