import { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface LinkItem {
  id: string;
  platform: string;
  url: string;
  title: string;
  desc: string;
  isActive: boolean;
  isPrimary?: boolean;
}

export interface SiteData {
  title: string;
  subtitle: string;
  logoUrl: string;
  mapEmbedUrl: string;
  features: string[];
  links: LinkItem[];
}

const defaultData: SiteData = {
  title: "معرض وجمعية سند",
  subtitle: "الوجهة الأولى للأجهزة المنزلية، الكهربائية، والموبايلات في بغداد.",
  logoUrl: "https://c.top4top.io/p_3784m8oov1.png",
  mapEmbedUrl: "https://maps.google.com/maps?q=بغداد%20الشعب%20سوق%204000%20النموذجي&t=m&z=15&ie=UTF8&output=embed",
  features: ["أجهزة كهربائية ومنزلية", "موبايلات أصلية", "نقد وتقسيط مريح"],
  links: [
    { id: 'whatsapp', platform: 'whatsapp', url: 'https://wa.me/message/WADVSETEAQV2I1', title: 'تواصل عبر واتساب', desc: 'للاستفسارات والطلبات بشكل مباشر وسريع فريقنا جاهز لخدمتك', isActive: true, isPrimary: true },
    { id: 'phone', platform: 'phone', url: 'tel:07766667858', title: 'اتصال مباشر', desc: '07766667858', isActive: true },
    { id: 'instagram', platform: 'instagram', url: 'https://www.instagram.com/sanad.6688', title: 'انستغرام', desc: 'تصفح العروض', isActive: true },
    { id: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/share/1EfvhVdPpR/', title: 'فيسبوك', desc: 'مجتمعنا وأخبارنا', isActive: true },
    { id: 'tiktok', platform: 'tiktok', url: 'https://www.tiktok.com/@user9477974923504', title: 'تيك توك', desc: 'تغطيات المعرض', isActive: true }
  ]
};

interface SiteContextType {
  data: SiteData;
  loading: boolean;
}

const SiteContext = createContext<SiteContextType>({ data: defaultData, loading: true });

export const useSiteData = () => useContext(SiteContext);

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<SiteData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...defaultData, ...docSnap.data() } as SiteData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <SiteContext.Provider value={{ data, loading }}>
      {children}
    </SiteContext.Provider>
  );
};
