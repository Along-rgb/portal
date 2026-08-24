# EDL Systems Portal

Portal ກາງສຳລັບເຂົ້ານຳໃຊ້ລະບົບຕ່າງໆ ຂອງ ຟຟລ — Next.js (App Router) + TypeScript + Tailwind CSS.

## Getting Started

```bash
npm ci
npm run dev     # http://localhost:4000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Development server (port 4000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (no emit) |

## Project Structure

```
src/
  app/                 # App Router: layout, page, global styles
  components/          # UI components
    ui/                # shadcn-style primitives (button, card, input)
  config/site.ts       # Shared strings, logo, metadata (single source of truth)
  data/systems.ts      # System list (data only)
  lib/                 # Helpers: cn(), filterSystems()
  types/system.ts      # System / SystemCategory types
```

### Adding a new system

1. Put the logo in `public/images/`
2. Add an entry in `src/data/systems.ts` (`category` must match `SYSTEM_CATEGORIES`)
3. For a new category, add it to `SYSTEM_CATEGORIES` in `src/types/system.ts`

## Deployment

### Static Export (Recommended)

This project is configured for static export. No Node.js server required.

```bash
npm run build
```

Static files will be generated in the `out/` directory and can be deployed to:
- Netlify, Vercel, GitHub Pages, Cloudflare Pages
- Any static file hosting (nginx, Apache, S3, etc.)
- Simply upload the `out/` directory contents

### Node.js Server Mode (Optional)

If you need server-side features later, you can remove `output: 'export'` from `next.config.ts` and run:

```bash
# First time (on the server)
git clone <gitlab-repo-url> /var/www/allsoftware-svc
cd /var/www/allsoftware-svc
npm ci
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup          # auto-start PM2 after reboot

# Every later deploy
cd /var/www/allsoftware-svc
git pull origin main
npm ci
npm run build
pm2 reload allsoftware-svc
```

### PM2 commands (if using server mode)

```bash
pm2 status
pm2 logs allsoftware-svc
pm2 reload allsoftware-svc     # zero-downtime restart
pm2 stop allsoftware-svc
```

Port and hostname are configured in `ecosystem.config.js` (`PORT`, `HOSTNAME`).

### Nginx reverse proxy (example)

```nginx
server {
    listen 80;
    server_name portal.edl.com.la;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## CI (GitLab)

`.gitlab-ci.yml` runs `lint`, `typecheck`, then `build` on every push, catching errors before they reach the server.
