import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, ArrowRight, Shield, Sparkles, Activity,
  Zap, BarChart3, Clock, Brain, Database,
  Target, FileCheck, MessageCircle,
  ChevronRight, Star, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useRef } from 'react';



/* ───── Fade-in Section Wrapper ───── */
const FadeInSection = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════════ */
/*  HERO SECTION                                      */
/* ═══════════════════════════════════════════════════ */
const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-gray-300 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Powered by Machine Learning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6">
              AI Heart Disease{' '}
              <span className="text-gradient-primary bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Prediction
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Dự đoán nguy cơ mắc bệnh tim bằng Trí tuệ Nhân tạo.
              Phân tích 15 chỉ số sức khỏe để đưa ra đánh giá chính xác và khuyến nghị phù hợp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to={user ? '/predict' : '/register'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-red-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 text-lg"
              >
                <Activity className="w-5 h-5" />
                Dự đoán ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Tìm hiểu thêm
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                Bảo mật dữ liệu
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Zap className="w-4 h-4 text-yellow-400" />
                Kết quả tức thì
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Target className="w-4 h-4 text-blue-400" />
                Độ chính xác 85%+
              </div>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Heart Illustration */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl animate-pulse-heart" />
                <div className="absolute inset-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-primary animate-pulse-heart" fill="currentColor" />
                </div>
                {/* ECG Line Animation */}
                <svg className="absolute top-1/2 -translate-y-1/2 -left-8 w-[120%]" height="60" viewBox="0 0 400 60">
                  <path
                    d="M0,30 L80,30 L100,10 L120,50 L140,5 L160,55 L180,30 L400,30"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeDasharray="800"
                    strokeDashoffset="800"
                    className="animate-ecg"
                  />
                </svg>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Accuracy</p>
                    <p className="text-lg font-bold text-white">85.7%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 left-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Heart Rate</p>
                    <p className="text-lg font-bold text-white">72 <span className="text-sm font-normal text-gray-400">bpm</span></p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -right-8 bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-gray-300 font-medium">AI Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="#F8FAFC" />
        </svg>
      </div>

      {/* ECG Animation Style */}
      <style>{`
        @keyframes ecg-draw {
          to { stroke-dashoffset: 0; }
        }
        .animate-ecg {
          animation: ecg-draw 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  ABOUT AI SECTION                                  */
/* ═══════════════════════════════════════════════════ */
const AboutAISection = () => {
  const cards = [
    {
      icon: Brain,
      title: 'AI là gì?',
      desc: 'Trí tuệ Nhân tạo (AI) là công nghệ cho phép máy tính mô phỏng khả năng học hỏi và suy luận của con người. Trong y tế, AI có thể phân tích lượng lớn dữ liệu để phát hiện mẫu bệnh.',
      color: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Database,
      title: 'AI hoạt động như thế nào?',
      desc: 'Mô hình được huấn luyện từ bộ dữ liệu Framingham Heart Study với hàng ngàn bệnh nhân. AI học từ mối liên hệ giữa các chỉ số sức khỏe và nguy cơ bệnh tim.',
      color: 'from-secondary to-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Activity,
      title: 'Phân tích dữ liệu',
      desc: 'Hệ thống phân tích 15 chỉ số sức khỏe bao gồm: tuổi, huyết áp, cholesterol, BMI, đường huyết, nhịp tim... để đưa ra dự đoán nguy cơ mắc bệnh tim mạch.',
      color: 'from-primary to-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" />
              Về AI trong Y tế
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Trí tuệ Nhân tạo trong{' '}
              <span className="text-secondary">Chẩn đoán Tim mạch</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Tìm hiểu cách AI giúp phát hiện sớm nguy cơ bệnh tim và bảo vệ sức khỏe của bạn.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div className="card-interactive group h-full">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-7 h-7 bg-gradient-to-r ${card.color} text-transparent`} style={{ stroke: 'url(#gradient)' }} />
                  <card.icon className={`w-7 h-7 text-${card.color.includes('primary') ? 'primary' : card.color.includes('secondary') ? 'secondary' : 'purple-600'}`} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{card.title}</h3>
                <p className="text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  FEATURES SECTION                                  */
/* ═══════════════════════════════════════════════════ */
const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Dự đoán nhanh',
      desc: 'Nhận kết quả dự đoán nguy cơ bệnh tim trong vài giây. Giao diện đơn giản, dễ sử dụng.',
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      icon: Target,
      title: 'Độ chính xác cao',
      desc: 'Mô hình AI đạt độ chính xác trên 85%, được huấn luyện từ dữ liệu y khoa thực tế.',
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      icon: Clock,
      title: 'Lưu lịch sử',
      desc: 'Tự động lưu trữ tất cả kết quả dự đoán, theo dõi sự thay đổi nguy cơ theo thời gian.',
      color: 'text-secondary',
      bg: 'bg-blue-50',
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot hỗ trợ',
      desc: 'Trò chuyện với AI để được tư vấn về sức khỏe tim mạch, giải thích kết quả dự đoán.',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              Tính năng nổi bật
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Tại sao chọn <span className="text-primary">HeartAI</span>?
            </h2>
            <p className="text-text-secondary text-lg">
              Hệ thống tích hợp nhiều tính năng hiện đại giúp bạn chủ động trong việc chăm sóc sức khỏe tim mạch.
            </p>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="card-interactive group h-full text-center">
                <div className={`w-16 h-16 rounded-2xl ${f.bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-8 h-8 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  HOW IT WORKS                                     */
/* ═══════════════════════════════════════════════════ */
const HowItWorks = () => {
  const steps = [
    { icon: FileCheck, title: 'Nhập thông tin sức khỏe', desc: 'Điền 15 chỉ số sức khỏe cơ bản: tuổi, huyết áp, cholesterol, BMI...' },
    { icon: Brain, title: 'AI xử lý dữ liệu', desc: 'Mô hình Machine Learning phân tích và so sánh với hàng ngàn ca bệnh.' },
    { icon: BarChart3, title: 'Dự đoán nguy cơ', desc: 'Hệ thống đưa ra tỷ lệ phần trăm nguy cơ mắc bệnh tim mạch.' },
    { icon: Heart, title: 'Nhận khuyến nghị', desc: 'Xem kết quả chi tiết kèm lời khuyên chăm sóc sức khỏe phù hợp.' },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
              <ChevronRight className="w-4 h-4" />
              Quy trình hoạt động
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Cách <span className="text-secondary">HeartAI</span> hoạt động
            </h2>
            <p className="text-text-secondary text-lg">
              Chỉ 4 bước đơn giản để biết nguy cơ bệnh tim của bạn.
            </p>
          </div>
        </FadeInSection>

        <div className="relative">
          {/* Connection Line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="relative text-center group">
                  {/* Step Number */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-20 h-20 rounded-full bg-white shadow-card-hover flex items-center justify-center mx-auto group-hover:shadow-card-lg transition-all duration-300 relative z-10">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold shadow-lg z-20">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ═══════════════════════════════════════════════════ */
/*  CTA SECTION                                       */
/* ═══════════════════════════════════════════════════ */
const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <FadeInSection>
          <div className="relative bg-gradient-to-r from-primary to-red-500 rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-4 right-8 w-48 h-48 border-2 border-white rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <Heart className="w-16 h-16 text-white/90 mx-auto mb-6 animate-pulse-heart" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Kiểm tra sức khỏe tim mạch ngay hôm nay
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Phát hiện sớm nguy cơ bệnh tim để có biện pháp phòng ngừa kịp thời.
                Chỉ mất 2 phút để bắt đầu.
              </p>
              <Link
                to={user ? '/predict' : '/register'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-lg"
              >
                <Activity className="w-5 h-5" />
                Bắt đầu dự đoán miễn phí
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════ */
/*  HOME PAGE                                         */
/* ═══════════════════════════════════════════════════ */
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutAISection />
      <FeaturesSection />
      <HowItWorks />

      <CTASection />
    </>
  );
};

export default HomePage;
