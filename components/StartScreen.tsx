/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloudIcon, SparklesIcon } from './icons';
import { Compare } from './ui/compare';
import { generateModelImage } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';

interface StartScreenProps {
  onModelFinalized: (modelUrl: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onModelFinalized }) => {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [generatedModelUrl, setGeneratedModelUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setUserImageUrl(dataUrl);
        setIsGenerating(true);
        setGeneratedModelUrl(null);
        setError(null);
        try {
            const result = await generateModelImage(file);
            setGeneratedModelUrl(result);
        } catch (err) {
            setError(getFriendlyErrorMessage(err, 'Failed to create model'));
            setUserImageUrl(null);
        } finally {
            setIsGenerating(false);
        }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const reset = () => {
    setUserImageUrl(null);
    setGeneratedModelUrl(null);
    setIsGenerating(false);
    setError(null);
  };

  const screenVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <AnimatePresence mode="wait">
      {!userImageUrl ? (
        <motion.div
          key="uploader"
          className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 perspective-container"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left card-3d p-8 rounded-2xl">
            <div className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <SparklesIcon className="w-8 h-8 text-gold-500 mr-3 animate-float" />
                <span className="text-gold-500 font-semibold tracking-wider uppercase text-sm">Luxury Fashion Experience</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif font-black luxury-heading leading-tight mb-6">
                Elevate Your Style with Spannick Designers
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Experience the future of luxury menswear. Upload your photo and witness our AI craft your personal fashion model, ready to showcase our exclusive collection with unprecedented realism.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto lg:mx-0 mb-8"></div>
              <div className="flex flex-col items-center lg:items-start w-full gap-4">
                <label htmlFor="image-upload-start" className="w-full relative flex items-center justify-center px-10 py-4 text-lg font-bold luxury-button rounded-xl cursor-pointer group transition-all duration-300">
                  <UploadCloudIcon className="w-5 h-5 mr-3" />
                  Begin Your Transformation
                </label>
                <input id="image-upload-start" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFileChange} />
                <p className="text-gray-400 text-base text-center lg:text-left">Select a clear, full-body photograph. Portrait shots are acceptable, though full-body images yield optimal results for our luxury fitting experience.</p>
                <p className="text-gray-500 text-sm mt-2 text-center lg:text-left">By proceeding, you consent to responsible and lawful use of our premium AI styling service.</p>
                {error && <p className="text-red-400 text-base mt-3 p-3 bg-red-900/20 rounded-lg border border-red-500/30">{error}</p>}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center perspective-container">
            <Compare
              firstImage="https://storage.googleapis.com/gemini-95-icons/asr-tryon.jpg"
              secondImage="https://storage.googleapis.com/gemini-95-icons/asr-tryon-model.png"
              slideMode="drag"
              className="w-full max-w-sm aspect-[2/3] rounded-3xl bg-black/20 border-2 border-gold-500/30 shadow-2xl luxury-card"
            />
            <div className="mt-6 text-center">
              <p className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Drag to Compare</p>
              <p className="text-gray-400 text-xs mt-1">See the transformation in real-time</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="compare"
          className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 perspective-container"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="md:w-1/2 flex-shrink-0 flex flex-col items-center md:items-start card-3d p-8 rounded-2xl">
            <div className="text-center md:text-left max-w-lg">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <SparklesIcon className="w-6 h-6 text-gold-500 mr-2 animate-float" />
                <span className="text-gold-500 font-semibold tracking-wider uppercase text-xs">Transformation Complete</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-black luxury-heading leading-tight mb-4">
                Your Luxury Avatar
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Witness your metamorphosis. Drag the slider to reveal your sophisticated digital persona, crafted for the finest menswear experience.
              </p>
            </div>
            
            {isGenerating && (
              <div className="flex items-center gap-4 text-xl text-gold-500 font-serif mt-8 glass-panel p-4 rounded-xl">
                <Spinner />
                <span>Crafting your luxury avatar...</span>
              </div>
            )}

            {error && 
              <div className="text-center md:text-left text-red-400 max-w-md mt-8 glass-panel p-6 rounded-xl border border-red-500/30">
                <p className="font-bold text-lg mb-2">Transformation Interrupted</p>
                <p className="text-base mb-4">{error}</p>
                <button onClick={reset} className="text-base font-semibold text-gold-500 hover:text-gold-400 transition-colors">Retry Transformation</button>
              </div>
            }
            
            <AnimatePresence>
              {generatedModelUrl && !isGenerating && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center gap-6 mt-10"
                >
                  <button 
                    onClick={reset}
                    className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-white/10 border border-white/20 rounded-xl cursor-pointer hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                  >
                    Select Different Image
                  </button>
                  <button 
                    onClick={() => onModelFinalized(generatedModelUrl)}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold luxury-button rounded-xl cursor-pointer group transition-all duration-300"
                  >
                    Enter Fashion Studio →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center perspective-container">
            <div 
              className={`relative rounded-3xl transition-all duration-700 ease-in-out luxury-card ${isGenerating ? 'border-2 border-gold-500/50 animate-pulse gold-glow' : 'border-2 border-gold-500/30'}`}
            >
              <Compare
                firstImage={userImageUrl}
                secondImage={generatedModelUrl ?? userImageUrl}
                slideMode="drag"
                className="w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] lg:w-[400px] lg:h-[600px] rounded-3xl bg-black/20 shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartScreen;
