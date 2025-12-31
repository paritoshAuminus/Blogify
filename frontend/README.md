# Auth functions

### Singup → Login → getUser

```js
  const signup = async () => {
    const result = await authService.register({username: 'TestUser3', email: 'testuser3@test.com', password: 'admin@123'})
    console.log(result)
    dispatch(login({user: {username: result.username, email: result.email, id: result.id}}))
    console.log(localStorage.getItem('blogifyAccess'))
  }
```

### Login → getUser

```js
  const login = async () => {
    const result = await authService.login({username: 'TestUser3', password: 'admin@123'});
    console.log(result) 
  }
```

### getUser

```js
  const getUser = async () => {
    const result = await authService.getUser()
    dispatch(login({ user: {username: result.username, email: result.email} }))
  }
```

# Service functions

### updateBlog

```js
async function updateBlog() {
    const result = await services.updateBlog({ id: 9, content: { title: 'Frontend technologies in 2023', body: 'Frontend technologies in 2023 is a blog about frontend technologies in 2023' } })
}
```

> **Note:** We can send both title and body or either one of them