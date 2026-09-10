'use client';

import { useI18n } from '@/components/providers/i18n-provider';
import { motion } from 'framer-motion';

export default function PageHeading({ title, description }: { title: string; description: string }) {
  const { t } = useI18n();
  return (
    <motion.header
      className="portfolio-page-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="eyebrow">Benedikt Schächner / {t.nav.home}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </motion.header>
  );
}
