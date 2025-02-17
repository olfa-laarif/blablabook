// //* eslint-disable no-unused-vars */
// import * as React from 'react' 
;  // Nécessaire pour l'environnement de test et les hooks
import { MemoryRouter } from 'react-router-dom'; // Nécessaire pour les tests de routage
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';
import '@testing-library/jest-dom';  // Import direct, sans /extend-expect
import { getRandomBooks } from '../src/services/api';
import { filterBooks } from '../src/utils/filterBooks';
import type { Book } from '../src/types'; // Utilisation du type de production




// On mock l'appel réel à l'API pour contrôler le retour des données dans les tests.
jest.mock('../src/services/api', () => ({
  getRandomBooks: jest.fn(),
}));

describe('Tests unitaires', () => {
  // Test sur la fonction getRandomBooks.
  describe('getRandomBooks', () => {
    test('doit retourner un tableau de livres avec un titre et un auteur', async () => {
      // ARRANGER : Préparation d'un livre de test complet.
      const mockBooks: Book[] = [
        {
          id: '1',
          title: 'Test Book',
          Author: { firstname: 'John', lastname: 'Doe', biography: 'Biographie de John' },
          Category: [{ name: 'Fiction' }], // Correspond à l'interface de production
          published_date: '2022-01-01',
          image: 'image-url',
          summary: 'Un résumé',
          status: 'available',
          availability: 'in stock',
          Marks: []
        }
      ];
      (getRandomBooks as jest.Mock).mockResolvedValueOnce(mockBooks);

      // AGIR : Appel de getRandomBooks.
      const books = await getRandomBooks();

      // ASSERTION : Vérifier que le premier livre a bien le titre et l'auteur attendus.
      expect(books[0]).toHaveProperty('title', 'Test Book');
      expect(books[0].Author).toHaveProperty('firstname', 'John');
      expect(books[0].Author).toHaveProperty('lastname', 'Doe');
    });
  });

  // Test sur la fonction filterBooks.
  describe('filterBooks', () => {
    // ARRANGER : Définition d'un jeu de données de test avec deux livres.
    const books: Book[] = [
      {
        id: '1',
        title: 'React Basics',
        Author: { firstname: 'Alice', lastname: 'Smith', biography: 'Biographie d’Alice' },
        Category: [{ name: 'Programming' }],
        published_date: '2022-01-01',
        image: 'img1',
        summary: 'Résumé 1',
        status: 'available',
        availability: 'in stock',
        Marks: []
      },
      {
        id: '2',
        title: 'Advanced React',
        Author: { firstname: 'Bob', lastname: 'Jones', biography: 'Biographie de Bob' },
        Category: [{ name: 'Programming' }],
        published_date: '2022-02-01',
        image: 'img2',
        summary: 'Résumé 2',
        status: 'available',
        availability: 'in stock',
        Marks: []
      }
    ];

    test('doit retourner tous les livres si la chaîne de recherche est vide', () => {
      // AGIR : Appel de filterBooks avec une chaîne vide.
      const result = filterBooks(books, '', 'title');
      // ASSERTION : Le résultat doit être identique à l'ensemble des livres.
      expect(result).toEqual(books);
    });

    test('doit filtrer les livres par titre de manière insensible à la casse', () => {
      // AGIR : Appel de filterBooks avec la chaîne "react".
      const result = filterBooks(books, 'react', 'title');
      // ASSERTION : Les deux livres contiennent "React", le résultat doit donc être identique.
      expect(result).toEqual(books);
    });
  });
});

// Test d'intégration pour HomePage.
describe("Test d'intégration pour HomePage", () => {
  test('affiche la HomePage et les livres récupérés via l\'API', async () => {
    // ARRANGER : Préparation d'un livre de test complet pour l'intégration.
    const mockBooks: Book[] = [
      {
        id: '1',
        title: 'Integration Test Book',
        Author: { firstname: 'Jane', lastname: 'Doe', biography: 'Biographie de Jane' },
        Category: [{ name: 'Fiction' }],
        published_date: '2022-01-01',
        image: 'integration-image',
        summary: 'Résumé d’intégration',
        status: 'available',
        availability: 'in stock',
        Marks: []
      }
    ];
    (getRandomBooks as jest.Mock).mockResolvedValueOnce(mockBooks);

    // AGIR : Rendu du composant HomePage.
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // ATTENDRE : L'appel API est exécuté dans useEffect; on attend que le titre du livre apparaisse dans le DOM.
    const bookTitleElement = await waitFor(() =>
      screen.getByText('Integration Test Book')
    );

    // ASSERTION : Vérifier que le titre du livre est affiché.
    expect(bookTitleElement).toBeInTheDocument();
  });
});


