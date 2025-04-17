# auth-protocol-work-1

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

## Partie 1 (8 points)

- Proposer une authentification basique pour toutes les pages.
- Le royaume doit être paramétré à "Site de test de l'ESGI".
- Le nom d'utilisateur doit être "esgi" (sans les guillemets)
- Le mot de passe doit être "esgi2024" (sans les guillemets)
- Renvoyer le message "Bad credentials" si le nom d'utilisateur ou le mot de passe sont incorrects
- Renvoyer le message "Bad authorization type" si le type de l'authorisation n'est pas "Basic"
- Renvoyer le message "Welcome" en cas de succès

## Partie 2 (8 points)

- Proposer une authentification par jsonwebtoken
- Inclure uniquement l'identifiant de l'utilisateur dans le token
- Renvoyer une erreur 401 si l'utilisateur n'existe pas dans la base de données des utilisateurs
- Signer le token avec le secret proposé dans le code

## Bonus (4 points)

- Transporter le JWT via une session en mémoire-vive
- Ajouter un formulaire permettant dynamiquement de se connecter avec un email et un mot de passe
- Utiliser la librairie Bcryptjs afin de stocker les mots de passes dans le code de façon hashé et les vérifier
- Valider les données reçues au format JSON avec Zod

## Contraintes

- Interdiction de rajouter une librairie supplémentaire
- Interdiction à l'utilisation d'une intelligence artificielle
- Documentation sur le site officiel du framework Express.js autorisé

## Documentation

- [`express`](https://expressjs.com/fr/)
- [`Basic-Auth`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [`buffer`](https://nodejs.org/api/buffer.html)
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken)
- [`jwt.io`](https://jwt.io/)