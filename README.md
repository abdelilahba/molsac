# Mol Sac • مول الصاك (Tétouan 🇲🇦)

> **Maison de maroquinerie d'exception, souliers de prestige et accessoires de haute fantaisie.**  
> Située à Kissaria Al Hamama, Magasin N°6, Tétouan.

---

## 🌟 Présentation du Projet

**Mol Sac** est une plateforme e-commerce vitrine et de gestion conçue spécialement pour la boutique Mol Sac à Tétouan :
- **Pour les clientes** : Un site vitrine bilingue (Français & Arabe avec support RTL), ultra-élégant, moderne avec stories interactives, pièces maîtresses, aperçu rapide, et commande directe sur WhatsApp ou réservation en boutique.
- **Pour le gérant sur iPhone** : Une interface d'administration 100% mobile-first (PWA installable sur l'écran d'accueil iOS) avec prise de photo directe avec la caméra de l'iPhone, gestion des stocks et suivi des réservations.
- **Application Mobile** : Projet natif Expo / React Native disponible dans le dossier `/mobile`.

---

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15 (App Router, Server & Client Components)
- **Styling** : Tailwind CSS v4, Lucide React Icons
- **Base de Données & ORM** : SQLite avec Prisma ORM
- **Authentification** : JWT sécurisé par cookies HttpOnly & BcryptJS
- **Bilingue** : Support complet Français & Arabe (RTL dynamique)
- **Mobile** : Expo / React Native, PWA (Progressive Web App avec support iOS standalone)

---

## 📦 Installation & Démarrage en Local

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/abdelilahba/molsac.git
   cd molsac
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Générer la base de données et insérer les données de démo** :
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   Accéder à [http://localhost:3000](http://localhost:3000).

---

## 🔐 Espace Administration Gérance (iPhone & Web)

- **URL d'accès** : `/admin/login`
- **Identifiant par défaut** : `admin`
- **Mot de passe par défaut** : `molsac2026`

### Fonctionnalités de l'Admin :
- 📸 **Photo directe** : Prise de photo instantanée avec l'appareil photo iPhone sans besoin d'ordinateur.
- 📦 **Gestion catalogue** : Activer/désactiver la disponibilité d'un produit en 1 clic.
- 💬 **WhatsApp Direct** : Contacter les clientes ayant fait une réservation en un clic avec message pré-rempli.

---

## 📍 Coordonnées Boutique

- **Adresse** : قيسارية الحمامة، محل رقم 6، تطوان 🇲🇦 (Kissariat Al Hamama, Local N°6, Tétouan)
- **WhatsApp Concierge** : `+212 712-128124` (0712-128124)
- **Instagram Officiel** : [@mol_sac44](https://instagram.com/mol_sac44)
- **Horaires** : 7j/7 de 10h00 à 21h30

---

## ☁️ Déploiement sur Vercel

1. Importer le dépôt GitHub sur [Vercel](https://vercel.com).
2. Configurer les variables d'environnement si nécessaire (`JWT_SECRET`, etc.).
3. Pour la base de données en production Vercel (serverless), vous pouvez connecter **Vercel Postgres**, **Turso (LibSQL SQLite cloud)** ou **Supabase**.
4. Déployer en 1 clic !
