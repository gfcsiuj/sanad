import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useSiteData, SiteData, LinkItem } from '../context/SiteContext';
import { motion } from 'motion/react';
import { Save, LogOut, Plus, Trash2, GripVertical, Image, MapPin, Type, List, Link as LinkIcon } from 'lucide-react';

export default function Admin() {
  const { data: initialData, loading: ctxLoading } = useSiteData();
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'features' | 'links'>('general');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (initialData && !data && !ctxLoading) {
      setData(JSON.parse(JSON.stringify(initialData)));
    }
  }, [initialData, ctxLoading]);

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as SiteData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), data);
      alert('تم الحفظ بنجاح');
    } catch (error) {
      console.error("Error saving data:", error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading || !data) {
    return <div className="min-h-screen bg-ink flex items-center justify-center text-gold">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-ink text-white selection:bg-gold selection:text-ink pb-20" dir="rtl">
      {/* Header */}
      <header className="bg-surface border-b border-gold/20 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold font-display text-gold">لوحة التحكم</h1>
          <div className="flex gap-3">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-ink px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'general' ? 'bg-gold/10 text-gold border border-gold/30' : 'bg-surface/50 text-gray-400 hover:bg-surface border border-transparent'}`}
          >
            <Type className="w-5 h-5" />
            الاعدادات العامة
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'features' ? 'bg-gold/10 text-gold border border-gold/30' : 'bg-surface/50 text-gray-400 hover:bg-surface border border-transparent'}`}
          >
            <List className="w-5 h-5" />
            المميزات (التاغات)
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'links' ? 'bg-gold/10 text-gold border border-gold/30' : 'bg-surface/50 text-gray-400 hover:bg-surface border border-transparent'}`}
          >
            <LinkIcon className="w-5 h-5" />
            الروابط ووسائل التواصل
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-surface-light/50 border border-gold/20 rounded-2xl p-6 md:p-8">
          
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Type className="w-5 h-5 text-gold" /> النصوص والشعار</h2>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">عنوان الموقع الرئيسي</label>
                <input 
                  type="text" 
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full bg-surface border border-gold/30 rounded-lg p-3 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">الوصف (النص الفرعي)</label>
                <textarea 
                  value={data.subtitle}
                  onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                  className="w-full bg-surface border border-gold/30 rounded-lg p-3 text-white focus:outline-none focus:border-gold h-24"
                />
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm text-gray-300 font-medium flex items-center gap-2"><Image className="w-4 h-4 text-gold" /> رابط الشعار (URL)</label>
                <input 
                  type="text" 
                  value={data.logoUrl}
                  onChange={(e) => setData({ ...data, logoUrl: e.target.value })}
                  className="w-full bg-surface border border-gold/30 rounded-lg p-3 text-white focus:outline-none focus:border-gold dir-ltr text-left"
                />
                {data.logoUrl && (
                   <img src={data.logoUrl} alt="Logo preview" className="h-16 object-contain bg-surface/50 p-2 rounded mt-2" />
                )}
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm text-gray-300 font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> رابط تضمين الخريطة (Embed URL)</label>
                <textarea 
                  value={data.mapEmbedUrl}
                  onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })}
                  className="w-full bg-surface border border-gold/30 rounded-lg p-3 text-white focus:outline-none focus:border-gold h-24 dir-ltr text-left text-sm font-mono"
                />
                <p className="text-xs text-gray-500">انسخ رابط src من كود التضمين في خرائط جوجل.</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold flex items-center gap-2"><List className="w-5 h-5 text-gold" /> المميزات</h2>
                 <button 
                   onClick={() => setData({ ...data, features: [...data.features, 'ميزة جديدة'] })}
                   className="flex items-center gap-1 bg-gold/20 text-gold hover:bg-gold/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
                 >
                   <Plus className="w-4 h-4" /> اضافة ميزة
                 </button>
              </div>

              <div className="space-y-3">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...data.features];
                        newFeatures[idx] = e.target.value;
                        setData({ ...data, features: newFeatures });
                      }}
                      className="flex-1 bg-surface border border-gold/20 rounded-lg p-3 text-white focus:outline-none focus:border-gold"
                    />
                    <button 
                      onClick={() => {
                        const newFeatures = data.features.filter((_, i) => i !== idx);
                        setData({ ...data, features: newFeatures });
                      }}
                      className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'links' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold flex items-center gap-2"><LinkIcon className="w-5 h-5 text-gold" /> أزرار التواصل</h2>
                 <button 
                   onClick={() => {
                     const newLink: LinkItem = {
                       id: Date.now().toString(),
                       platform: 'link',
                       title: 'زر جديد',
                       desc: 'وصف الزر الجديد',
                       url: 'https://',
                       isActive: true
                     };
                     setData({ ...data, links: [...data.links, newLink] });
                   }}
                   className="flex items-center gap-1 bg-gold/20 text-gold hover:bg-gold/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
                 >
                   <Plus className="w-4 h-4" /> اضافة زر
                 </button>
              </div>

              <div className="space-y-4">
                {data.links.map((link, idx) => (
                  <div key={link.id} className="bg-surface border border-gold/20 rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                      <div className="flex items-center gap-3">
                         <GripVertical className="w-5 h-5 text-gray-600 cursor-move" />
                         <span className="font-bold">{link.title || 'زر بدون اسم'}</span>
                         {link.isPrimary && <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded-md">الزر الرئيسي الممتد</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input 
                            type="checkbox" 
                            checked={link.isActive}
                            onChange={(e) => {
                              const newLinks = [...data.links];
                              newLinks[idx] = { ...link, isActive: e.target.checked };
                              setData({ ...data, links: newLinks });
                            }}
                            className="w-4 h-4 accent-gold"
                          />
                          مفعل
                        </label>
                        <button 
                          onClick={() => {
                            const newLinks = data.links.filter(l => l.id !== link.id);
                            setData({ ...data, links: newLinks });
                          }}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400">العنوان</label>
                        <input 
                          type="text" 
                          value={link.title}
                          onChange={(e) => {
                            const newLinks = [...data.links];
                            newLinks[idx] = { ...link, title: e.target.value };
                            setData({ ...data, links: newLinks });
                          }}
                          className="w-full bg-surface-light border border-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400">نص الوصف</label>
                        <input 
                          type="text" 
                          value={link.desc}
                          onChange={(e) => {
                            const newLinks = [...data.links];
                            newLinks[idx] = { ...link, desc: e.target.value };
                            setData({ ...data, links: newLinks });
                          }}
                          className="w-full bg-surface-light border border-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400">الرابط</label>
                        <input 
                          type="text" 
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...data.links];
                            newLinks[idx] = { ...link, url: e.target.value };
                            setData({ ...data, links: newLinks });
                          }}
                          className="w-full bg-surface-light border border-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-gold focus:outline-none dir-ltr text-left"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400">الأيقونة (المنصة)</label>
                        <select 
                          value={link.platform}
                          onChange={(e) => {
                            const newLinks = [...data.links];
                            newLinks[idx] = { ...link, platform: e.target.value };
                            setData({ ...data, links: newLinks });
                          }}
                          className="w-full bg-surface-light border border-gold/20 rounded-lg px-3 py-2 text-sm text-white focus:border-gold focus:outline-none appearance-none"
                        >
                          <option value="whatsapp">واتساب</option>
                          <option value="instagram">انستغرام</option>
                          <option value="facebook">فيسبوك</option>
                          <option value="tiktok">تيك توك</option>
                          <option value="phone">هاتف / اتصال</option>
                          <option value="link">رابط عام (افتراضي)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
