// back/data/booksData.js
/*const booksData = [
  // Livres 1 à 10 (exemples déjà existants)
  {
    title: "L'Étranger",
    summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
    published_date: "1942-06-01",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: false,
  },
  {
    title: "La Peste",
    summary: "Un récit sur la lutte collective face à une épidémie dévastatrice.",
    published_date: "1947-05-10",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true,
  },
  {
    title: "Le Mythe de Sisyphe",
    summary: "Un essai philosophique sur l'absurde et la condition humaine.",
    published_date: "1942-10-15",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false,
  },
  {
    title: "Caligula",
    summary: "Une pièce de théâtre sur la folie du pouvoir absolu.",
    published_date: "1958-06-01",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true,
  },
  {
    title: "La Chute",
    summary: "Un roman introspectif sur la déchéance morale d'un homme.",
    published_date: "1956-09-10",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true,
  },
  {
    title: "Le Premier Homme",
    summary: "Un récit autobiographique posthume retraçant les origines de l'auteur.",
    published_date: "1994-01-01",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true,
  },
  {
    title: "Noces",
    summary: "Des essais poétiques célébrant l'amour et la nature.",
    published_date: "1938-07-01",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false,
  },
  {
    title: "L'Exil et le Royaume",
    summary: "Recueil de nouvelles mêlant mythe et modernité.",
    published_date: "1957-04-01",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true,
  },
  {
    title: "Les Misérables",
    summary: "Une épopée sur la lutte pour la justice et la rédemption.",
    published_date: "1862-01-01",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false,
  },
  {
    title: "Notre-Dame de Paris",
    summary: "Un récit tragique autour de la cathédrale emblématique de Paris.",
    published_date: "1831-03-16",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true,
  },
  // Livres 11 à 20 – Genres variés
  {
    title: "Amour et Destinée",
    summary: "Un roman d'amour passionné et tragique.",
    published_date: "2000-02-14",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true,
  },
  {
    title: "Coeurs en Fête",
    summary: "Une histoire d'amour et de retrouvailles inattendues.",
    published_date: "2001-03-12",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: false,
  },
  {
    title: "Mystère en Ville",
    summary: "Un polar captivant où chaque indice mène à une vérité surprenante.",
    published_date: "2001-07-20",
    image: "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false,
  },
  {
    title: "L'Enquête Implacable",
    summary: "Une intrigue policière où rien n'est laissé au hasard.",
    published_date: "2002-05-15",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true,
  },
  {
    title: "Les Royaumes Oubliés",
    summary: "Une épopée fantastique dans un monde de magie et de mystères.",
    published_date: "2002-11-05",
    image: "https://images.unsplash.com/photo-1526481280698-69eab4b8f07e?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true,
  },
  {
    title: "Le Sortilège du Dragon",
    summary: "Une aventure épique où un jeune héros affronte des créatures légendaires.",
    published_date: "2003-08-22",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true,
  },
  {
    title: "Sous le Ciel d'Été",
    summary: "Une histoire tendre et poétique d'amour d'été.",
    published_date: "2004-06-10",
    image: "https://images.unsplash.com/photo-1524623655661-dff1f5d25f48?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false,
  },
  {
    title: "L'Ombre du Crime",
    summary: "Une enquête sombre dans les rues d'une métropole en péril.",
    published_date: "2005-10-05",
    image: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true,
  },
  {
    title: "Les Portes de l'Inconnu",
    summary: "Un voyage mystique dans des mondes parallèles.",
    published_date: "2006-04-18",
    image: "https://images.unsplash.com/photo-1517971071642-3f3d3d46c8ed?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: false,
  },
  {
    title: "L'Écho des Sentiments",
    summary: "Une histoire émouvante où les émotions résonnent au-delà du temps.",
    published_date: "2007-12-25",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true,
  },
  {
    title: "L'Étranger",
    summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
    published_date: "1942-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Le Petit Prince",
    summary: "Une histoire intemporelle sur l'amour, l'amitié et la vie.",
    published_date: "1943-04-06",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Madame Bovary",
    summary: "L'histoire tragique d'une femme prisonnière de ses rêves et de ses désillusions.",
    published_date: "1857-12-01",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: false
  },
  {
    title: "Les Misérables",
    summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
    published_date: "1862-01-01",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Notre-Dame de Paris",
    summary: "Une histoire tragique se déroulant autour de la cathédrale de Paris.",
    published_date: "1831-03-16",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Les Fleurs du Mal",
    summary: "Une collection de poèmes explorant la beauté et la décadence.",
    published_date: "1857-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true
  }
];
*/
/*const authors = [
  {
    firstname: "Albert",
    lastname: "Camus",
    biography: "Albert Camus est un écrivain, philosophe et journaliste français, lauréat du prix Nobel de littérature en 1957."
  },
  {
    firstname: "Antoine",
    lastname: "de Saint-Exupéry",
    biography: "Antoine de Saint-Exupéry est un écrivain, poète et aviateur français, célèbre pour son œuvre intemporelle 'Le Petit Prince'."
  },
  {
    firstname: "Gustave",
    lastname: "Flaubert",
    biography: "Gustave Flaubert est un écrivain français du XIXe siècle, considéré comme un maître du réalisme, auteur de 'Madame Bovary'."
  },
  {
    firstname: "Victor",
    lastname: "Hugo",
    biography: "Victor Hugo est un écrivain, poète et homme politique français, auteur emblématique de 'Les Misérables' et 'Notre-Dame de Paris'."
  },
  {
    firstname: "Charles",
    lastname: "Baudelaire",
    biography: "Charles Baudelaire est un poète français célèbre pour sa collection de poèmes 'Les Fleurs du Mal', qui a marqué la littérature moderne."
  },
  {
    firstname: "Jean-Paul",
    lastname: "Sartre",
    biography: "Jean-Paul Sartre est un philosophe, dramaturge et écrivain français, figure de proue de l'existentialisme."
  },
  {
    firstname: "Émile",
    lastname: "Zola",
    biography: "Émile Zola est un écrivain et journaliste français, chef de file du naturalisme, connu pour sa série 'Les Rougon-Macquart'."
  },
  {
    firstname: "Marcel",
    lastname: "Proust",
    biography: "Marcel Proust est un écrivain français, auteur de l'œuvre monumentale 'À la recherche du temps perdu'."
  },
  {
    firstname: "Alexandre",
    lastname: "Dumas",
    biography: "Alexandre Dumas est un écrivain français, célèbre pour ses romans historiques comme 'Les Trois Mousquetaires' et 'Le Comte de Monte-Cristo'."
  },
  {
    firstname: "Stendhal",
    lastname: "",
    biography: "Stendhal, de son vrai nom Henri Beyle, est un écrivain français du XIXe siècle, connu pour 'Le Rouge et le Noir' et 'La Chartreuse de Parme'."
  },
  {
    firstname: "Jules",
    lastname: "Verne",
    biography: "Jules Verne est un écrivain français, pionnier de la science-fiction, auteur de 'Vingt Mille Lieues sous les mers' et 'Le Tour du monde en 80 jours'."
  },
  {
    firstname: "Molière",
    lastname: "",
    biography: "Molière, de son vrai nom Jean-Baptiste Poquelin, est un dramaturge et comédien français du XVIIe siècle, maître de la comédie classique."
  }
];*/


/*const featuredBooks = [
  {
    title: "L'Étranger",
    summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
    published_date: "1942-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "La Peste",
    summary: "Un récit sur la lutte collective face à une épidémie dévastatrice.",
    published_date: "1947-05-10",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Le Mythe de Sisyphe",
    summary: "Un essai philosophique sur l'absurde et la condition humaine.",
    published_date: "1942-10-15",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false
  },
  {
    title: "Caligula",
    summary: "Une pièce de théâtre sur la folie du pouvoir absolu.",
    published_date: "1958-06-01",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true
  },
  {
    title: "La Chute",
    summary: "Un roman introspectif sur la déchéance morale d'un homme.",
    published_date: "1956-09-10",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true
  },
  {
    title: "Le Premier Homme",
    summary: "Un récit autobiographique posthume retraçant les origines de l'auteur.",
    published_date: "1994-01-01",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true
  },
  {
    title: "Noces",
    summary: "Des essais poétiques célébrant l'amour et la nature.",
    published_date: "1938-07-01",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false
  },
  {
    title: "L'Exil et le Royaume",
    summary: "Recueil de nouvelles mêlant mythe et modernité.",
    published_date: "1957-04-01",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true
  },
  {
    title: "Les Misérables",
    summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
    published_date: "1862-01-01",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Notre-Dame de Paris",
    summary: "Un récit tragique autour de la cathédrale emblématique de Paris.",
    published_date: "1831-03-16",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Amour et Destinée",
    summary: "Un roman d'amour passionné et tragique.",
    published_date: "2000-02-14",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true
  },
  {
    title: "Coeurs en Fête",
    summary: "Une histoire d'amour et de retrouvailles inattendues.",
    published_date: "2001-03-12",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: false
  },
  {
    title: "Mystère en Ville",
    summary: "Un polar captivant où chaque indice mène à une vérité surprenante.",
    published_date: "2001-07-20",
    image: "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false
  },
  {
    title: "L'Enquête Implacable",
    summary: "Une intrigue policière où rien n'est laissé au hasard.",
    published_date: "2002-05-15",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true
  },
  {
    title: "Les Royaumes Oubliés",
    summary: "Une épopée fantastique dans un monde de magie et de mystères.",
    published_date: "2002-11-05",
    image: "https://images.unsplash.com/photo-1526481280698-69eab4b8f07e?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true
  },
  {
    title: "Le Sortilège du Dragon",
    summary: "Une aventure épique où un jeune héros affronte des créatures légendaires.",
    published_date: "2003-08-22",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: true
  },
  {
    title: "Sous le Ciel d'Été",
    summary: "Une histoire tendre et poétique d'amour d'été.",
    published_date: "2004-06-10",
    image: "https://images.unsplash.com/photo-1524623655661-dff1f5d25f48?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: false
  },
  {
    title: "L'Ombre du Crime",
    summary: "Une enquête sombre dans les rues d'une métropole en péril.",
    published_date: "2005-10-05",
    image: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?auto=format&fit=crop&w=400&q=80",
    status: "en cours",
    availability: true
  },
  {
    title: "Les Portes de l'Inconnu",
    summary: "Un voyage mystique dans des mondes parallèles.",
    published_date: "2006-04-18",
    image: "https://images.unsplash.com/photo-1517971071642-3f3d3d46c8ed?auto=format&fit=crop&w=400&q=80",
    status: "à lire",
    availability: false
  },
  {
    title: "L'Écho des Sentiments",
    summary: "Une histoire émouvante où les émotions résonnent au-delà du temps.",
    published_date: "2007-12-25",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    status: "lu",
    availability: true
  },
  {
    title: "Les Fleurs du Mal",
    summary: "Une collection de poèmes explorant la beauté et la décadence.",
    published_date: "1857-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true
  }
];

*/


/*
const featuredTenBooks = [
  {
    title: "L'Étranger",
    summary: "Un roman philosophique qui explore l'absurdité de la condition humaine.",
    published_date: "1942-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Le Petit Prince",
    summary: "Une histoire intemporelle sur l'amour, l'amitié et la vie.",
    published_date: "1943-04-06",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Madame Bovary",
    summary: "L'histoire tragique d'une femme prisonnière de ses rêves et de ses désillusions.",
    published_date: "1857-12-01",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: false
  },
  {
    title: "Les Misérables",
    summary: "Une fresque épique sur la lutte pour la justice et la rédemption.",
    published_date: "1862-01-01",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
    status: "lu",
    availability: true
  },
  {
    title: "Notre-Dame de Paris",
    summary: "Une histoire tragique se déroulant autour de la cathédrale de Paris.",
    published_date: "1831-03-16",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400",
    status: "à lire",
    availability: true
  },
  {
    title: "Les Fleurs du Mal",
    summary: "Une collection de poèmes explorant la beauté et la décadence.",
    published_date: "1857-06-01",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "en cours",
    availability: true
  }
];

*/ 

/*
const authors = [
  {
    firstname: "Albert",
    lastname: "Camus",
    biography: "Albert Camus est un écrivain, philosophe et journaliste français, lauréat du prix Nobel de littérature en 1957."
  },
  {
    firstname: "Antoine",
    lastname: "de Saint-Exupéry",
    biography: "Antoine de Saint-Exupéry est un écrivain, poète et aviateur français, célèbre pour son œuvre intemporelle 'Le Petit Prince'."
  },
  {
    firstname: "Gustave",
    lastname: "Flaubert",
    biography: "Gustave Flaubert est un écrivain français du XIXe siècle, considéré comme un maître du réalisme, auteur de 'Madame Bovary'."
  },
  {
    firstname: "Victor",
    lastname: "Hugo",
    biography: "Victor Hugo est un écrivain, poète et homme politique français, auteur emblématique de 'Les Misérables' et 'Notre-Dame de Paris'."
  },
  {
    firstname: "Charles",
    lastname: "Baudelaire",
    biography: "Charles Baudelaire est un poète français célèbre pour sa collection de poèmes 'Les Fleurs du Mal', qui a marqué la littérature moderne."
  }
];
 */

/*
const categories = [
  {
    name: "Philosophie" // Correspond à "L'Étranger"
  },
  {
    name: "Littérature jeunesse" // Correspond à "Le Petit Prince"
  },
  {
    name: "Roman réaliste" // Correspond à "Madame Bovary"
  },
  {
    name: "Roman historique" // Correspond à "Les Misérables"
  },
  {
    name: "Roman gothique" // Correspond à "Notre-Dame de Paris"
  },
  {
    name: "Poésie" // Correspond à "Les Fleurs du Mal"
  }
];

const categories = [
  {
    name: "Philosophie", // "L'Étranger", "Huis clos"
    books: ["L'Étranger", "Huis clos"]
  },
  {
    name: "Littérature jeunesse", // "Le Petit Prince"
    books: ["Le Petit Prince"]
  },
  {
    name: "Roman réaliste", // "Madame Bovary", "Germinal", "Le Rouge et le Noir"
    books: ["Madame Bovary", "Germinal", "Le Rouge et le Noir"]
  },
  {
    name: "Roman historique", // "Les Misérables", "Le Comte de Monte-Cristo"
    books: ["Les Misérables", "Le Comte de Monte-Cristo"]
  },
  {
    name: "Roman gothique", // "Notre-Dame de Paris"
    books: ["Notre-Dame de Paris"]
  },
  {
    name: "Poésie", // "Les Fleurs du Mal"
    books: ["Les Fleurs du Mal"]
  },
  {
    name: "Roman psychologique", // "À la recherche du temps perdu", "Le Rouge et le Noir"
    books: ["À la recherche du temps perdu", "Le Rouge et le Noir"]
  },
  {
    name: "Dystopie", // "Huis clos" (en partie existentialiste et dystopique)
    books: ["Huis clos"]
  },
  {
    name: "Science-fiction", // "Vingt Mille Lieues sous les mers"
    books: ["Vingt Mille Lieues sous les mers"]
  },
  {
    name: "Aventure", // "Les Trois Mousquetaires", "Le Tour du monde en 80 jours"
    books: ["Les Trois Mousquetaires", "Le Tour du monde en 80 jours"]
  },
  {
    name: "Roman épistolaire", // "La Chartreuse de Parme"
    books: ["La Chartreuse de Parme"]
  },
  {
    name: "Théâtre", // "Le Malade Imaginaire", "Tartuffe"
    books: ["Le Malade Imaginaire", "Tartuffe"]
  },
  {
    name: "Naturaliste", // "Germinal"
    books: ["Germinal"]
  }
];


*/ 

/*
const users = [
  {
    username: "booklover92",
    firstname: "Alice",
    lastname: "Martin",
    email: "alice.martin@example.com",
    password: "securePassword123",
    biography: "Passionnée par la littérature classique et les romans philosophiques."
  },
  {
    username: "readaholic21",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    password: "superSecret456",
    biography: "Amateur de science-fiction et d'histoires captivantes."
  },
  {
    username: "pagewanderer",
    firstname: "Emma",
    lastname: "Dupont",
    email: "emma.dupont@example.com",
    password: "readingForever789",
    biography: "Je voyage dans le temps et l'espace à travers mes lectures."
  },
  {
    username: "literarymind",
    firstname: "Lucas",
    lastname: "Bernard",
    email: "lucas.bernard@example.com",
    password: "classicBooks321",
    biography: "Les chefs-d'œuvre littéraires sont ma véritable passion."
  }
];

*/ 

/*
const marks = [
  {
    rating: 5,
    review: "Un chef-d'œuvre intemporel qui invite à réfléchir sur l'existence.",
    UserId: 1, // Correspond à l'utilisateur booklover92
    BookId: 1  // Correspond à "L'Étranger"
  },
  {
    rating: 4,
    review: "Une magnifique aventure poétique et philosophique.",
    UserId: 2, // Correspond à l'utilisateur readaholic21
    BookId: 2  // Correspond à "Le Petit Prince"
  },
  {
    rating: 3,
    review: "Un roman bien écrit mais un peu long pour moi.",
    UserId: 3, // Correspond à l'utilisateur pagewanderer
    BookId: 4  // Correspond à "Les Misérables"
  },
  {
    rating: 5,
    review: "Des poèmes d'une beauté envoûtante.",
    UserId: 4, // Correspond à l'utilisateur literarymind
    BookId: 6  // Correspond à "Les Fleurs du Mal"
  }
];
*/

/*

const library = [
  {
    UserId: 1, // booklover92
    BookId: 1  // "L'Étranger"
  },
  {
    UserId: 2, // readaholic21
    BookId: 2  // "Le Petit Prince"
  },
  {
    UserId: 3, // pagewanderer
    BookId: 4  // "Les Misérables"
  },
  {
    UserId: 4, // literarymind
    BookId: 6  // "Les Fleurs du Mal"
  }
];

*/ 

/*
const bookHasCategory = [
  {
    BookId: 1, // "L'Étranger"
    CategoryId: 1 // "Philosophie"
  },
  {
    BookId: 2, // "Le Petit Prince"
    CategoryId: 2 // "Littérature jeunesse"
  },
  {
    BookId: 4, // "Les Misérables"
    CategoryId: 4 // "Roman historique"
  },
  {
    BookId: 6, // "Les Fleurs du Mal"
    CategoryId: 6 // "Poésie"
  }
];

 */



