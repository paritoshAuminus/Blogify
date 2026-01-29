## API Endpoints

### Blog APIs

| Method | Endpoint           | Access     |
| ------ | ------------------ | ---------- |
| GET    | `/api/blogs/`      | Public     |
| GET    | `/api/blogs/v2/`   | Public     |
| GET    | `/api/blogs/<id>/` | Public     |
| POST   | `/api/myblogs/`    | Auth       |
| POST   | `/api/myblogs/v2/` | Auth       |
| PUT    | `/api/blogs/<id>/` | Owner only |
| DELETE | `/api/blogs/<id>/` | Owner only |

### Like APIs

| Method | Endpoint                  | Access |
| ------ | ------------------------- | ------ |
| POST   | `/api/blogs/<id>/like/`   | Auth   |
| POST   | `/api/blogs/<id>/unlike/` | Auth   |

### Comment APIs

| Method | Endpoint                    | Access |
| ------ | --------------------------- | ------ |
| GET    | `/api/blogs/<id>/comments/` | Public |
| POST   | `/api/blogs/<id>/comments/` | Auth   |
