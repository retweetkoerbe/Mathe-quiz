import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base logic
// When running in GitHub Actions, GITHUB_REPOSITORY is "owner/repo"
const repoName = process.env.GITHUB_REPOSITORY 
  ? process.env.GITHUB_REPOSITORY.split('/')[1] 
  : null;

const base = repoName ? `/${repoName}/` : './';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
})
