import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import CarePlans from "./pages/CarePlans";
import Portfolio from "./pages/Portfolio";
import Demos from "./pages/Demos";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import LegalTerms from "./pages/LegalTerms";
import LegalPrivacy from "./pages/LegalPrivacy";
import LegalRefund from "./pages/LegalRefund";
import LegalServiceAgreement from "./pages/LegalServiceAgreement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/care-plans" element={<CarePlans />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/demos" element={<Demos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal/terms" element={<LegalTerms />} />
              <Route path="/legal/privacy" element={<LegalPrivacy />} />
              <Route path="/legal/refund" element={<LegalRefund />} />
              <Route path="/legal/service-agreement" element={<LegalServiceAgreement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <SiteFooter />
          <WhatsAppFab />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
