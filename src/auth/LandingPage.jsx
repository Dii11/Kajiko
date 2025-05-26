import React from "react";
import { motion } from "framer-motion";
import chart from "../assets/chart.png";
import fond from "../assets/fond .webp";
import save from "../assets/save.png";
import logo from "../assets/logo.webp";


const images = [
  {
    key: "fond",
    content: (
      <div
        className="rounded-xl h-80 w-48 bg-cover"
        style={{ backgroundImage: `url(${fond})` }}
      ></div>
    ),
  },
  {
    key: "chart",
    content: (
      <div className="rounded-xl bg-slate-300 h-56 w-48 flex flex-col items-center p-4">
        <img alt="save" src={chart} width={80} />
        <span className="text-slate-950">
          Atteignez vos objectifs d'épargne 2x plus rapidement grâce à nos outils de suivi.
        </span>
      </div>
    ),
  },
  {
    key: "save",
    content: (
      <div className="rounded-xl h-80 w-48 bg-slate-950 flex flex-col items-center p-4 justify-end">
        <img src={save} alt="chart" width={80} />
        <span className="text-secondary">
          Économisez en moyenne 15% par mois en identifiant vos habitudes de dépenses.
        </span>
      </div>
    ),
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col max-h-full gap-5 ">
      <header className="  flex justify-between items-center  p-4">
        <img src={logo} className="" alt='logo' width={100}/>
        <button className="bg-slate-950 px-3 py-2 rounded-2xl text-secondary text-md">
          Se connecter
        </button>
      </header>
      <section className="flex flex-col justify-center gap-10 scroll-smooth">
        <motion.span
          className="text-slate-950 text-3xl md:text-2xl text-center block"
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "keyframes", stiffness: 60 }}
        >
          Visualisez, suivez et optimisez vos dépenses en toute simplicité.
        </motion.span>
        <div className="grid grid-cols-3 w-xl gap-15 items-end m-auto">
          {images.map((img, i) => (
            <motion.div
              key={img.key}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.5,
                type: "keyframes",
                stiffness: 60,
              }}
            >
              {img.content}
            </motion.div>
          ))}
        </div>
      </section>
      {/* features section */}
      <section className="bg-slate-950 h-150 text-secondary flex flex-col items center justify-center items-center gap-2.5 scroll-smooth">
        <span className="text-2xl text-accent  ">
          Visualisation des Dépenses <br/>Objectifs d'Épargne
        </span>
        <div
          className="w-full h-100 flex flex-wrap  gap-5 justify-center "
          
        >
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="personalisation" src={save} width={50} loading="lazy" />
            <h6>Budgets Personnalisables</h6>
            <span className="hidden md:block text-white/80">
              Fixez des limites par catégorie (alimentation, loisirs, transport,
              etc.) et recevez des alertes.
            </span>
          </div>
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="save" src={save} width={50} />
            <h6>Maîtrise totale de votre budget personnel</h6>
            <span className="text-white/80">
              Définissez vos objectifs (vacances, achat immobilier, etc.) et
              suivez votre progression.
            </span>
          </div>
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="gain de temps" src={save} width={50} />
            <h6>Gain de temps dans la gestion de vos finances</h6>
            <span className="text-white/80">
              Analysez vos dépenses sur différentes périodes (hebdomadaire,
              mensuelle, annuelle).
            </span>
          </div>
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="no stress" src={save} width={50} />
            <h6>Réduction du stress lié à l'argent</h6>
            <span className="text-white/80">
              offrant une clarté totale sur vos dépenses et vos objectifs. Moins
              de confusion, plus de contrôle, et un esprit plus tranquille
            </span>
          </div>
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="save" src={save} width={50} />
            <h6>Possibilité d'exporter vos données au format CSV</h6>
            <span className="text-white/80">
              pour une analyse approfondie dans vos outils préférés (tableurs,
              logiciels de comptabilité, etc.)
            </span>
          </div>
          <div className=" features_card bg-secondary/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="décision éclairée" src={save} width={50} />
            <h6>Prise de décision financière éclairée</h6>
            <span className="text-white/80">
              {" "}
              Soyez informé des dépassements de budget et des transactions
              importantes.
            </span>
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default LandingPage;
