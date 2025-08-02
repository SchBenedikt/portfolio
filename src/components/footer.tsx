'use client';

import { useState } from 'react';
import { AchievementsModal } from './achievements-modal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="relative z-10 py-6 border-t border-border/50">
        <div className="container mx-auto px-6 sm:px-8 flex justify-between items-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Benedikt Schächner. All Rights Reserved.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:text-primary transition-colors underline"
          >
            View Achievements
          </button>
        </div>
      </footer>
      <AchievementsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
