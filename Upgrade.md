# 🔴 Backend concepts interviewers love

**You’re missing hands-on proof of:**

- ViewSets & Routers

- Custom permissions & throttling

- Caching (Redis / per-view / low-level)

- Signals (post_save, m2m_changed)

- Pagination & filtering

- Performance thinking

- Clean project structure

- Optional but impressive:

- Celery

- Django Channels

- API versioning

## Project #1 (Must-do): Advanced Blog / Content Platform (V2)

> This is NOT a “new” idea — it’s a senior-level evolution of what you already built.

**Why this is perfect for interviews**

Interviewers LOVE hearing:

“I refactored my existing project to scale better.”

That’s real-world thinking.

**🔧 What you’ll add (interview gold)**

## ✅ Use ViewSets & Routers

- BlogViewSet

- CommentViewSet

- UserViewSet

## ✅ Caching (Very important)

Use Redis or Django’s local cache.

**Examples:**

- Cache blog list endpoint

- Cache most-liked blogs

- Cache user profile data

**Be ready to say:**

“I used per-view caching and invalidated cache on blog updates.”

## ✅ Signals (Simple but powerful)

**Use signals for:**

- Auto-create user profile

- Update blog like count

- Send notification when a blog is commented on

**This answers:**

“Have you used Django signals?”

## ✅ Permissions & Throttling

**Add:**

- **Throttling:** Limit blog creation per day

## ✅ Filtering, Search, Pagination

- Search blogs by title / author

- Filter by tags

- CursorPagination or PageNumberPagination

## ✅ API Versioning

**Add:**

`/api/v1/blogs/`

`/api/v2/blogs/`

This is a big plus.