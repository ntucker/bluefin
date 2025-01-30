## Bluefin Charts

### Features

- Realtime sub-second crypto price data
- Price history charts
  - Updated live
- Holdings sorted by total value
- Full crypto list sorted by volume 30d
- Total combined asset value displayed at top
- Buy/sell buttons for fast trading
- 0 race conditions
- All values including computed values guaranteed consistent and fresh
- Zero overfetching
- Animated live price on asset detail page

### Deviations from instructions

- No forms, because they would only make an awkward and slow user experience

### Usage

```bash
git clone https://github.com/ntucker/bluefin.git
corepack enable
yarn install
```

With [Visual Studio Code](https://code.visualstudio.com), simply press `F5` to start the development server and browser.

#### Run dev:

```bash
yarn start
```

#### Build prod:

`Ctrl+shift+B` in [Visual Studio Code](https://code.visualstudio.com)

```bash
yarn build
```

#### Run prod: (after build)

```bash
yarn start:server
```

#### Analyze production bundle sizes:

```bash
yarn build:analyze
```

#### Run with [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html):

```bash
yarn build:profile
```

#### Check Packages for duplicates or circular dependencies:

```bash
yarn pkgcheck
```
