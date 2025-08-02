
export const blogData = [
  {
    title: 'Eigene KI (Ollama) hosten',
    slug: 'eigene-ki-ollama-hosten',
    description:
      'Schritt-für-Schritt Tutorial zum lokalen Betrieb von LLMs (llama3, phi3, Gemma) unter Linux / Docker.',
    date: '2024-07-20',
    tags: ['Selfhosting', 'Docker', 'AI', 'Ollama'],
    content: `
        <p>In diesem Tutorial zeige ich, wie man mit Ollama seine eigenen KI-Modelle lokal auf einem Linux-Server mit Docker betreiben kann. Das ermöglicht maximale Kontrolle über die eigenen Daten und Unabhängigkeit von Cloud-Anbietern.</p>
        <h3 class="text-3xl font-bold font-headline mt-8 mb-4">Voraussetzungen</h3>
        <ul class="list-disc list-inside text-xl space-y-2">
            <li>Ein Server mit Linux (z.B. Debian, Ubuntu)</li>
            <li>Docker und Docker Compose installiert</li>
            <li>(Optional) Eine NVIDIA-GPU für bessere Performance</li>
        </ul>
        <h3 class="text-3xl font-bold font-headline mt-8 mb-4">Schritt 1: Docker Compose anlegen</h3>
        <p>Wir erstellen eine <code>docker-compose.yml</code> Datei, um den Ollama-Dienst zu definieren. Für GPU-Support muss das NVIDIA Container Toolkit installiert sein.</p>
        <pre><code class="language-yaml">
version: '3.8'
services:
  ollama:
    image: ollama/ollama
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ./ollama:/root/.ollama
    restart: unless-stopped
        </code></pre>
        <h3 class="text-3xl font-bold font-headline mt-8 mb-4">Schritt 2: Modell herunterladen und ausführen</h3>
        <p>Nachdem der Container läuft, können wir ein Modell wie Llama3 herunterladen und direkt über die Kommandozeile nutzen.</p>
        <pre><code class="language-bash">
docker exec -it ollama ollama run llama3
        </code></pre>
        <p class="mt-4">Das war's schon! Jetzt läuft Ihr eigenes, privates LLM auf Ihrem Server.</p>
    `,
  },
  {
    title: 'Open WebUI mit Docker installieren',
    slug: 'open-webui-mit-docker',
    description:
      'Ein GUI-Frontend für Ollama auf deinem Server – inklusive GPU-Support und einfacher Konfiguration.',
    date: '2024-07-25',
    tags: ['UI', 'Docker', 'AI', 'Ollama'],
    content: `
        <p>Ollama ist super für die Kommandozeile, aber eine grafische Benutzeroberfläche macht die Interaktion mit den Modellen noch einfacher. Open WebUI ist ein fantastisches Frontend dafür.</p>
        <h3 class="text-3xl font-bold font-headline mt-8 mb-4">Erweiterte Docker Compose Konfiguration</h3>
        <p>Wir erweitern unsere bestehende <code>docker-compose.yml</code> um den Open WebUI Service.</p>
        <pre><code class="language-yaml">
version: '3.8'
services:
  ollama:
    # ... (wie im vorigen Post)
  
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "8080:8080"
    volumes:
      - ./open-webui:/app/backend/data
    depends_on:
      - ollama
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: unless-stopped
        </code></pre>
        <h3 class="text-3xl font-bold font-headline mt-8 mb-4">Konfiguration und erster Start</h3>
        <p>Nach dem Start der Container via <code>docker-compose up -d</code> können Sie Open WebUI unter <code>http://&lt;Ihre-Server-IP&gt;:8080</code> erreichen. Erstellen Sie einen Admin-Account und verbinden Sie die UI mit Ihrer Ollama-Instanz (standardmäßig unter <code>http://ollama:11434</code>).</p>
        <p class="mt-4">Jetzt haben Sie eine voll funktionsfähige, private ChatGPT-Alternative.</p>
    `,
  },
];
