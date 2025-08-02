const Footer = () => {
  return (
    <footer className="relative z-10 py-6 border-t border-border/50">
      <div className="container mx-auto px-6 sm:px-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Benedikt Schächner. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
