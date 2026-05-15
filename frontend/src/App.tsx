import { Scissors, Sparkles, Clock, Calendar, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import saloonBg from "./assets/saloon-bg.png";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <img 
          src={saloonBg} 
          alt="Luxury Saloon" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-in fade-in duration-1000 brightness-[0.35]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-background via-background/20 to-transparent">
          <Badge variant="secondary" className="mb-6 px-5 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 text-white backdrop-blur-md border-white/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
            Est. 2024 • Premium Grooming
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Elegance <span className="text-primary italic">Redefined</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-[700px] mb-10 leading-relaxed animate-in slide-in-from-bottom-12 duration-700 delay-200">
            Experience the pinnacle of modern grooming. Our master barbers combine traditional techniques with contemporary style to craft your perfect look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-16 duration-700 delay-300">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold backdrop-blur-xl bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
              <span className="w-8 h-[2px] bg-primary"></span>
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Signature Experiences</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              From precision cuts to luxury facial treatments, we offer a curated selection of grooming services tailored to your individual style.
            </p>
          </div>
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search services..." 
              className="pl-12 h-14 bg-muted/30 border-muted-foreground/10 rounded-2xl focus-visible:ring-primary shadow-inner text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Master Haircut */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-muted-foreground/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-5 z-10">
              <Badge className="bg-primary/90 text-primary-foreground font-bold shadow-lg">
                MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="relative pb-0">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 rotate-3 group-hover:rotate-0">
                <Scissors className="w-7 h-7" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Master Haircut</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                A customized cutting experience including consultation, wash, and premium styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-primary" /> 45 min
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> 4.9 <span className="text-muted-foreground font-normal">(120)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-8 mt-4 border-t border-muted-foreground/5">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Price</span>
                <span className="text-3xl font-black text-foreground">$45</span>
              </div>
              <Button size="lg" className="rounded-xl group/btn hover:scale-105 active:scale-95 transition-all">
                Select
                <Sparkles className="ml-2 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Royal Shave */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-muted-foreground/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-2">
            <CardHeader className="relative pb-0">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 -rotate-3 group-hover:rotate-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Royal Shave</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Traditional straight-razor shave with hot towel treatment and luxury oils.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-primary" /> 30 min
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> 4.8 <span className="text-muted-foreground font-normal">(85)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-8 mt-4 border-t border-muted-foreground/5">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Price</span>
                <span className="text-3xl font-black text-foreground">$35</span>
              </div>
              <Button size="lg" className="rounded-xl group/btn hover:scale-105 active:scale-95 transition-all">
                Select
                <Sparkles className="ml-2 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: The Full Package */}
          <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-muted-foreground/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-2 lg:col-span-1 md:col-span-2 lg:col-start-auto">
            <div className="absolute top-0 right-0 p-5 z-10">
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold">
                BEST VALUE
              </Badge>
            </div>
            <CardHeader className="relative pb-0">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 rotate-6 group-hover:rotate-0">
                <Calendar className="w-7 h-7" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">The Full Package</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Our ultimate experience: Master Cut, Royal Shave, and rejuvenating facial.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-primary" /> 90 min
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> 5.0 <span className="text-muted-foreground font-normal">(42)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-8 mt-4 border-t border-muted-foreground/5">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Price</span>
                <span className="text-3xl font-black text-foreground">$95</span>
              </div>
              <Button size="lg" className="rounded-xl group/btn hover:scale-105 active:scale-95 transition-all">
                Select
                <Sparkles className="ml-2 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-all translate-x-2 group-hover/btn:translate-x-0" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Newsletter / Contact Section - Glassmorphism demo */}
      <div className="max-w-7xl mx-auto px-6 pb-28">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-12 md:p-20 text-primary-foreground text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Stay Sharp.</h3>
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              Join our exclusive club for grooming tips, priority booking, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email" 
                className="h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white text-lg px-6"
              />
              <Button size="lg" variant="secondary" className="h-14 px-8 rounded-2xl font-bold text-lg hover:scale-105 transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
