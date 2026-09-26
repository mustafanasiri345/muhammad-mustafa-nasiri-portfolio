import { useState, useRef, useEffect } from 'react';
import { ArrowDown, Mail, MapPin, Upload, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Hero() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mustafa_custom_avatar');
    if (saved) {
      setProfileImage(saved);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfileImage(base64);
        localStorage.setItem('mustafa_custom_avatar', base64);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPlaceholder = () => {
    setProfileImage(null);
    localStorage.removeItem('mustafa_custom_avatar');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-amber-300/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-blue-900/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-600/10 blur-[100px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Location & Brand Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 shadow-sm mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="tracking-wide text-slate-200">{PERSONAL_INFO.location}</span>
            </div>

            {/* Main Prominent Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-2">
              <span className="block text-white">
                Muhammad Mustafa
              </span>
              <span className="gold-gradient-text">
                Nasiri
              </span>
            </h1>

            {/* Urdu Name Presentation */}
            <div className="my-2" dir="rtl">
              <span className="text-3xl sm:text-4xl md:text-5xl font-urdu text-amber-300/90 font-medium tracking-wide drop-shadow-md">
                {PERSONAL_INFO.urduName}
              </span>
            </div>

            {/* Headline */}
            <div className="mt-2 mb-6">
              <h2 className="text-base sm:text-lg md:text-xl font-medium text-slate-300 tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-amber-300 font-semibold">AI Content Creator</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-200">Digital Media Creator</span>
                <span className="text-slate-500">|</span>
                <span className="text-amber-400 font-medium tracking-wider">Nasiri Production</span>
              </h2>
            </div>

            {/* Urdu Short Introduction Quote */}
            <div 
              dir="rtl" 
              className="w-full p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-900/90 via-[#0c1220] to-slate-900/90 border border-amber-500/20 shadow-xl mb-8 relative group"
            >
              <div className="absolute top-2 left-3 opacity-20 text-amber-400 font-serif text-3xl select-none">❝</div>
              <p className="font-urdu text-base sm:text-lg text-amber-100/95 text-right font-normal leading-[2.3]">
                {PERSONAL_INFO.heroIntroUrdu}
              </p>
              <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-sans">
                <span className="text-amber-400/80">ناصری پروڈکشن</span>
                <span>•</span>
                <span>تخلیقی ویژن</span>
              </div>
            </div>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('portfolio')}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/40 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Role focus points */}
            <div className="mt-8 pt-6 border-t border-white/5 w-full flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Video & Imagery
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Social Media & Posters</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">YouTube Thumbnails</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Islamic & Educational</span>
            </div>

          </div>

          {/* Right Column: Professional Profile Image Placeholder & Uploader */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-amber-400/25 via-transparent to-amber-500/10 blur-xl opacity-70" />

              {/* Main Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0f172a]/95 via-[#0b101d] to-[#07090e] border border-amber-400/30 p-6 sm:p-7 shadow-2xl">
                
                {/* Header tag */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-amber-300/90">
                      Creator Profile Photo
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {profileImage ? 'Custom Photo Loaded' : 'Official Placeholder'}
                  </span>
                </div>

                {/* Profile Visual Display Area */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border-2 border-dashed border-amber-400/40 bg-gradient-to-br from-slate-900 via-[#0d1322] to-slate-950 flex flex-col items-center justify-center p-6 text-center group">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Muhammad Mustafa Nasiri Profile" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {/* Stylized Monogram Graphic */}
                      <div className="relative">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-slate-800 border border-amber-400/40 flex items-center justify-center shadow-inner">
                          <div className="flex flex-col items-center">
                            <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter gold-gradient-text">
                              MMN
                            </span>
                            <span className="text-xs font-urdu text-amber-300/80 -mt-1">
                              محمد مصطفیٰ
                            </span>
                          </div>
                        </div>
                        {/* Camera upload icon badge */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          title="Click to upload your photo"
                          className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-amber-400 text-slate-950 shadow-lg hover:bg-amber-300 transition-colors cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Explicit Placeholder Notice (per instruction: Clearly marked placeholder, do not generate fake human face) */}
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-semibold text-amber-200">
                          Profile Photo Placeholder
                        </p>
                        <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto leading-relaxed">
                          Reserved for Muhammad Mustafa Nasiri's official photograph.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Corner Accent Decor */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/60" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/60" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/60" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/60" />
                </div>

                {/* Upload Action Bar */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-photo-input"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{profileImage ? 'Change Photo' : 'Upload Your Photo'}</span>
                    </button>

                    {profileImage && (
                      <button
                        type="button"
                        onClick={handleResetPlaceholder}
                        title="Reset to default placeholder"
                        className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {uploadSuccess && (
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Photo updated successfully! Saved locally.</span>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-500 text-center">
                    Upload your headshot anytime (PNG, JPG). Stored locally in your browser.
                  </p>
                </div>

                {/* Micro branding strip below placeholder */}
                <div className="mt-3 py-2 px-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Brand Identity</span>
                  <span className="font-semibold text-amber-300">Nasiri Production</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
