import helmet from "helmet";

/**
 * Configuration de Helmet pour sécuriser les en-têtes HTTP
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Charge les scripts uniquement depuis le même domaine
      imgSrc: ["'self'", "data:", "https:"], // Autorise les images depuis des URL sécurisées
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Permet le chargement des ressources externes
  referrerPolicy: { policy: "no-referrer" }, // Empêche la fuite d'informations via les referrers
  xssFilter: true, // Active la protection contre les attaques XSS
  frameguard: { action: "deny" }, // Empêche l'inclusion du site dans un iframe (protection contre le clickjacking)
  hidePoweredBy: true, // Supprime l'en-tête `X-Powered-By: Express` pour éviter de révéler la techno utilisée
  noSniff: true, // Empêche les navigateurs d'interpréter les fichiers différemment de leur type MIME
  dnsPrefetchControl: { allow: false }, // Désactive la prélecture DNS pour limiter la collecte de données
  ieNoOpen: true, // Bloque le téléchargement de fichiers via `X-Download-Options`
});