import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }
  };
  async function colorizeImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
  
    try {
      const response = await fetch('https://api.deepai.org/api/colorizer', {
        method: 'POST',
        headers: {
          'Api-Key': 'eab5c044-50d1-49ff-af2b-d24714798cdd' // 替换为你的DeepAI API密钥
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.output_url; // DeepAI返回的上色图片的URL
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

const handleColorizeImage = async () => {
  if (!selectedImage) {
    alert('请先上传一张图片！');
    return;
  }

  // 从URL创建一个Blob对象
  const response = await fetch(selectedImage);
  const blob = await response.blob();

  // 调用上色服务
  const colorizedImageUrl = await colorizeImage(blob);
  if (colorizedImageUrl) {
    setSelectedImage(colorizedImageUrl); // 更新状态以显示上色后的图片
  }
};

  return (
    <div className='main-container'>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="fileInput"
        className="file-input"
      />
      <label htmlFor="fileInput" className="upload-button">
       
          上传图片
        
      </label>
      {selectedImage && (
        <div className="image-container">
          <img src={selectedImage} alt="Selected" className="main-image" />
          <button
  className="button"
  onClick={handleColorizeImage} // 鼠标点击事件

>
  彩色化图片
</button>
        </div>
      )}
    </div>
  );
}

export default App;
