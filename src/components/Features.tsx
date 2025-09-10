import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Shield, Eye, Zap, Globe, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Summarization",
      description: "Advanced transformer models distill lengthy articles into concise, accurate summaries.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Fake News Detection",
      description: "Sophisticated algorithms analyze patterns to identify potentially misleading content.",
      color: "text-accent"
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "See exactly which words and phrases influenced our AI's decision-making process.",
      color: "text-warning"
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Get instant results powered by browser-based machine learning models.",
      color: "text-success"
    },
    {
      icon: Globe,
      title: "Privacy First",
      description: "All processing happens in your browser - your data never leaves your device.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Accessible",
      description: "No downloads, no signups. Just paste your article and get immediate insights.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Why Choose Our AI Analyzer?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with cutting-edge AI technology to help you navigate the modern information landscape
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;