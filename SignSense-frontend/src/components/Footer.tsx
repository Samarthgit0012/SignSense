import { Hand, Mail, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="rounded-lg bg-gradient-primary p-2">
                <Hand className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>SignSpeak</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Breaking communication barriers through AI-powered sign language translation and education.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learn" className="hover:text-foreground transition-colors">Learning Modules</Link></li>
              <li><Link to="/translate" className="hover:text-foreground transition-colors">Live Translation</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Research Paper</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 SignSpeak. Building an inclusive future, one sign at a time.</p>
        </div>
      </div>
    </footer>
  );
};
