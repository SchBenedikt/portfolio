'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React & Next.js',
  'Three.js & WebGL',
  'Framer Motion',
  'Generative AI (Genkit)',
  'UI/UX Design',
  'Tailwind CSS',
  'Node.js',
  'Firebase',
];

const experiences = [
    {
        role: "Creative Technologist",
        company: "Future Systems Inc.",
        period: "2021 - Present",
        description: "Leading the development of immersive web experiences using Next.js and Three.js. Specialized in creating AI-driven interactive installations and data visualizations that push the boundaries of user engagement."
    },
    {
        role: "Frontend Developer",
        company: "Digital Innovations Co.",
        period: "2018 - 2021",
        description: "Developed and maintained responsive user interfaces for high-traffic e-commerce platforms. Focused on performance optimization and creating fluid animations with Framer Motion and CSS."
    }
]

const education = {
    degree: "Master of Science in Human-Computer Interaction",
    university: "University of Design & Technology",
    period: "2016 - 2018"
}

export default function ResumePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative z-10 flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter font-headline">
                        Resume
                    </h1>
                    <p className="text-2xl text-muted-foreground mt-2">Benedikt Schächner</p>
                </div>
                <Button className="rounded-full text-lg py-6 px-8 mt-4">
                    <Download className="mr-3"/>
                    Download CV
                </Button>
            </div>

            <div className="space-y-12">
                <section>
                    <h2 className="text-5xl font-bold font-headline mb-6">Experience</h2>
                    <div className="space-y-8">
                        {experiences.map(exp => (
                             <Card key={exp.company} className="overflow-hidden rounded-3xl">
                                <CardHeader>
                                    <div className="flex justify-between items-baseline">
                                        <CardTitle className="text-3xl font-bold font-headline">{exp.role}</CardTitle>
                                        <p className="text-lg text-muted-foreground">{exp.period}</p>
                                    </div>
                                    <CardDescription className="text-xl pt-1">{exp.company}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg text-muted-foreground">{exp.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-5xl font-bold font-headline mb-6">Skills</h2>
                     <Card className="rounded-3xl">
                        <CardContent className="p-6">
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-lg rounded-lg px-4 py-1">
                                    {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>
                
                <section>
                    <h2 className="text-5xl font-bold font-headline mb-6">Education</h2>
                     <Card className="overflow-hidden rounded-3xl">
                        <CardHeader>
                            <div className="flex justify-between items-baseline">
                                <CardTitle className="text-3xl font-bold font-headline">{education.degree}</CardTitle>
                                <p className="text-lg text-muted-foreground">{education.period}</p>
                            </div>
                            <CardDescription className="text-xl pt-1">{education.university}</CardDescription>
                        </CardHeader>
                    </Card>
                </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
