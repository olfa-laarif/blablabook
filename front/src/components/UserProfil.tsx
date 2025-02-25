import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../context/AuthContext"; // Import du contexte d'authentification
import { updateUser } from "../services/api";


export default function Profile() {
  const { user,login } = useAuth(); 
 
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    username: "",
    email: "",
    biography: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        lastname: user.lastname,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        biography: user.biography || "", 
      });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser=await updateUser(
        formData.lastname,
        formData.firstname,
        formData.username,
        formData.email,
        formData.biography
      );
      

      login(updatedUser.user); // Met à jour le contexte utilisateur
      setSuccessMessage(updatedUser.message);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Profil</h2>
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nom</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Prénom</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Pseudo</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Biographie</label>
            <textarea name="biography" value={formData.biography} onChange={handleChange} className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:outline-none resize-none"></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-1 font-bold text-white bg-indigo-400 rounded-lg hover:bg-indigo-600">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
