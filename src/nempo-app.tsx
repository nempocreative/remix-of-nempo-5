import { Switch, Route, Router as WouterRouter, useLocation } from "@/lib/wouter";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAuthProvider } from "@/contexts/google-auth-context";
import { DarkModeProvider } from "@/contexts/dark-mode-context";
import { AuthProvider } from "@/contexts/auth-context";
import { MatchProvider } from "@/contexts/match-context";
import { PancoProvider } from "@/contexts/panco-context";
import { JingleProvider } from "@/contexts/jingle-context";
import { CityFilterProvider } from "@/contexts/city-filter-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { NetworkStatus } from "@/components/network-status";
import { JingleMiniPlayer } from "@/components/jingle-mini-player";

const Splash = lazy(() => import("@/pages/splash"));
const Home = lazy(() => import("@/pages/home"));
const WishlistPage = lazy(() => import("@/pages/wishlist"));
const EventPage = lazy(() => import("@/pages/event"));
const NempoCulturalTourPage = lazy(() => import("@/pages/nempo-cultural-tour"));
const EventDetail = lazy(() => import("@/pages/event-detail"));
const EventCheckout = lazy(() => import("@/pages/event-checkout"));
const KulinerPage = lazy(() => import("@/pages/kuliner"));
const KulinerDetail = lazy(() => import("@/pages/kuliner-detail"));
const WarungPage = lazy(() => import("@/pages/warung"));
const CafePage = lazy(() => import("@/pages/cafe"));
const JajanYukPage = lazy(() => import("@/pages/jajan-yuk-market"));
const JajanYukMenuPage = lazy(() => import("@/pages/jajan-yuk-menu"));
const JajanYukTrackPage = lazy(() => import("@/pages/jajan-yuk-track"));
const WisataPage = lazy(() => import("@/pages/wisata"));
const WisataDetail = lazy(() => import("@/pages/wisata-detail"));
const PenginapanPage = lazy(() => import("@/pages/penginapan"));
const PenginapanDetail = lazy(() => import("@/pages/penginapan-detail"));
const TiketPage = lazy(() => import("@/pages/tiket"));
const CekTiketPage = lazy(() => import("@/pages/cek-tiket"));
const RentCarPage = lazy(() => import("@/pages/rent-car"));
const KomunitasPage = lazy(() => import("@/pages/komunitas"));
const AdventureGearPage = lazy(() => import("@/pages/adventure-gear"));
const CeritaRakyatPage = lazy(() => import("@/pages/cerita-rakyat"));
const CeritaRakyatDetailPage = lazy(() => import("@/pages/cerita-rakyat").then((module) => ({ default: module.CeritaRakyatDetailPage })));
const KamusSundaPage = lazy(() => import("@/pages/kamus-sunda"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const ChangePasswordPage = lazy(() => import("@/pages/profile-change-password"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgot-password"));
const DeleteAccountPage = lazy(() => import("@/pages/profile-delete-account"));
const KeranjangPage = lazy(() => import("@/pages/keranjang"));
const PesananSayaPage = lazy(() => import("@/pages/pesanan-saya"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const ThanksPage = lazy(() => import("@/pages/thanks"));
const VoucherListPage = lazy(() => import("@/pages/voucherlist"));
const PoinPage = lazy(() => import("@/pages/poin"));
const CouponsPage = lazy(() => import("@/pages/coupons"));
const PaymentPage = lazy(() => import("@/pages/payment"));
const PembayaranPage = lazy(() => import("@/pages/pembayaran"));
const VerifyPage = lazy(() => import("@/pages/verify"));
const DigitalServicesPage = lazy(() => import("@/pages/digital-services"));
const DigitalSuperAppDemoPage = lazy(() => import("@/pages/digital-super-app-demo"));
const DigitalTicketingDemoPage = lazy(() => import("@/pages/digital-ticketing-demo"));
const DigitalKasirDemoPage = lazy(() => import("@/pages/digital-kasir-demo"));
const DigitalQueueDemoPage = lazy(() => import("@/pages/digital-queue-demo"));
const DigitalBookingDemoPage = lazy(() => import("@/pages/digital-booking-demo"));
const DigitalPurchasingDemoPage = lazy(() => import("@/pages/digital-purchasing-demo"));
const DigitalLoyaltyDemoPage = lazy(() => import("@/pages/digital-loyalty-demo"));
const DigitalWarehouseDemoPage = lazy(() => import("@/pages/digital-warehouse-demo"));
const DigitalInvitationDemoPage = lazy(() => import("@/pages/digital-invitation-demo"));
const DigitalCompanyDemoPage = lazy(() => import("@/pages/digital-company-demo"));
const DigitalYearbookDemoPage = lazy(() => import("@/pages/digital-yearbook-demo"));
const DigitalMarketingDemoPage = lazy(() => import("@/pages/digital-marketing-demo"));
const DigitalQrMenuDemoPage = lazy(() => import("@/pages/digital-qr-menu-demo"));
const DigitalQrMenuCustomerPage = lazy(() => import("@/pages/digital-qr-menu-demo").then((module) => ({ default: module.QrMenuCustomerPage })));
const DigitalCrmDemoPage = lazy(() => import("@/pages/digital-crm-demo"));
const DigitalInvoiceDemoPage = lazy(() => import("@/pages/digital-invoice-demo"));
const DigitalDapurStockDemoPage = lazy(() => import("@/pages/digital-dapur-stock-demo"));
const DigitalHppDemoPage = lazy(() => import("@/pages/digital-hpp-demo"));
const DigitalRecipeDemoPage = lazy(() => import("@/pages/digital-recipe-demo"));
const DigitalHumanResourceDemoPage = lazy(() => import("@/pages/digital-human-resource-demo"));
const DigitalLinkBioDemoPage = lazy(() => import("@/pages/digital-link-bio-demo"));
const InfluencerHubPage = lazy(() => import("@/pages/influencer-hub"));
const SponsorshipPage = lazy(() => import("@/pages/sponsorship"));
const SponsorshipEventPage = lazy(() => import("@/pages/sponsorship-event"));
const HalloweenProposalPage = lazy(() => import("@/pages/sponsorship-proposal"));
const EventOrganizerPage = lazy(() => import("@/pages/event-organizer"));
const PriceListPage = lazy(() => import("@/pages/price-list"));
const DonasiBibitPage = lazy(() => import("@/pages/donasi-bibit"));
const TalentPage = lazy(() => import("@/pages/talent"));
const MerchandisePage = lazy(() => import("@/pages/merchandise"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const ItineraryPage = lazy(() => import("@/pages/itinerary"));
const ItineraryComingSoonPage = lazy(() => import("@/pages/itinerary-coming-soon"));
const EditProfilPage = lazy(() => import("@/pages/edit-profil"));
const UlasanPage = lazy(() => import("@/pages/ulasan"));
const NotifikasiPage = lazy(() => import("@/pages/notifikasi"));
const ReferralPage = lazy(() => import("@/pages/referral"));
const BantuanPage = lazy(() => import("@/pages/bantuan"));
const TosPage = lazy(() => import("@/pages/tos"));
const CariPage = lazy(() => import("@/pages/cari"));
const ComingSoonPage = lazy(() => import("@/pages/coming-soon"));
const RiwayatAktivitasPage = lazy(() => import("@/pages/riwayat-aktivitas"));
const SesiAktifPage = lazy(() => import("@/pages/sesi-aktif"));
const Setup2FAPage = lazy(() => import("@/pages/setup-2fa"));
const PilihBahasaPage = lazy(() => import("@/pages/pilih-bahasa"));
const PilihMataUangPage = lazy(() => import("@/pages/pilih-mata-uang"));
const PrivacyPage = lazy(() => import("@/pages/privacy"));
const UnduhDataPage = lazy(() => import("@/pages/unduh-data"));
const LaporkanPage = lazy(() => import("@/pages/laporkan"));
const NotFound = lazy(() => import("@/pages/not-found"));
const MaintenancePage = lazy(() => import("@/pages/maintenance"));
const CrewPage = lazy(() => import("@/pages/crew"));
const MitraDashboardPage = lazy(() => import("@/pages/mitra-dashboard"));
const MitraEditUsahaPage = lazy(() => import("@/pages/mitra-edit-usaha"));

const IS_MAINTENANCE = import.meta.env.VITE_MAINTENANCE_MODE === "true";

const queryClient = new QueryClient();
void QueryClient;

function PageFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#0194f3] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12, ease: "easeInOut" }}
        style={{ minHeight: "100dvh" }}
      >
    <Suspense fallback={null}>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      {/* Legacy explore links now use the same current Wisata flow. */}
      <Route path="/jelajahi" component={WisataPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/favorit" component={WishlistPage} />
      
      <Route path="/event" component={EventPage} />
      <Route path="/cultural-tour" component={NempoCulturalTourPage} />
      <Route path="/event/:slug/checkout" component={EventCheckout} />
      <Route path="/event/:slug" component={EventDetail} />
      
      <Route path="/kuliner" component={KulinerPage} />
      <Route path="/kuliner/:id" component={KulinerDetail} />
      <Route path="/warung" component={WarungPage} />
      <Route path="/cafe" component={CafePage} />
      <Route path="/cafe/:id" component={KulinerDetail} />
      <Route path="/jajan-yuk" component={JajanYukPage} />
      <Route path="/jajan-yuk/menu/:slug" component={JajanYukMenuPage} />
      <Route path="/jajan-yuk/lacak" component={JajanYukTrackPage} />
      <Route path="/jajan-yuk/:id" component={KulinerDetail} />
      
      <Route path="/wisata" component={WisataPage} />
      <Route path="/wisata/:id" component={WisataDetail} />
      
      <Route path="/penginapan" component={PenginapanPage} />
      <Route path="/penginapan/:id" component={PenginapanDetail} />
      
      
      <Route path="/tiket" component={TiketPage} />
      <Route path="/cek-tiket" component={CekTiketPage} />
      <Route path="/rent-car" component={RentCarPage} />
      <Route path="/adventure-gear" component={AdventureGearPage} />
      <Route path="/komunitas" component={KomunitasPage} />
      
      <Route path="/cerita-rakyat/:id" component={CeritaRakyatDetailPage} />
      <Route path="/cerita-rakyat" component={CeritaRakyatPage} />
      
      <Route path="/kamus-sunda" component={KamusSundaPage} />
      
      <Route path="/profile" component={ProfilePage} />
      <Route path="/profil" component={ProfilePage} />
      <Route path="/profil/ganti-password" component={ChangePasswordPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/profil/hapus-akun" component={DeleteAccountPage} />
      <Route path="/keranjang" component={KeranjangPage} />
      <Route path="/pesanan-saya" component={PesananSayaPage} />
      
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/register" component={RegisterPage} />
      <Route path="/thanks" component={ThanksPage} />
      
      <Route path="/voucherlist" component={VoucherListPage} />
      <Route path="/poin" component={PoinPage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/pembayaran" component={PembayaranPage} />
      <Route path="/verify" component={VerifyPage} />
      
      <Route path="/digital-services/super-app" component={DigitalSuperAppDemoPage} />
      <Route path="/digital-services/ticketing" component={DigitalTicketingDemoPage} />
      <Route path="/digital-services/kasir" component={DigitalKasirDemoPage} />
      <Route path="/digital-services/antrian" component={DigitalQueueDemoPage} />
      <Route path="/digital-services/booking" component={DigitalBookingDemoPage} />
      <Route path="/digital-services/purchasing" component={DigitalPurchasingDemoPage} />
      <Route path="/digital-services/loyalty" component={DigitalLoyaltyDemoPage} />
      <Route path="/digital-services/gudang" component={DigitalWarehouseDemoPage} />
      <Route path="/digital-services/invitation" component={DigitalInvitationDemoPage} />
      <Route path="/digital-services/company" component={DigitalCompanyDemoPage} />
      <Route path="/digital-services/yearbook" component={DigitalYearbookDemoPage} />
      <Route path="/digital-services/marketing" component={DigitalMarketingDemoPage} />
      <Route path="/digital-services/qr-menu/customer/:tableId" component={DigitalQrMenuCustomerPage} />
      <Route path="/digital-services/qr-menu" component={DigitalQrMenuDemoPage} />
      <Route path="/digital-services/crm" component={DigitalCrmDemoPage} />
      <Route path="/digital-services/invoice" component={DigitalInvoiceDemoPage} />
      <Route path="/digital-services/dapur-stock" component={DigitalDapurStockDemoPage} />
      <Route path="/digital-services/hpp" component={DigitalHppDemoPage} />
      <Route path="/digital-services/resep" component={DigitalRecipeDemoPage} />
      <Route path="/digital-services/human-resource" component={DigitalHumanResourceDemoPage} />
      <Route path="/digital-services/link-bio" component={DigitalLinkBioDemoPage} />
      <Route path="/digital-services" component={DigitalServicesPage} />
      <Route path="/influencer-hub" component={InfluencerHubPage} />
      <Route path="/sponsorship/halloween/proposal" component={HalloweenProposalPage} />
      <Route path="/sponsorship/halloween" component={SponsorshipEventPage} />
      <Route path="/sponsorship" component={SponsorshipPage} />
      <Route path="/event-organizer" component={EventOrganizerPage} />
      <Route path="/kerja-sama" component={PriceListPage} />
      <Route path="/price-list" component={PriceListPage} />
      {/* <Route path="/donasi-bibit" component={DonasiBibitPage} /> */}
      <Route path="/talent" component={TalentPage} />
      <Route path="/merchandise" component={MerchandisePage} />
      <Route path="/cari" component={CariPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/itinerary" component={ItineraryComingSoonPage} />
      
      <Route path="/edit-profil" component={EditProfilPage} />
      <Route path="/ulasan" component={UlasanPage} />
      <Route path="/notifikasi" component={NotifikasiPage} />
      <Route path="/referral" component={ReferralPage} />
      <Route path="/bantuan" component={BantuanPage} />
      <Route path="/tos" component={TosPage} />
      <Route path="/crew" component={CrewPage} />
      <Route path="/mitra-dashboard" component={MitraDashboardPage} />
      <Route path="/mitra-usaha/edit" component={MitraEditUsahaPage} />

      <Route path="/edit-email" component={ComingSoonPage} />
      <Route path="/edit-phone" component={ComingSoonPage} />
      <Route path="/verifikasi-identitas" component={ComingSoonPage} />
      <Route path="/sesi-aktif" component={SesiAktifPage} />
      <Route path="/riwayat-aktivitas" component={RiwayatAktivitasPage} />
      <Route path="/setup-2fa" component={Setup2FAPage} />
      <Route path="/pilih-bahasa" component={PilihBahasaPage} />
      <Route path="/pilih-mata-uang" component={PilihMataUangPage} />
      <Route path="/unduh-data" component={UnduhDataPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/laporkan" component={LaporkanPage} />
      
      <Route component={NotFound} />
    </Switch>
    </Suspense>
    </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const initPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const isHomePath = initPath === "/" || initPath === "";
  const forceSplash =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("splash") === "1";
  const [showSplash, setShowSplash] = useState(
    isHomePath && (import.meta.env.PROD || forceSplash),
  );

  useEffect(() => {
    if (!showSplash) return;

    // Do not let a throttled animation frame leave the app behind the splash.
    const fallback = window.setTimeout(() => setShowSplash(false), 4000);
    return () => window.clearTimeout(fallback);
  }, [showSplash]);

  if (IS_MAINTENANCE) {
    return (
      <Suspense fallback={<PageFallback />}>
        <MaintenancePage />
      </Suspense>
    );
  }

  return (
    <ErrorBoundary>
    <MatchProvider>
    <PancoProvider>
    <DarkModeProvider>
    <AuthProvider>
    <GoogleAuthProvider>
    <JingleProvider>
     <CityFilterProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NetworkStatus />
          <WouterRouter>
            <Router />
          </WouterRouter>
          <Toaster />
          <JingleMiniPlayer />
        </TooltipProvider>
        {showSplash && (
          <Suspense fallback={null}>
            <Splash onDone={() => setShowSplash(false)} />
          </Suspense>
        )}
      </QueryClientProvider>
     </CityFilterProvider>
    </JingleProvider>
    </GoogleAuthProvider>
    </AuthProvider>
    </DarkModeProvider>
    </PancoProvider>
    </MatchProvider>
    </ErrorBoundary>
  );
}

export default App;
