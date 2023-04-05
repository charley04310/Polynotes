# BIENVENUE SUR L'APPLICATION POLYNOTES

<p align="center">
    <img src="frontend/public/img/PolyBunny.svg" alt="PolyBunny" height="400">
</p>

## PRÉSENTATION DE L'APPLICATION

Bonjour et bienvenue à tous,

Je suis ravi de vous présenter aujourd'hui l'application Polynotes, qui a été développée dans le cadre d'un projet scolaire WOA (Web Oriented Architecture).

Polynotes est une application web qui vise à faciliter la gestion de notes, de tâches et de bases de données, en offrant une flexibilité et une personnalisation accrues. Cette application se déroulera en deux itérations : la première itération est présentée ici, tandis que la seconde itération sera réalisée en équipe.

Dans cette première itération de Polynotes, les fonctionnalités principales sont les suivantes :

Nous espérons que cette première itération de Polynotes vous sera utile et vous invitons à découvrir de plus près les fonctionnalités de cette application.

[![POLYNOTES TIMES DATA](https://wakatime.com/badge/user/8c51dfaf-cc71-4c33-bb4f-07b1a77dce06/project/6160a20e-1f13-4866-b07b-8adea0765e70.svg)](https://wakatime.com/badge/user/8c51dfaf-cc71-4c33-bb4f-07b1a77dce06/project/6160a20e-1f13-4866-b07b-8adea0765e70)

## Features

### Polynotes Itération V1

1. **Notes et Wikis :** Vous permet de créer et d'organiser des notes, de la documentation et des wikis dans un format flexible et personnalisable.

2. **Gestion des tâches et des projets :** Vous permet de créer et de gérer des tâches, des listes de tâches et des projets de manière qui convient le mieux à vos besoins.

3. **Bases de données :** Vous permet de créer et de gérer des bases de données pour stocker et organiser des informations telles que les contacts, les produits ou les dépenses.

4. **Partage de documents :** Vous permet de gérer l'accès à vos documents, afin que votre entourage professionnel ou personnel puisse vous aider à les éditer.

### Polynotes Itération V2

5. **Calendriers :** Vous permet de suivre les événements, les échéances et les plannings à l'aide d'une vue calendrier.

6. **Intégrations :** Vous permet d'intégrer des contenus provenant d'autres sources, telles que Google Maps, YouTube ou Trello.

7. **Collaboration :** Vous permet de collaborer en temps réel avec d'autres personnes sur des pages et des bases de données partagées.

8. **Applications mobiles :** Propose des applications mobiles pour iOS et Android afin que vous puissiez accéder à votre espace de travail 5.
   PolyNotes de n'importe où.

9. **Intégrations :** S'intègre à d'autres outils, tels que Google Drive, Slack et Zapier, pour rendre votre travail encore plus efficace.

## PRÉSENTATION DE LA STACK TÉCHNIQUE

### FRONTEND DEVELOPPEMENT

## REQUIREMENTS

Main Library

- [ReactJS](https://fr.reactjs.org/)

UI Libraries Components

- [Ant Design](https://ant.design/docs/react/getting-started)
- [TipTap](https://tiptap.dev/api/editor)
- [DND kit](https://dndkit.com/)

State & HTTP REQUEST management

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [HTTP REQUEST : Axios](https://axios-http.com/fr/docs/intro)

Routing

- [Ract Router 6](https://reactrouter.com/en/main)

## Architecture & Features

- :page_facing_up: [Page Accueil :](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/HomePage.tsx)

  - :jigsaw: [File Explorer](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/FileExplorer.tsx)
  - :jigsaw: [Recents Files](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/RecentsFiles.tsx)
  - :jigsaw: [User Card](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/UserCard.tsx)

- Pages & Block de page :

  - Sous page
  - Headers, list (bullet & ordered), paragraph
  - Image Block

- Database:

  - Properties: Rich/plain Text, Checkbox, Date & Time, Single Select, Number, Checkbox
  - Views: Table, Kanban (~+/- Trello TodoList)

  <p align="center">
      <img src="frontend/public/img/polynotes.gif" alt="PolyBunny" height="400">
  </p>

### Deployment stack

<p align="left">
    <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="docker" width="50" height="50"/>
    </a>
    <a href="https://kubernetes.io" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="kubernetes" width="50" height="50"/>
    </a>
    <a href="https://helm.sh/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg" alt="helm" width="50" height="50"/>
    </a>
</p>

### CI/CD stack

<p align="left">
    <a href="https://argoproj.github.io/cd/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg" alt="argoprojio" width="50" height="50"/>
    </a>
    <a href="https://github.com/actions" target="_blank" rel="noreferrer">
        <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" alt="actions" width="50" height="50"/>
    </a>
</p>

## Run locally

```sh
docker compose up
```
