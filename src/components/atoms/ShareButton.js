import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

export default function ShareButtons({ url = "#" }) {
  return (
    <div className="flex items-center gap-3">
      <Share2 className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Bagikan:</span>
      <button
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        title="Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        title="Twitter/X"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        title="LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        title="Salin tautan"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
