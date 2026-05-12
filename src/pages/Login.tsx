import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError('بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-white flex items-center justify-center p-4 selection:bg-gold selection:text-ink relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[120px] pointer-events-none z-0 opacity-30" />
      <div className="bg-grid-pattern absolute inset-0 z-0 opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bento-card luxury-border p-8 rounded-[2rem] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl mx-auto flex items-center justify-center mb-4 border border-gold/30">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white">تسجيل الدخول للوحة التحكم</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium px-1">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-light border border-gold/20 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-gold/60 transition-colors placeholder:text-gray-600 dir-ltr text-right"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400 font-medium px-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-light border border-gold/20 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-gold/60 transition-colors placeholder:text-gray-600 dir-ltr text-right"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-ink font-bold rounded-xl py-3 mt-6 transition-colors shadow-lg shadow-gold/20 disabled:opacity-50"
          >
            {loading ? 'جاري التحميل...' : 'دخول'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
