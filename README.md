# To create a react app using vite:-
- npm create vite@latest devtinderweb -- --template react
- Outlet -> This allows, all children routes of body to render over here
- use axios to call API -> npm i axios
- withCredentials: true -> To get the cookie in frontend
- When I refresh the page, redux store refreshes, but still if I have the token, I should not get logged out. So, whenever my Body component is loaded, call the "/profile/view" api. And if, it is success, set the redux store again, else navigate to "/login"
- 