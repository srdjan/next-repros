# Simple NextJS PWA kick starter boilerplate

This boilerplate is inspired by https://github.com/ooade/NextSimpleStarter, by [ooade](https://github.com/ooade)

## Contents

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)

### Installation

Clone the repo:

```sh
git clone https://github.com/srdjan/next-pwa-kickoff.git
cd next-pwa-kickoff
```

To make it your own, re-initialize the repo and set up your project:

```sh
rm -rf .git && git init && npm init
```

Install the dependencies:

```sh
npm install
```

### Development Workflow

Start a live-reload development server:

```sh
npm run dev
```

Generate a production build:

```sh
npm run build
```

### Deployment 
this requires having [now-cli](https://github.com/zeit/now-cli) installed:
```sh
npm -g install now
```

then to deploy:

```sh
npm run deploy
```

### Contribution

I'm open to contributions & suggestions

### License

MIT
