import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import { checkAdminAuth } from './auth/auth';
// filepath: c:\Users\PC\OneDrive\Desktop\transportation\projectweb\projectweb\projectweb\pro\src\components\HomePage.js

const HomePage = () => {
  const navigate = useNavigate();
  const middleSectionRef = useRef(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status on component mount
  useEffect(() => {
    const verifyAdmin = async () => {
      const adminStatus = await checkAdminAuth();
      setIsAdmin(adminStatus);
    };
    verifyAdmin();
  }, []);

  const toggleChatbot = () => setShowChatbot(!showChatbot);

  const services = [
    { 
      title: "تذاكر الأتوبيسات", 
      description: "احصل على تذاكر الأتوبيسات بسهولة وراحة", 
      image: "/bus.jpg",
      onClick: () => navigate('/bus-booking') 
    },
    { 
      title: "تذاكر الطيران", 
      description: "احجز تذاكر السفر بأسعار تنافسية وسهولة", 
      image: "/plane.jpg",
      onClick: () => navigate('/flight-booking')
    },
    { 
      title: "تذاكر القطارات", 
      description: "تنقل بسهولة عبر تذاكر القطارات بكل سهولة ويسر", 
      image: "/train.jpg",
      onClick: () => navigate('/train-booking')
    }
  ];

  const scrollToMiddle = () => {
    middleSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/login');
  const handleContactClick = () => navigate('/contact');
  const handleOffersClick = () => navigate('/offers');
  const handleFeedbackClick = () => navigate('/feedback');
  
  const handleAdminClick = async () => {
    if (await checkAdminAuth()) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  const topPlaces = [
    { name: "الأهرامات بالجيزة", description: "آخر عجائب الدنيا السبع الباقية من العالم القديم", image: "/pyramids.jpg", link: "https://ar.wikipedia.org/wiki/%D8%A3%D9%87%D8%B1%D8%A7%D9%85_%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9" },
    { name: "معبد أبو سمبل", description: "تحفة معمارية منحوتة في الصخر من عهد رمسيس الثاني", image: "/abu-simbel.webp", link: "https://ar.wikipedia.org/wiki/%D9%85%D8%B9%D8%A8%D8%AF_%D8%A3%D8%A8%D9%88_%D8%B3%D9%85%D8%A8%D9%84" },
    { name: "شرم الشيخ", description: "جوهرة سيناء وواحدة من أفضل الوجهات السياحية العالمية", image: "/sharm.jpg", link: "https://ar.wikipedia.org/wiki/%D8%B4%D8%B1%D9%85_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE" },
    { name: "واحة سيوة", description: "جنة صحراوية فريدة مع عيون مائية وثقافة أمازيغية", image: "/siwa.jpeg", link: "https://ar.wikipedia.org/wiki/%D9%88%D8%A7%D8%AD%D8%A9_%D8%B3%D9%8A%D9%88%D8%A9" },
    { name: "معبد الكرنك", description: "أكبر مجمع ديني في العالم القديم بالأقصر", image: "/karnak.jpeg", link: "https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%83%D8%B1%D9%86%D9%83" },
    { name: "قلعة قايتباي", description: "حصن تاريخي مهيب يطل على البحر المتوسط في الإسكندرية", image: "/qaitbay.jpg", link: "https://ar.wikipedia.org/wiki/%D9%82%D9%84%D8%B9%D8%A9_%D9%82%D8%A7%D9%8A%D8%AA%D8%A8%D8%A7%D9%8A" }
  ];

  return (
    <div className="font-sans bg-gray-100">
      <header className="header">
        <h1 className="logo">NILEWAY</h1>
        <nav className="nav-links">
          <button onClick={handleOffersClick} className="nav-button">عروضنا</button>
          <button onClick={handleContactClick} className="nav-button contact-link">اتصل بنا</button>
          <Link to="/feedback" className="nav-button">آراء العملاء</Link>
          <button onClick={handleAdminClick} className="nav-button admin-link">
            {isAdmin ? 'لوحة التحكم' : 'تسجيل دخول الأدمن'}
          </button>
        </nav>
        <div className="buttons">
          {!isAdmin && (
            <>
              <button className="btn-outline" onClick={handleLoginClick}>تسجيل الدخول</button>
              <button className="btn-primary" onClick={handleRegisterClick}>إنشاء حساب</button>
            </>
          )}
        </div>
      </header>

      <section 
        className="hero relative h-[80vh] min-h-[600px] flex items-center justify-center text-white text-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/bar.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fadeIn leading-tight">
            اكتشف مصر بكل سهولة مع <br className="hidden sm:block" />
            <span className="text-gold font-extrabold">NILEWAY</span>
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl mb-12 max-w-4xl mx-auto animate-fadeIn delay-100 leading-snug">
            احجز رحلتك القادمة بين محافظات مصر <br className="hidden md:block" />
            بأسعار تنافسية وخدمة مميزة
          </p>
          <div className="flex justify-center animate-fadeIn delay-200">
            <button 
              onClick={scrollToMiddle}
              className="bg-transparent border-3 border-black hover:bg-white hover:text-dark font-bold py-5 px-12 rounded-full transition duration-300 text-2xl md:text-3xl"
              style={{ 
                backgroundColor: '#FFD700', 
                color: 'black', 
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer'
              }}>
              ابدأ الحجز الآن
            </button>
          </div>
        </div>
      </section>

      <section className="services" ref={middleSectionRef}>
        <h2>سافر بسهولة وراحة داخل مصر</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              onClick={service.onClick || undefined}
              style={{ cursor: service.onClick ? 'pointer' : 'default' }}
            >
              <img src={service.image} alt={service.title} className="service-image" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.onClick && (
                <button 
                  className="book-now-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    service.onClick();
                  }}
                >
                  احجز الآن
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="top-places">
        <h2>أفضل 5 رحلات سياحية في مصر</h2>
        <div className="places-grid">
          {topPlaces.map((place, index) => (
            <a 
              key={index} 
              href={place.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="place-card"
              style={{ textDecoration: 'none' }}
            >
              <img 
                src={place.image} 
                alt={place.name} 
                className="place-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/placeholder.jpg';
                }}
              />
              <div className="place-info">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Chat button */}
      <button 
        onClick={() => window.open('/Chatbot/Chatbot/index.html', '_blank')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FFD700',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 1000
        }}
        title="تحدث معنا"
      >
        💬
      </button>

      {showChatbot && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '400px',
          height: '500px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 999
        }}>
          <iframe 
            src="/Chatbot/Chatbot/index.html"
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '15px' }}
            title="Chatbot"
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;