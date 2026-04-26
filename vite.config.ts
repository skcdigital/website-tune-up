import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        demos: path.resolve(__dirname, "demos.html"),
        portfolio: path.resolve(__dirname, "portfolio.html"),
        contact: path.resolve(__dirname, "contact.html"),
        blog: path.resolve(__dirname, "blog.html"),
        carePlans: path.resolve(__dirname, "care-plans.html"),
        googleBusinessGuide: path.resolve(__dirname, "google-business-guide.html"),
        blogWhatsappCatalog: path.resolve(__dirname, "blog-whatsapp-catalog.html"),
        blogExcelTips: path.resolve(__dirname, "blog-excel-tips.html"),
        about: path.resolve(__dirname, "about.html"),
        services: path.resolve(__dirname, "services.html"),
        legalTerms: path.resolve(__dirname, "legal-terms.html"),
        legalPrivacy: path.resolve(__dirname, "legal-privacy.html"),
        legalRefund: path.resolve(__dirname, "legal-refund.html"),
        legalServiceAgreement: path.resolve(__dirname, "legal-service-agreement.html"),
      },
    },
  },
}));
