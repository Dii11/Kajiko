import React from "react";
import chart from "../assets/chart.png";
import fond from "../assets/fond.jpg";
import save from "../assets/save.png";
import * as motion from "motion/react-client";
const LandingPage = () => {
  return (
    <div className="flex flex-col max-h-full gap-10 py-2 ">
      <header className=" flex justify-between items-center  p-4">
        <div className="text-green-950  text-2xl">Kajiko</div>
        <button className="bg-primaryColor p-3 rounded-2xl text-secondaryColor">
          Se connecter
        </button>
      </header>
      {/* //heros section */}
      <section className="flex flex-col justify-center gap-30 scroll-smooth">
        <span className="text-primaryColor font-family-font text-4xl text-center">
          Visualisez, suivez et optimisez vos dépenses en toute simplicité.
        </span>
        <div className=" grid grid-cols-3 w-xl gap-15 items-end m-auto ">
          <div
            className="rounded-xl  h-80 w-48 bg-cover"
            style={{ backgroundImage: `url(${fond})` }}
          ></div>
          <div className="rounded-xl  bg-secondaryColor h-56 w-48 flex flex-col items-center p-4">
            <img alt="save" src={chart} width={80} />
            <span className="text-primaryColor">
              Atteignez vos objectifs d'épargne 2x plus rapidement grâce à nos
              outils de suivi.
            </span>
          </div>
          <div className="rounded-xl  h-80 w-48 bg-primaryColor flex flex-col items-center p-4 justify-end">
            <img src={save} alt="chart" width={80} />
            <span className="text-secondaryColor">
              Économisez en moyenne 15% par mois en identifiant vos habitudes de
              dépenses.
            </span>
          </div>
        </div>
      </section>
      {/* features section */}
      <section className="bg-primaryColor h-150 text-secondaryColor flex flex-col items center justify-center items-center gap-2.5 scroll-smooth">
        <span className="text-2xl w-1/4">
          Visualisation des Dépenses Objectifs d'Épargne
        </span>
        <div
          className="w-full h-100 flex flex-wrap  gap-5 justify-center "
          
        >
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="personalisation" src={save} width={50} loading="lazy" />
            <h6>Budgets Personnalisables</h6>
            <span className="text-white/80">
              Fixez des limites par catégorie (alimentation, loisirs, transport,
              etc.) et recevez des alertes.
            </span>
          </div>
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="save" src={save} width={50} />
            <h6>Maîtrise totale de votre budget personnel</h6>
            <span className="text-white/80">
              Définissez vos objectifs (vacances, achat immobilier, etc.) et
              suivez votre progression.
            </span>
          </div>
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="gain de temps" src={save} width={50} />
            <h6>Gain de temps dans la gestion de vos finances</h6>
            <span className="text-white/80">
              Analysez vos dépenses sur différentes périodes (hebdomadaire,
              mensuelle, annuelle).
            </span>
          </div>
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="no stress" src={save} width={50} />
            <h6>Réduction du stress lié à l'argent</h6>
            <span className="text-white/80">
              offrant une clarté totale sur vos dépenses et vos objectifs. Moins
              de confusion, plus de contrôle, et un esprit plus tranquille
            </span>
          </div>
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
            <img alt="save" src={save} width={50} />
            <h6>Possibilité d'exporter vos données au format CSV</h6>
            <span className="text-white/80">
              pour une analyse approfondie dans vos outils préférés (tableurs,
              logiciels de comptabilité, etc.)
            </span>
          </div>
          <div className=" features_card bg-secondaryColor/10 p-5 w-1/4 h-3/6 flex flex-col gap-1">
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
      {/* CTA section */}
      <section className="h-100 flex flex-col items-center justify-center gap-10 scroll-smooth">
        <span className="text-primaryColor text-2xl ">
          Interface intuitive et facile à utiliser, même pour les débutants.
        </span>
        <button className="p-4 ring-secondaryColor ring-2 rounded-xl ">
          Commencer
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
