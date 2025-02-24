import Header from "../components/Header";
import UserProfil from "../components/UserProfil";
import Footer from "../components/Footer";
import LinksUser from "../components/LinksUser";

const SignUpPage = () => {
  return (
    <>
      <Header/>
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
      <LinksUser/>
      <UserProfil/>
      </main>
      <Footer/>
    </>
  );
};

export default SignUpPage;


