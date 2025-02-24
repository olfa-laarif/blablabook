import sanitizeHtml from 'sanitize-html';

export function bodySanitizer(req, res, next) {
  // objectif :
  // SI j'ai un body dans la requete
  if (req.body) {
    // pour chaque propriété du body qu'on reçoit
    for (const key in req.body ) {
      // je le nettoie avec le module sanitize-html
      // req.body.title = sanitizeHtml(req.body.title);
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  }
  next();
}