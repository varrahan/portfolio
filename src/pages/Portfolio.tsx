
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Github, Server, Cloud, Brain, Bitcoin, CircuitBoard } from 'lucide-react';

import { fetchPortfolio } from '@/api/fetchData';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  categories: string[];
  icon: string;
  github: string;
  live?: string;
}

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await fetchPortfolio();
          setPortfolio(data.portfolio);
        } catch (error) {
          console.error("Failed to fetch experience:", error);
        }
      };
  
      loadData();
    }, []);
  

  const filteredPortfolio = activeCategory === 'All' ? portfolio : portfolio.filter(project => project.categories.includes(activeCategory))
  const iconMap = {
    Server, 
    Cloud, 
    Brain, 
    Bitcoin, 
    CircuitBoard
  }

  const categories = ['All', 'Backend', 'Cloud', 'AI', 'Embedded'];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 desert-text-gradient">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my technical projects and software solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={category === activeCategory ? 'default' : 'outline'}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((project, index) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap];
            return (
              <Card key={index} className="flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-6 w-6 text-accent" />
                    {
                      project.categories.map((category) => (
                        <Badge key={category} variant="secondary">{category}</Badge>
                      ))
                    }
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    {project.live && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(project.live, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
