import { motion } from 'motion/react';
import { MapPin, Phone, ExternalLink, ShieldCheck, CreditCard, Box, MousePointerClick, MessageCircle, Instagram, Code, Video } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

const WhatsappIcon = ({className = "w-6 h-6"}) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const InstagramIcon = ({className = "w-6 h-6"}) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({className = "w-6 h-6"}) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TiktokIcon = ({className = "w-6 h-6"}) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'whatsapp': return WhatsappIcon;
    case 'instagram': return InstagramIcon;
    case 'facebook': return FacebookIcon;
    case 'tiktok': return TiktokIcon;
    case 'phone': return Phone;
    default: return ExternalLink;
  }
};

const SocialCard = ({ href, icon: Icon, title, desc, delay, colSpan = "col-span-1 lg:col-span-2" }: any) => (
  <motion.a 
    href={href} 
    target={href.startsWith('http') ? "_blank" : undefined} 
    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
    initial={{ opacity: 0, y: 30 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay }}
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
    className={`${colSpan} bento-card luxury-border p-4 sm:p-5 md:p-6 rounded-[1.25rem] md:rounded-[2rem] group flex flex-col items-center justify-center text-center overflow-hidden relative shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]`}
  >
    <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-28 h-28 sm:w-36 sm:h-36 bg-gold opacity-15 blur-[35px] group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"></div>

    <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.2rem] border border-gold/30 flex items-center justify-center mb-3 md:mb-4 bg-surface/80 text-gold group-hover:bg-gold group-hover:text-ink transition-colors duration-500 z-10 relative shadow-[0_0_15px_rgba(195,163,67,0.1)] group-hover:shadow-[0_0_25px_rgba(195,163,67,0.4)]">
      <Icon className="w-6 h-6 md:w-8 md:h-8" />
    </div>

    <h2 className="font-bold text-sm sm:text-base md:text-lg text-white group-hover:text-gold transition-colors z-10 duration-300">{title}</h2>
    <p className="text-[11px] md:text-sm md:font-medium text-gray-400 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity z-10 dir-ltr">{desc}</p>
  </motion.a>
);

const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 20 }).map((_, i) => {
      // 30% from top area, 70% from bottom area for better upper distribution
      const startY = Math.random() > 0.7 ? Math.random() * 50 : 80 + Math.random() * 30; 
      
      return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gold-light"
        style={{
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          left: `${Math.random() * 100}%`,
          top: `${startY}%`,
        }}
        animate={{
          y: [0, -Math.random() * 400 - 300],
          opacity: [0, Math.random() * 0.4 + 0.1, 0],
          x: [0, (Math.random() - 0.5) * 80]
        }}
        transition={{
          duration: 15 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    )})}
  </div>
);

export default function Home() {
  const { data, loading } = useSiteData();

  if (loading) {
    return <div className="min-h-screen bg-ink flex items-center justify-center text-gold">جاري التحميل...</div>;
  }

  const primaryLink = data.links.find(l => l.isPrimary);
  const secondaryLinks = data.links.filter(l => !l.isPrimary && l.isActive);

  return (
    <div className="min-h-screen bg-ink text-white relative overflow-hidden selection:bg-gold selection:text-ink">
      <div className="bg-grid-pattern absolute inset-0 z-0 opacity-40 hover:opacity-60 transition-opacity duration-1000 pointer-events-none"></div>
      
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gold/20 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0 opacity-40" />
      <div className="absolute bottom-0 left-0 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gold-light/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none z-0 opacity-40" />

      <Particles />

      <main className="w-full max-w-4xl mx-auto z-10 relative px-4 py-10 md:px-8 md:py-20 flex flex-col items-center">
        
        <motion.div
           initial={{ y: -30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full text-center flex flex-col items-center mb-10 md:mb-14"
        >
          <div className="relative mb-10 md:mb-14 group flex justify-center items-center">
            <div className="absolute inset-0 bg-gold/30 blur-[50px] md:blur-[70px] rounded-full scale-[1.4] opacity-50 pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-white/10 blur-[30px] rounded-full z-0 pointer-events-none" /> 
            
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 relative z-10 flex items-center justify-center">
              <img 
                src={data.logoUrl} 
                alt={data.title} 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:drop-shadow-[0_20px_40px_rgba(195,163,67,0.3)] transition-all duration-700 ease-out"
              />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold gold-gradient-text tracking-tight mb-3 md:mb-4">
            {data.title}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed px-2">
            {data.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {data.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-xs md:text-base font-medium backdrop-blur-md hover:bg-gold/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(195,163,67,0.05)]"
              >
                <Box className="w-4 h-4" />
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 w-full flex justify-center z-20"
        >
            <div className="inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-6 md:px-10 py-3 md:py-4 rounded-3xl border border-gold/40 bg-surface/90 backdrop-blur-xl shadow-[0_0_25px_rgba(195,163,67,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 w-full h-full shine-effect pointer-events-none opacity-50"></div>
                
                <div className="flex items-center gap-2 relative z-10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                  </span>
                  <span className="text-gold-light text-sm md:text-lg font-bold tracking-wide">
                      اختر وسيلة التواصل المناسبة لك
                  </span>
                </div>
            </div>
        </motion.div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-16 md:mb-24 px-2 lg:px-0">
          
          {primaryLink && (
            <motion.a 
              href={primaryLink.url}
              target={primaryLink.url.startsWith('http') ? "_blank" : undefined}
              rel={primaryLink.url.startsWith('http') ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="col-span-2 lg:col-span-4 bento-card luxury-border p-5 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] group flex items-center justify-between relative overflow-hidden shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute -top-16 -right-16 w-36 h-36 md:w-56 md:h-56 bg-gold opacity-15 blur-[40px] group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0"></div>

              <div className="flex-1 pr-1 md:pr-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 min-h-[28px] text-[10px] sm:text-xs md:text-sm rounded-full bg-gold/10 text-gold-light font-bold mb-3 border border-gold/30 backdrop-blur-sm self-start">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-[pulse_1s_ease-in-out_infinite]"></span>
                  متاح الآن للرد السريع
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-1.5 md:mb-2 text-white group-hover:text-gold transition-colors duration-300">{primaryLink.title}</h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base pr-1">{primaryLink.desc}</p>
              </div>
              
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1rem] md:rounded-[1.5rem] border border-gold/40 flex flex-shrink-0 items-center justify-center bg-surface/90 text-gold group-hover:bg-gold group-hover:text-ink transition-all duration-500 z-10 relative shadow-[0_0_20px_rgba(195,163,67,0.15)] group-hover:shadow-[0_0_30px_rgba(195,163,67,0.4)] group-hover:scale-110 ml-1">
                {(() => {
                  const Icon = getPlatformIcon(primaryLink.platform);
                  return <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />;
                })()}
              </div>
            </motion.a>
          )}

          {secondaryLinks.map((link, index) => (
            <SocialCard
               key={link.id}
               href={link.url}
               icon={getPlatformIcon(link.platform)}
               title={link.title}
               desc={link.desc}
               delay={0.7 + (index * 0.1)}
               colSpan="col-span-1 lg:col-span-2"
            />
          ))}

        </div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="w-full flex flex-col items-center mt-4"
        >
          <div className="flex items-center justify-between gap-3 md:gap-5 w-full max-w-2xl px-2 mb-8 mt-2">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-gold-dark opacity-80 rounded-full shadow-[0_0_10px_rgba(195,163,67,0.5)]"></div>
            <div className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full border border-gold/40 bg-surface/80 backdrop-blur-md shadow-[0_0_20px_rgba(195,163,67,0.15)] shrink-0 relative overflow-hidden group">
              <div className="absolute inset-0 w-full h-full shine-effect pointer-events-none opacity-40"></div>
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gold animate-bounce shrink-0 relative z-10" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-gold whitespace-nowrap pt-1 relative z-10 tracking-wide">
                موقع المعرض
              </h2>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-l from-transparent via-gold to-gold-dark opacity-80 rounded-full shadow-[0_0_10px_rgba(195,163,67,0.5)]"></div>
          </div>
          
          <p className="text-gray-300 mb-8 text-center max-w-lg text-base md:text-lg">
            بغداد ـ الشعب ـ مجاور سوق 4000 النموذجي
            <br />
            <a href="https://maps.app.goo.gl/WP1zWEA6ZjwLffBo7?g_st=atm" target="_blank" rel="noopener noreferrer" className="text-gold-light hover:text-gold inline-flex items-center gap-1.5 mt-4 text-xs sm:text-sm font-bold transition-all bg-gold/10 px-5 py-2.5 rounded-full border border-gold/30 hover:bg-gold/20 hover:shadow-[0_0_15px_rgba(195,163,67,0.3)] hover:scale-105">
              فتح في تطبيق الخرائط <ExternalLink className="w-4 h-4" />
            </a>
          </p>

          <div className="w-full h-[300px] sm:h-[350px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden luxury-border bento-card p-1.5 md:p-2 shadow-xl md:shadow-2xl relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>

            <div className="w-full h-full rounded-[1.25rem] md:rounded-3xl overflow-hidden relative bg-surface-light/50 z-10">
              <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
              <iframe 
                src={data.mapEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="filter opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              ></iframe>
            </div>
          </div>
        </motion.div>

      </main>
      
      <footer className="mt-16 sm:mt-24 text-center text-gray-500 text-sm z-10 w-full py-8 border-t border-white/5 bg-surface/80 backdrop-blur-xl relative">
        <p className="font-light text-sm sm:text-base text-gray-400">
          © {new Date().getFullYear()} <span className="text-gold font-bold">{data.title}</span>. جميع الحقوق محفوظة.
        </p>
        <p className="text-[10px] md:text-xs opacity-40 mt-3 uppercase tracking-[0.4em] font-sans">
          Baghdad, Iraq
        </p>
      </footer>
    </div>
  );
}
