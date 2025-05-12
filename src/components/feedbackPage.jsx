import React, { useState } from 'react';
import '../styles/feedbackPage.css';

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      name: 'أحمد محمد',
      comment: 'تجربة رائعة، الخدمة كانت ممتازة والطاقم كان محترفًا جدًا.',
      rating: 5,
      date: '2023-10-15',
      likes: 24,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      liked: false
    },
    {
      id: 2,
      name: 'سارة علي',
      comment: 'كانت الرحلة مريحة والخدمة جيدة، لكن تأخرت قليلاً.',
      rating: 4,
      date: '2023-09-22',
      likes: 15,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      liked: false
    },
    {
      id: 3,
      name: 'خالد عبدالله',
      comment: 'أسعار معقولة وجودة خدمة ممتازة، سأكرر التجربة بالتأكيد.',
      rating: 5,
      date: '2023-08-05',
      likes: 31,
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      liked: false
    },

    
  ]);

  const [expandedImage, setExpandedImage] = useState(null);

  const handleLike = (id) => {
    setFeedbackList(feedbackList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
          liked: !item.liked
        };
      }
      return item;
    }));
  };

  const handleImageClick = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div className="feedback-page">
      <h1>آراء العملاء السابقين</h1>
      
      <div className="feedback-container">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-header">
              <img 
                src={feedback.image} 
                alt={feedback.name} 
                className="customer-avatar"
                onClick={() => handleImageClick(feedback.image)}
              />
              <div className="customer-info">
                <h3>{feedback.name}</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < feedback.rating ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
                <span className="date">{feedback.date}</span>
              </div>
            </div>
            <p className="comment">{feedback.comment}</p>
            <div className="feedback-footer">
              <button 
                className={`like-btn ${feedback.liked ? 'liked' : ''}`}
                onClick={() => handleLike(feedback.id)}
              >
                <span>👍</span> {feedback.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {expandedImage && (
        <div className="image-modal" onClick={closeExpandedImage}>
          <img src={expandedImage} alt="Expanded customer" />
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;