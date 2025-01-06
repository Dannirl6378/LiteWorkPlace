import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Jazykové soubory
const resources = {
  en: {
    translation: {
      aboutMe: "About Me",
      introduction: "Hello, my name is Daniel, and I have been diving into web development for the past two years. Over this time, I have gained hands-on experience in creating web applications, and I am constantly striving to improve my skills",
      currentlyLooking: "Currently, I live in Slovakia, and I'm actively looking for opportunities in the IT field, particularly in front-end development. However, as you'll notice from my website, I also have experience with back-end technologies and database management.",
      projects: "This website is a testament to my learning journey. It’s my first project where I combined everything I’ve learned into creating a functional web application. I hope this platform allows me to showcase my growth and skills as I continue on my journey in the tech industry.",
      freeTime:"In my free time, I enjoy working on personal projects, exploring new technologies, and keeping up with the latest trends in front-end development. I’m always open to learning and evolving, and I’m eager to take on new challenges.",
    },
  },
  cs: {
    translation: {
      aboutMe: "O mně",
      introduction: "Ahoj, jmenuji se Daniel a poslední dva roky se intenzivně věnuji webovému vývoji. Během této doby jsem získal praktické zkušenosti s tvorbou webových aplikací a neustále se snažím zlepšovat své dovednosti.",
      currentlyLooking: "V současné době žiji na Slovensku a aktivně hledám příležitosti v oblasti IT, zejména ve front-end vývoji. Nicméně, jak si můžete všimnout na mém webu, mám také zkušenosti s back-endovými technologiemi a správou databází.",
      projects: "Tento web je důkazem mého studijního postupu. Jedná se o můj první projekt, ve kterém jsem zkombinoval vše, co jsem se naučil, a vytvořil funkční webovou aplikaci. Doufám, že tato platforma umožní ukázat můj růst a schopnosti, které neustále zdokonaluji na své cestě v technologickém odvětví.",
      freeTime:"Ve volném čase se rád věnuji osobním projektům, zkoumání nových technologií a sledování nejnovějších trendů ve front-end vývoji. Vždy se snažím učit a vyvíjet, a jsem připraven čelit novým výzvám.",
    },
  },
};

i18n
  .use(LanguageDetector) // Detekce jazyka
  .use(Backend) // Načítání jazykových souborů
  .use(initReactI18next) // Inicializace pro React
  .init({
    resources,
    lng: 'cs', // Výchozí jazyk
    fallbackLng: 'cs', // Pokud není jazyk k dispozici
    interpolation: {
      escapeValue: false, // Bez úpravy HTML
    },
  });

export default i18n;
