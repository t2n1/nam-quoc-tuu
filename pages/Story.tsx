import React from 'react';
import { useData } from '../context/DataContext';

const Story: React.FC = () => {
  const { siteContent } = useData();
  const { story } = siteContent;

  return (
    <div className="bg-cream-100 min-h-screen">
      
      {/* Cinematic Header */}
      <div className="h-[80vh] relative overflow-hidden flex items-end justify-center pb-20">
        <div className="absolute inset-0 z-0">
           <img 
              src={story.header.image}
              alt="Rừng núi Bắc Kạn"
              className="w-full h-full object-cover fixed top-0 left-0 -z-10 opacity-90 sepia-[30%] contrast-125 scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 animate-fade-in-up">
           <div className="font-script text-6xl md:text-8xl text-emerald-900 mb-2">{story.header.subtitle}</div>
           <h1 className="font-serif text-6xl md:text-9xl font-bold text-emerald-950 tracking-tighter mix-blend-color-burn">{story.header.title}</h1>
           <div className="mt-8 flex justify-center items-center gap-4 text-emerald-900/60 font-serif italic text-lg">
              <span>Bắc Kạn</span>
              <span className="w-2 h-2 rounded-full bg-emerald-900/40"></span>
              <span>Since 18xx</span>
           </div>
        </div>
      </div>

      {/* Story Content - Book Layout */}
      <div className="max-w-4xl mx-auto px-6 pb-32 -mt-20 relative z-20">
        
        <div className="bg-[#fdfbf7] p-12 md:p-24 shadow-2xl shadow-emerald-900/10 rounded-t-lg relative border-t-4 border-amber-600/30">
          
          {/* Paper Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none rounded-t-lg"></div>

          <div className="relative z-10">
            <div className="text-center mb-20">
              <span className="text-emerald-900/40 text-xs tracking-[0.5em] uppercase block mb-4">{story.chapter1.label}</span>
              <h2 className="font-serif text-4xl text-emerald-950">{story.chapter1.title}</h2>
              <div className="w-12 h-1 bg-amber-600 mx-auto mt-6"></div>
            </div>

            <article className="prose prose-stone prose-lg mx-auto font-serif leading-loose">
              <p className="lead text-2xl text-emerald-900/80 italic text-center mb-16 px-8">
                {story.chapter1.quote}
              </p>

              <div className="mb-12">
                <span className="float-left text-8xl font-serif text-emerald-950 leading-[0.8] mr-6 mt-2 font-bold drop-shadow-sm">{story.chapter1.dropCapText}</span>
                <p className="text-justify first-line:uppercase first-line:tracking-widest">
                  {story.chapter1.content}
                </p>
              </div>
              
              {/* Inserted Image with Caption */}
              <div className="my-20 relative -mx-6 md:-mx-12">
                 <div className="aspect-video overflow-hidden">
                   <img 
                     src={story.chapter1.image} 
                     alt="Men lá" 
                     className="w-full h-full object-cover grayscale brightness-110 contrast-90 hover:scale-105 transition-transform duration-[3s]"
                   />
                 </div>
                 <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur p-4 text-center border-t border-amber-200">
                    <p className="text-xs font-sans uppercase tracking-widest text-emerald-900">{story.chapter1.imageCaption}</p>
                 </div>
              </div>

              <h3 className="text-3xl font-bold text-emerald-950 mt-16 mb-8 text-center italic">{story.section2.title}</h3>
              
              <p className="text-justify mb-8">
                {story.section2.content}
              </p>

              {/* Highlight Box */}
              <div className="bg-emerald-900 text-cream-100 p-12 my-16 relative overflow-hidden rounded-sm shadow-inner">
                 <div className="absolute top-0 right-0 opacity-10 font-serif text-[12rem] leading-none -mr-8 -mt-12">"</div>
                 <h4 className="font-serif text-2xl text-amber-300 mb-6">{story.highlight.title}</h4>
                 <p className="italic font-light text-lg leading-relaxed opacity-90">
                   {story.highlight.content}
                 </p>
              </div>

              <h3 className="text-3xl font-bold text-emerald-950 mt-16 mb-8 text-center italic">{story.section3.title}</h3>
              <p className="text-justify">
                {story.section3.content}
              </p>

            </article>
            
            <div className="mt-24 pt-12 border-t border-emerald-900/10 text-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-20 mx-auto opacity-60 mb-6" />
               <p className="text-xs uppercase tracking-[0.3em] text-emerald-900 font-bold">{story.signature.name} • {story.signature.role}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;