# Setup: letting your client manage listings

The site is static; listings live in `content/listings.json`. The admin page at `/admin` edits that file through a form (add, edit, hide, delete listings; upload photos; add captions and amenities). Each save is committed to GitHub and Netlify republishes the site in about a minute. Cost: free.

## One-time setup (you)
1. **GitHub**: create a free account and a new repository (e.g. `pearl-homes-site`). Upload the contents of this folder (keep the folder structure: `admin`, `content`, `css`, `images`, `js`, and the HTML files).
2. **Edit `admin/config.yml`**: change `repo:` to `your-username/your-repo-name`, and replace `YOUR-SITE.netlify.app` with the real site address once you have it.
3. **Netlify**: create a free account → Add new site → Import from GitHub → pick the repo. No build command; publish directory is the repo root (`/`). Deploy.
4. **GitHub sign-in for the admin page** (Netlify's built-in OAuth):
   - GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
     Homepage URL: your Netlify site URL. Authorization callback URL: `https://api.netlify.com/auth/done`.
   - Copy the Client ID and generate a Client Secret.
   - Netlify → your site → Site configuration → Access & security → OAuth → Install provider → GitHub → paste the ID and secret.
   (Menu names may vary slightly; Netlify and Decap docs show the current screens.)
5. **Give your client access**: she creates a free GitHub account; add her in the repo under Settings → Collaborators with Write access.

## Your client's routine
1. Go to `https://YOUR-SITE.netlify.app/admin` and choose Login with GitHub.
2. Listings → All listings.
3. **Add:** Add Listing at the top; fill in the form; add photos (first photo is the cover) with captions; add amenities; Save → Publish.
4. **Edit:** open a listing, change anything, Save → Publish.
5. **Hide (e.g. sold):** switch off "Show on website".
6. **Remove:** use the delete (bin) icon on the listing, then Save → Publish.
7. Wait about a minute and refresh the website.

## Tips
- Keep listing titles unique (the page address is made from the title).
- Resize photos first (about 1600px wide, under 1 MB) so pages load fast.
- Changing a listing's title changes its page address, so old links to it will stop working.

## Opening the site locally
Double-clicking `index.html` shows the sample listings from `js/data.js` (a backup copy). On the live site, `content/listings.json` is used and `js/data.js` is ignored. Run `python3 -m http.server` in this folder to test with the real JSON.
