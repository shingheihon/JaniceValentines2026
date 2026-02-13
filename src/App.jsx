import React, { useMemo, useState } from 'react'
import Card from './components/Card'
import MusicPlayer from './components/MusicPlayer'
import Modal from './components/Modal'
import './index.css'

function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Import all images from assets folder
  // eager: true ensures they are imported directly. 
  // We use a glob pattern to match all image types we expect.
  const imagesGlob = import.meta.glob('./assets/*.{jpg,JPG,jpeg,png}', { eager: true });

  // Extract the image URLs from the imported modules
  const allImages = useMemo(() => {
    return Object.entries(imagesGlob).map(([path, module]) => {
      const name = path.split('/').pop();
      return {
        path,
        src: module.default,
        name
      };
    });
  }, []);

  // Filter out the hero image if we want to treat it differently, or just specific search
  const heroImageName = 'IMG_6434';
  const heroImage = allImages.find(img => img.name.includes(heroImageName))?.src;

  // CUSTOMIZABLE TEXT FOR EACH IMAGE
  // Edit the text inside the quotes to change the message for that specific image.
  // Featured images list
  const FEATURED_IMAGE_NAMES = [
    'IMG_5138.jpg',
    'IMG_8723.JPG',
    'f6e0d11e-8384-4b7a-a996-c445458674df.JPG'
  ];

  const featuredImages = allImages.filter(img => FEATURED_IMAGE_NAMES.includes(img.name));
  const regularImages = allImages.filter(img => !FEATURED_IMAGE_NAMES.includes(img.name));

  // CUSTOMIZABLE TEXT FOR EACH IMAGE
  // Edit the text inside the quotes to change the message for that specific image.
  const CUSTOM_MESSAGES = {
    "419da2d1-9462-4a48-a7c6-7fda18632dc6.JPG": "Driving with baby",
    "FullSizeRender.jpg": "Cruise with baby",
    "IMG_1225.jpg": "OOTD with baby",
    "IMG_1270.jpg": "Lizzy line with baby",
    "IMG_5845.jpg": "London balcony with baby",
    "IMG_6254.jpg": "Carrying baby",
    "IMG_6434.jpg": "Battersea with baby",
    "IMG_6579.jpg": "Beef wellington with baby",
    "IMG_7556.jpg": "Sophisticated baby",
    "IMG_5138.jpg": "Ice cream with baby",
    "IMG_8723.JPG": "Cute selfie from baby",
    "f6e0d11e-8384-4b7a-a996-c445458674df.JPG": "My baby ❤️",
    "IMG_2596.jpg": "Shopping with baby",
    "IMG_3049.jpg": "Christmas lights with baby",
    "IMG_3284.jpg": "Anniversary with baby",
    "IMG_3856.jpg": "After sex with baby",
    "IMG_5698.jpg": "Tube with baby",
    "IMG_5959.JPG": "Tiktok dancing with my baby",
    "IMG_7319.jpg": "Christmas party with baby",
    "IMG_7508.jpg": "KBBQ with baby",
    "IMG_7574.jpg": "Baking with baby",
    "IMG_9406.jpg": "Park with baby",
    "IMG_6243.jpg": "Malaysian food with baby",
    "c1803ec8-b5e5-4955-972e-a02c9e97e54d.JPG": "Studying with baby",
  };

  // POPUP POPUP TEXT messages
  // Text to show inside the popup modal when clicked
  const POPUP_MESSAGES = {
    "419da2d1-9462-4a48-a7c6-7fda18632dc6.JPG": "Candle lights, driving till late night with the best food. Wingstop, 番茄炒牛肉, 土豆絲 and many more. 11/08/2025",
    "FullSizeRender.jpg": "Before I flew to Hong Kong, I organised a date for me and my sweetheart. We started with the Pardox Musuem, then went to have KBBQ. Afterwards we went on the river thames for our very first time. 07/09/2025.",
    "IMG_1225.jpg": "Lost the stussy beanie LOL. Went to have dumplings in city centre and OOTD fit pic with my baby. 07/11/2025",
    "IMG_1270.jpg": "The countless of lizzy line pics with my baby, all the cute selfies, listening to music together, sharing airpods, and chatting :)",
    "IMG_5845.jpg": "This beautiful woman flew from Scotland to spend time with me in London, we had so much sex, good food, and cuddles in bed. 08/04/2025",
    "IMG_6254.jpg": "Planned a romantic date in Notting Hill with my baby, we had walked so much and her little legs got a little tired. I carried her for that long straight of a street. 12/4/2025",
    "IMG_6434.jpg": "Went to Battersea Park with my baby, we played ping pong together and I smoked her (As usual I beat her at everything). We then sat by the park and took pictures on our digicam. 13/04/2025",
    "IMG_6579.jpg": "I planned a fancy dinner for us on regent street. We went to Gordon Ramsay's restaurant and I looked up if it would be good! Sadly the beef wellington wasn't out of the world perect, but it was still great and very yummy. Especially with my girlfriend to be there with me! 21/08/2025",
    "IMG_7556.jpg": "This was the first time my baby came to visit me. Haha look at her, she's so cute and sophisticated. Professional woman, smart woman. I like :) 18/02/2025",
    "IMG_2596.jpg": "Went to the city and shopped together. Went to Stussy store, took this picture at the carhartt store. I remember also buying the Urban Revito T shirt here with my baby as well. 24/05/2025",
    "IMG_3049.jpg": "Boxing day with my baby, we went to walk around London city center to see the christmas lights. Walked through Soho and took this picture. We then went to have KBBQ and it was so so yum! 24/12/2025",
    "IMG_3284.jpg": "We went to Early's Court to have a really nice meal at a michelin restaurant. The christmas tree was beautiful and atmosphere was amazing. Then we went to St James Bar to wrap our anniversary. Where it all started :) 27/12/2025",
    "IMG_3856.jpg": "All the kissing, cuddling, and touching. We fuck everyday, without fail. 06/11/2025",
    "IMG_5698.jpg": "Countless of selfies on the tube with my baby, my baby keeps touching my dick on the ride, such a naughty girl ;)",
    "IMG_5959.JPG": "Tried learning Love Scenario dance together, recorded a few videos which I hold so dearly to my heart. It was so fun, and seeing my baby roll on the floor dying of laughter is something I can't ever get tired of. 03/08/2025",
    "IMG_7319.jpg": "In momento we had planned and setup the christmas party. Setting up the table, bringing drinks down, and playing party games together with my baby ;) 20/12/2025",
    "IMG_7508.jpg": "Also on boxing day, the KBBQ service was so cool, they helped us cut up the meat and vegetables, and even cooked for us if we requested to! We took lots of cute pictures and had an amazing boxing day dinner :) I remember her being sleepy on the lizzy line, and slept on my shoulder. So cute. 24/12/2025",
    "IMG_7574.jpg": "It was christmas day. We had such a sweet time being together at home, watching our favourite cooking show, buying KFC and Pizza to have a large feast! And most importantly, my amazing creation, the best cupcake design ever. I surprised my baby with cupcakes we could bake together. We ended up laughing, recording, and having a blast baking together. To more baking in the future :) 25/12/2025",
    "IMG_9406.jpg": "We went on a date to Kensington Gardens, and caught this cute pic of my baby staring at the swan. So peaceful. So cute. There were tones of pigeons to the side, and seeing her scared face running to me, was the best thing ever. 12/04/2025",
    "IMG_6243.jpg": "My baby brought me to an such a yum malaysian restaurant, it was so gooddddd. There was even a buffet there and I got to eat some off of my baby :) I remember waking up quite early for it as well, and we managed to catch the morning buffet breakfast! So yum, and sweet, all with my baby. 10/08/2025",
    "c1803ec8-b5e5-4955-972e-a02c9e97e54d.JPG": "Studying with baby, my hardworking baby and I went to the cafe downstairs of Elephant and Castle, and she was studying hard for her CFA. I had some courses I wanted to finish as well, the AWS Solutions Architect course. Finished my test with a 78% :) The drinks were so amazing as well, and a very calming and amazing environment. To more studying together :) 12/07/2025",
  };

  const handleCardClick = (img) => {
    setSelectedCard(img);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <MusicPlayer />
      <Modal
        isOpen={!!selectedCard}
        onClose={closeModal}
        image={selectedCard?.src}
        text={selectedCard ? (POPUP_MESSAGES[selectedCard.name] || "Example Popup Text") : ""}
      />
      <div className="hero-container">
        {heroImage && (
          <div className="hero-image-container">
            <img src={heroImage} alt="Us" className="hero-image" />
          </div>
        )}
        <h1 className="quintessential-regular hero-title">Happy Valentines Day Janice</h1>
        <p className="quintessential-regular hero-subtitle">From the most loving person ever Shing Hei Hon ;)</p>
      </div>

      <div className="card-grid">
        {regularImages.map((img, index) => (
          <Card
            key={index}
            image={img.src}
            text={CUSTOM_MESSAGES[img.name] || "Example Text"}
            onClick={() => handleCardClick(img)}
          />
        ))}
      </div>

      <div className="featured-grid">
        {featuredImages.map((img, index) => (
          <div key={index} className="featured-card-wrapper">
            <Card
              image={img.src}
              text={CUSTOM_MESSAGES[img.name] || "Example Text"}
            />
          </div>
        ))}
      </div>

      <div className="letter-section">
        <h2 className="quintessential-regular letter-greeting">Dear Miss Janice</h2>
        <p className="quintessential-regular letter-body">
          Happy Valentines Day my love. I hope you enjoy this little something I made for you. Countless of memories together, and marking 1 year of knowing you. I can't wait for more to come. I've collected some of my favourite memories together, and I hope you enjoy looking through our goofy times together.
        </p>
        <p className="quintessential-regular letter-body">
          December 27th, it all started at St James bar, and all the memories we've had together has blossomed into something much more. Capturing all the sweet moments we've had together in a little website for you.
        </p>
        <p className="quintessential-regular letter-body">
          I know long distance can be tough, but we're going it through it together :) As long as I'm with you, we can go through anything.
        </p>
        <p className="quintessential-regular letter-closing">With Love,</p>
        <p className="quintessential-regular letter-closing">Mister Shing Hei</p>
      </div>
    </>
  )
}

export default App
