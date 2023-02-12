# Unnotech Frontend Engineer 徵才小專案

### 這是為應徵 Unnotech Frontend 寫的徵才專案，主要使用 Vue 3 + TypeScript + TailwindCSS 開發。

建議 IDE 設定：
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)，並停用 VSCode 內建的 TypeScript and JavaScript Language Features。

## 如何執行

---

### 安裝套件

> 專案使用部分套件與 Vite 有 peer dependency conflict，因此須加上 `--legacy-peer-deps` 進行安裝

```sh
npm install --legacy-peer-deps
```

### 啟動 Dev Server

```sh
npm run dev
```

### Build

```sh
npm run build
```

## 套件列表

---

- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)：自動引入、註冊用到的元件。
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)：自動引入 Vue、Vue Router 提供的 API，不必再一一引入 `ref`、`reactive`、`onMounted` 等常用 API。
- [Husky - Git Hooks](https://typicode.github.io/husky/#/)：方便加 Git Hooks 的工具，此專案使用了 pre-commit hook 用來確保 commit 之前會先進行 type-check 和 lint。
- [Vue I18n](https://vue-i18n.intlify.dev/)：Vue 生態系中最著名的多語系套件之一。
- [Tanstack Query](https://tanstack.com/query/latest)：非同步狀態管理工具，提供一種統一的方式來處理所有非同步操作，讓程式碼更好管理，並且能處理 caching、dedupe 等較複雜的問題。不過這是第一次使用，只使用了最基本的 query 和 mutation 功能。
- [axios](https://axios-http.com/)：Promise based 的 Http 請求工具。
- [Pinia](https://pinia.vuejs.org/)：Vue 生態系最新推薦使用的狀態管理工具，可以用 Vue 3 的 composition API 來管理狀態，寫起來非常簡潔輕鬆。
- [Vee-Validate](https://vee-validate.logaretm.com/v4/)：Vue 的表單套件，可以很方便處理同步/非同步驗證，預設使用 [yup](https://github.com/jquense/yup) 來處理 schema 驗證，但也可以安裝套件使用更 TypeScript friendly 的 [zod](https://github.com/colinhacks/zod)。
- [zod](https://github.com/colinhacks/zod)：Zod 是一個 TypeScript-first 的套件，可以用來驗證、定義 schema。此專案是安裝 `@vee-validate/zod` 後與 vee-validate 配合使用。

## 專案架構

---

### App.vue

- Root Component。裡面放入 `<RouterView />`、全域管理的 `<LoadingSpinner />` 以及右下角的語言選擇按鈕。

### components 資料夾

- 共用元件資料夾。由於裝了 `unplugin-vue-components`，這個資料夾之下的 `.vue` 檔案都可以直接在 template 中使用。

### views 資料夾

- 所有頁面元件，包含 Vue Router 配對不到任何元件時顯示的 `NotFound.vue`。

### 路由/頁面跳轉

- 使用自定義 RouteMeta 來存放一些關於 route 的額外資訊，譬如頁面標題、header 左側是否顯示返回 icon、右側要顯示什麼 icon 等等，可以透過 `$route.meta` 來存取。

- 從列表頁進入詳情頁的時候，會透過 router 的 afterEach hook 把前一頁的捲動位置記下來，儲存在 sessionStorage 中，等從詳情頁回到列表頁的時候，再把畫面捲動到之前的位置。其他頁面來回切換時則會自動捲動到頁面最上方。

### 狀態管理

- 只有一個簡單的 loadingStore，用來管理 LoadingSpinner 的顯示狀態。

### CRUD

- 使用 Tanstack Query + Axios 來處理。Tanstack Query 的 `useQuery` API 用於獲取資料 (GET)，`useMutation` API 則用來新增 (POST) 及修改 (PATCH) 資料，並透過 API 提供的 `isLoading, fetchStatus, isError, error, data` 等資料來控制 loading 狀態以及基本的錯誤處理。

- 由 `BookForm.vue` 統一處理「新增」和「修改」表單，透過傳入 prop `formType` 來判斷目前是哪一個表單、該進行什麼操作。

### 多語系 I18n

- 使用 `vue-i18n` 套件來新增多語系功能，支援中英雙語。以 `src/locales` 資料夾之下的`.json` 檔案作為語言包。

# 開發紀錄

### Header 如何在不同頁面顯示不同資訊？

平常網頁常見的 Header 內容可能大多是固定的，但這個專案會需要在不同頁顯示不同的 page title 和 icon。思考了一下，後來決定切一個共用元件 `TopNav.vue`，每一個頁面都要使用這個元件，但可以根據 RouteMeta 中儲存的資料或是使用 slot 插槽的方式來顯示不同內容和操作。

### 詳情頁、新增頁和修改頁的內容幾乎一樣，可以共用一個 BookForm.vue 元件嗎？

根據 Wireframe，這三個頁面相似度非常高，因此我起先讓他們使用同一個 BookForm 元件，再根據 props 調整 UI 和邏輯。不過這個元件寫到後來變得有點複雜，要特別為只能檢視的詳情頁設定樣式，所以最後就把詳情頁獨立出去了，畢竟它的確不是表單，分開處理程式碼會比較好懂一些。
