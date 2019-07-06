# Watcha Coding Test : Bingo

![screenshot](./src/asset/screenshot.png)

## 1. Getting Started

### 1) Run dev mode

```bash
npm install or yarn
npm start or yarn start
```

### 2) Build bundle

```bash
npm run build or yarn build
```

## 2. Description

```
src
 ┣ asset
 ┃ ┗ screenshot.png
 ┣ component
 ┃ ┣ BingoBox.jsx
 ┃ ┣ BingoList.jsx
 ┃ ┣ StartBtn.jsx
 ┃ ┗ index.js
 ┣ const
 ┃ ┗ index.js
 ┣ container
 ┃ ┣ GameContainer.jsx
 ┃ ┗ index.js
 ┣ redux
 ┃ ┣ actions.js
 ┃ ┣ reducers.js
 ┃ ┗ store.js
 ┣ util
 ┃ ┗ index.js
 ┣ App.js
 ┗ index.js
```

- `React`, `Redux`를 활용해 구현했습니다.
- `create-react-app` 보일러플레이트를 활용했습니다.
- `GameContainer`에 게임 주요 로직을 구현했고 그 외 `Presentational Component`에 들어갈 상태 값들은 되도록 `Redux` state로 관리했습니다.

- `redux`폴더내에 `actions.js`, `reducers.js`, `store.js` 파일로 나누어 관리했습니다.

- 게임 상태, 현재 턴, 각 플레이어 필드 숫자 배치, 각 플레이어 빙고 현황 등을 `Redux`state로 관리했고 되도록 `Presentational Component`에 활용하도록 했습니다.
- action creator 함수는 가급적 `GameContainer`에서 게임 로직을 구현할때 활용했습니다.

- 각 필드의 좌표 값을 2차원 배열대신 하나의 절대값으로 환산해 빙고 체크에 활용했습니다.
- 크로스, 가로, 세로 각각 체크 하는 함수를 나눠서 빙고 체크를 진행했습니다.

- `const`폴더의 상수 변경을 통해 다른 정사각형 사이즈로도 플레이 가능하도록 구현했습니다.
# just-bingo
