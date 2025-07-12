import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, MapPin, GraduationCap, Code, Wrench, BookOpen } from 'lucide-react';
import { fetchSkills } from '@/api/fetchData';

const About = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([])
  const [toolsAndSoftware, setToolsAndSoftware] = useState<string[]>([])
  const [librariesAndFrameworks, setLibrariesAndFrameworks] = useState<string[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSkills();
        setProgrammingLanguages(data.programmingLanguages);
        setToolsAndSoftware(data.toolsAndSoftware)
        setLibrariesAndFrameworks(data.librariesAndFrameworks)
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 desert-text-gradient">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate software engineer with a focus on building scalable backend systems, 
            cloud infrastructure, and AI-powered solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-accent" />
                Professional Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                As a Computer Engineering student with 20+ months of software development experience, 
                I am proficient in Python, Golang, and C, with my experience extending towards Backend,
                AI/ML, and Cloud technologies. 
              </p>
              <p className="text-muted-foreground">
                I specialize in building backend applications and AI powered services. I am fascinated by 
                the endless possibilities and innovations of technology, especially in the AI/ML and Cloud
                industries, and I flourish when facing challenging problems that require my creativity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-accent" />
                Background & Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>Computer Engineering @ Carleton University, B.Eng. - Present</span>
              </div>
              <p className="text-muted-foreground">
                My academic foundation in computer engineering provides me with strong fundamentals 
                in algorithms, data structures, computer architecture, and software engineering principles. 
                I continue to expand my knowledge through continuous learning and hands-on experimentation.
              </p>
              <p className="text-muted-foreground">
                I believe in staying up to date with technology trends and contribute and build 
                open-source projects while exploring emerging technologies in cloud computing and AI.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6 text-accent" />
                Programming Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {programmingLanguages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-sm">
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-accent" />
                Tools & Software
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {toolsAndSoftware.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Libraries & Frameworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {librariesAndFrameworks.map((framework) => (
                  <Badge key={framework} variant="secondary" className="text-sm">
                    {framework}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;