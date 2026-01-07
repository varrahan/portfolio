import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { fetchSocials } from '@/api/fetchData';


type Contact = {
  icon: string,
  label: string,
  value: string,
  href: string
}

type Social = {
  icon: string,
  href: string,
  label: string
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState<Contact[]>([])
  const [socialLinks, setSocialLinks] = useState<Social[]>([])

  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSocials();
        setContactInfo(data.contactInfo);
        setSocialLinks(data.socialLinks)
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };

    loadData();
  }, []);

  const handleSendEmail = () => {

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const iconMap = {
    Github,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 desert-text-gradient">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your next project or explore collaboration opportunities? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button onClick={handleSendEmail} type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = iconMap[info.icon as keyof typeof iconMap];;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-accent flex-shrink-0" />
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <a 
                          href={info.href} 
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = iconMap[social.icon as keyof typeof iconMap];;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a href={social.href} aria-label={social.label}>
                          <IconComponent className="h-4 w-4" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Available for</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Backend Development Projects</li>
                  <li>• Cloud Architecture Development</li>
                  <li>• Data Pipelining</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;