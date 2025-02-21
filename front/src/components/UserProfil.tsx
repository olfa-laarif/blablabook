import { useAuth } from "../context/AuthContext";


export default function Profil() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Profil</h2>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nom</label>
            <input type="text" name="lastname" value={user?.lastname || ""} disabled className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Prénom</label>
            <input type="text" name="firstname" value={user?.firstname || ""} disabled className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Pseudo</label>
            <input type="text" name="username" value={user?.username || ""} disabled className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" name="email" value={user?.email || ""} disabled className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Biographie</label>
            <textarea name="A propos de moi" value={user?.biography || ""} disabled className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-none"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
