import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Footer() {
  
  const footerLinks = [
    //{ title: 'A propos', href: '/about' },
    // { title: 'Blog', href: '/blog' },  // Possible évolution v3
    // { title: 'Afterbooks', href: '/afterbooks' }, // Possible évolution v3
     //{ title: 'My Books', href: '/my-books' }, // A voir si on en a besoin
    // { title: 'My Borrowings', href: '/borrowings' }, // possible évolution v2
    // { title: 'My Loans', href: '/loans' }, // possible évolution v2
    { title: 'Mentions légales', href: '/legal' },
    // { title: 'App', href: '/app' }, // Possible évolution vX
    //{ title: 'Contactez-nous', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <Link to="/"  className="flex items-center mb-8">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Blablabook</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {footerLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {link.title}
              </a>
            ))}
          </nav>
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Blablabook. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}