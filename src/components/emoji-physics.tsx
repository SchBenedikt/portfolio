'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export const EmojiPhysics = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || !sceneRef.current) return;
    hasInitialized.current = true;

    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = 0.3; 

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const createStaticBoundary = (selector: string) => {
        const elem = document.querySelector(selector) as HTMLElement;
        if (!elem) return null;
        const { x, y, width, height } = elem.getBoundingClientRect();
        return Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, { isStatic: true, render: { visible: false } });
    }

    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true, render: { visible: false } });
    const title = createStaticBoundary('#hero-title');
    const subtitle = createStaticBoundary('#hero-subtitle');
    const button = createStaticBoundary('#hero-button');

    const staticElements = [ground, title, subtitle, button].filter(Boolean) as Matter.Body[];
    Matter.Composite.add(world, staticElements);

    const emojis = ['💻', '🎨', '🚀', '🤖', '💡', '✨'];
    const spawnEmoji = () => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const body = Matter.Bodies.circle(Math.random() * window.innerWidth, -50, 18, {
        restitution: 0.5,
        friction: 0.4,
        render: {
          sprite: {
            texture: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="36">${emoji}</text></svg>`),
            xScale: 1,
            yScale: 1,
          },
        },
      });
      Matter.Composite.add(world, body);
    };

    const interval = setInterval(spawnEmoji, 300);

    Matter.Runner.run(engine);
    Matter.Render.run(render);
    
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 25 });
      Matter.Body.setVertices(ground, Matter.Vertices.fromPath(`L 0 0 L ${window.innerWidth} 0 L ${window.innerWidth} 50 L 0 50`));
      
      [
        { body: title, selector: '#hero-title' },
        { body: subtitle, selector: '#hero-subtitle' },
        { body: button, selector: '#hero-button' }
      ].forEach(item => {
        if(item.body) {
           const elem = document.querySelector(item.selector) as HTMLElement;
           if(elem) {
               const { x, y, width, height } = elem.getBoundingClientRect();
               Matter.Body.setPosition(item.body, { x: x + width / 2, y: y + height / 2 });
               Matter.Body.setVertices(item.body, Matter.Vertices.fromPath(`L 0 0 L ${width} 0 L ${width} ${height} L 0 ${height}`));
           }
        }
      });
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};
