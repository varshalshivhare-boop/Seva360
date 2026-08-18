import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preloadInitialBuffer } from '../utils/frameLoader';
import { LoadingScreen } from '../components/LoadingScreen';
import { CinematicScroll } from '../components/CinematicScroll';
import { ROUTES } from '../config/routes';

export const LandingPage: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start preloading initial critical frames
    preloadInitialBuffer((_loaded, _total, percent) => {
      setLoadingProgress(percent);
    }).then(() => {
      setTimeout(() => {
        setIsReady(true);
      }, 400);
    });
  }, []);

  const handleNavigate = (route: string) => {
    navigate(route || ROUTES.APP_ENTRY);
  };

  return (
    <>
      <LoadingScreen progress={loadingProgress} isReady={isReady} />
      <CinematicScroll onNavigate={handleNavigate} />
    </>
  );
};
