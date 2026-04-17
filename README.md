# SIYENA - Plateforme de Gestion Technique

<p align="center">
  <img src="client/src/media/cims.png" alt="CIMS Logo" width="300" style="margin-right: 20px;" />
  <img src="client/src/media/siyana.png" alt="SIYENA Logo" width="300" />
</p>
## À propos

SIYENA est une plateforme modulaire dédiée à la gestion des interventions techniques et du personnel. Elle permet aux administrateurs de gérer les accès des techniciens, et aux employés techniques d'intervenir plus efficacement.

Le projet est divisé en deux parties : 
- **Le frontend (Client)** : Une application Single Page Application (SPA) bâtie avec Angular (v16+) utilisant Tailwind CSS pour moderniser l'interface.
- **Le backend (Server)** : Une API REST robuste propulsée par Node.js, Express, avec une base de données MongoDB, intégrant des notifications en temps réel avec Socket.IO.

---

## 🛠 Technologies Principales

### Frontend (Client)
* **Framework :** [Angular](https://angular.io/)
* **Style CSS :** [Tailwind CSS](https://tailwindcss.com/)
* **Routage et formulaires :** ReactiveFormsModule, Angular Router

### Backend (Server)
* **Environnement :** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Base de Données :** [MongoDB](https://www.mongodb.com/) (Mongoose)
* **Temps Réel :** [Socket.IO](https://socket.io/)
* **Authentification :** JSON Web Tokens (JWT) et Bcrypt (hashage)
* **Notifications Email :** Nodemailer (Configuration Gmail)

---

## 🚀 Pré-requis

Avant de lancer le projet, assurez-vous d'avoir installé sur votre machine :
- Node.js (v18+)
- Angular CLI
- Un cluster MongoDB (ex: MongoDB Atlas)

---

## ⚙️ Installation & Configuration

### 1. Cloner le Projet

Commencez par ouvrir un terminal et récupérer le dossier du projet en local.

### 2. Configuration du Backend

```bash
cd server
npm install
```

Créez un fichier `.env` à la racine du dossier **`server`** en vous inspirant du fichier existant `.env.example`.

Ce fichier devra contenir des éléments vitaux tel que :
```ini
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster...
JWT_SECRET=votre_clef_secrète_jwt
JWT_EXPIRES_IN=1d

# Paramètres Email SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_d_application
EMAIL_FROM=votre.email@gmail.com
```

### 3. Configuration du Frontend

Ouvrez un autre onglet du terminal :
```bash
cd client
npm install
```

---

## 💻 Démarrage en Mode Développement

**1. Lancer le Serveur (Node API) :**
```bash
cd server
npm start
# (Ou "npm run dev" pour démarrer avec nodemon)
```
Le serveur écoutera par défaut sur le port 5000 (`http://localhost:5000`).

**2. Lancer le Client (Angular) :**
```bash
cd client
ng serve
```
Accédez à l'application via `http://localhost:4200` dans votre navigateur.

---

## ✨ Fonctionnalités Principales

1. **Système d'Authentification :**
   - Inscription des techniciens et employés.
   - Système de "Comptes en Attente" (Pending Approval) qui interdit la connexion aux utilisateurs non approuvés.
   - Les administrateurs peuvent se connecter en toute sécurité.

2. **Panneau d'Administration :**
   - Interface de gestion des employés/techniciens.
   - Approbation ou Rejet (avec suppression) des nouveaux membres.
   - Ajout dynamique, suppression et modification des rôles d'utilisateurs (`admin`, `technician`, `employee`).
   - Centre de Notifications complet avec Socket.IO (alertes "nouvel utilisateur").

3. **Système de Notification (Email & Realtime) :**
   - Lorsqu'un compte d'un technicien est approuvé par l'admin, ce dernier reçoit un email automatique et stylisé.
   - Indicateurs visuels dans l'UI des notifications non-lues.

---

## 📁 Structure Globale

\`\`\`
siyenav1/
│
├── client/                     # Dossier Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Guards de routes, Intercepteurs HTTP, Services API
│   │   │   ├── features/       # Composants (Auth, Admin, Dashboard, Profile...)
│   │   │   └── shared/         # Ressources inter-projets
│   └── ...
│
├── server/                     # API Backend
│   ├── controllers/            # Logique de gestion de requêtes API
│   ├── middleware/             # Middleware d'authentification et check d'erreurs
│   ├── models/                 # Schémas Mongoose (Technician, Notification...)
│   ├── routes/                 # Routes Express HTTP
│   ├── services/               # Services Email, Notifications, Auth...
│   ├── utils/                  # Classes utilitaires (AsyncHandler, AppError)
│   └── server.js               # Fichier d'entrée central du backend
│
└── .gitignore                  # Fichiers à exclure des commits (ex: node_modules, .env)
\`\`\`

---

## 👥 Rôles Utilisateurs

* **Administrateur (admin) :** Gère les comptes et traite les alertes (accepte/rejete). Agit en tant que Root.
* **Technicien (technician) :** Le technicien intervenant classique, accès aux rapports du dashboard principal.
* **Employé (employee) :** Accès en lecture seule à certains éléments limités.

---

*Développé pour la gestion interne de SIYENA.*
