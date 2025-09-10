import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  summary: string;
  fakeNewsScore: number;
  isRealNews: boolean;
  confidence: number;
  highlightedWords: string[];
}

const NewsAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeNews = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add a news article to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate analysis - in real implementation, this would use HuggingFace transformers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for demonstration
      const mockResult: AnalysisResult = {
        summary: generateMockSummary(inputText),
        fakeNewsScore: Math.random() * 100,
        isRealNews: Math.random() > 0.5,
        confidence: 65 + Math.random() * 30,
        highlightedWords: extractMockHighlights(inputText)
      };
      
      setResult(mockResult);
      
      toast({
        title: "Analysis Complete",
        description: "Your news article has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Something went wrong during analysis",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockSummary = (text: string): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, Math.min(2, sentences.length)).join('. ') + '.';
  };

  const extractMockHighlights = (text: string): string[] => {
    const words = text.toLowerCase().split(/\s+/);
    const suspiciousWords = ['breaking', 'huge', 'massive', 'incredible', 'shocking', 'exclusive'];
    return words.filter(word => suspiciousWords.some(sw => word.includes(sw)));
  };

  const highlightText = (text: string, highlights: string[]) => {
    if (!highlights.length) return text;
    
    let highlightedText = text;
    highlights.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-warning/30 px-1 rounded">$&</mark>`);
    });
    
    return highlightedText;
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">News Article Input</h2>
          </div>
          
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your news article here for AI analysis..."
            className="min-h-[150px] resize-none"
            disabled={isAnalyzing}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {inputText.length} characters
            </span>
            
            <Button 
              onClick={analyzeNews}
              disabled={isAnalyzing || !inputText.trim()}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Analyze Article
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold">AI Summary</h3>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </div>
            </div>
          </Card>

          {/* Detection Results Card */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Authenticity Check</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {result.isRealNews ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-danger" />
                    )}
                    <Badge 
                      variant={result.isRealNews ? "default" : "destructive"}
                      className={result.isRealNews ? "bg-success" : "bg-danger"}
                    >
                      {result.isRealNews ? "Likely Real" : "Likely Fake"}
                    </Badge>
                  </div>
                  
                  <span className="text-2xl font-bold">
                    {Math.round(result.confidence)}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Level</span>
                    <span>{Math.round(result.confidence)}%</span>
                  </div>
                  <Progress 
                    value={result.confidence} 
                    className={`h-2 ${result.isRealNews ? '[&>div]:bg-success' : '[&>div]:bg-danger'}`}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Highlighted Text Section */}
      {result && result.highlightedWords.length > 0 && (
        <Card className="p-6 bg-gradient-card shadow-card">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Key Indicators</h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Highlighted words that influenced our analysis:
            </p>
            
            <div 
              className="p-4 bg-muted/30 rounded-lg text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(inputText, result.highlightedWords) 
              }}
            />
            
            <div className="flex flex-wrap gap-2">
              {result.highlightedWords.map((word, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NewsAnalyzer;





// import React, { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Loader2, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// interface AnalysisResult {
//   summary: string;
//   fakeNewsScore: number;
//   isRealNews: boolean;
//   confidence: number;
//   highlightedWords: string[];
// }

// const NewsAnalyzer: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState<AnalysisResult | null>(null);
//   const { toast } = useToast();

//   const analyzeNews = async () => {
//     if (!inputText.trim()) {
//       toast({
//         title: "Please enter some text",
//         description: "Add a news article to analyze",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsAnalyzing(true);

//     try {
//       // Call your backend API that runs the HuggingFace or other AI model
//       const response = await fetch('http://127.0.0.1:8000/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: inputText }),
//         mode:'cors',
//       });

//       if (!response.ok) throw new Error('Analysis failed');

//       const data = await response.json();

//       const realResult: AnalysisResult = {
//         summary: data.summary,
//         fakeNewsScore: data.fakeNewsScore,
//         isRealNews: data.isRealNews,
//         confidence: data.confidence,
//         highlightedWords: data.highlightedWords
//       };

//       setResult(realResult);

//       toast({
//         title: "Analysis Complete",
//         description: "Your news article has been analyzed successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Analysis Failed",
//         description: "Something went wrong during analysis",
//         variant: "destructive"
//       });
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const highlightText = (text: string, highlights: string[]) => {
//     if (!highlights.length) return text;

//     let highlightedText = text;
//     highlights.forEach(word => {
//       const regex = new RegExp(`\\b${word}\\b`, 'gi');
//       highlightedText = highlightedText.replace(regex, `<mark class="bg-warning/30 px-1 rounded">$&</mark>`);
//     });

//     return highlightedText;
//   };

//   return (
//     <div className="space-y-8">
//       {/* Input Section */}
//       <Card className="p-6 bg-gradient-card shadow-card">
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <FileText className="h-5 w-5 text-primary" />
//             <h2 className="text-xl font-semibold">News Article Input</h2>
//           </div>

//           <Textarea
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder="Paste your news article here for AI analysis..."
//             className="min-h-[150px] resize-none"
//             disabled={isAnalyzing}
//           />

//           <div className="flex justify-between items-center">
//             <span className="text-sm text-muted-foreground">
//               {inputText.length} characters
//             </span>

//             <Button
//               onClick={analyzeNews}
//               disabled={isAnalyzing || !inputText.trim()}
//               className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
//             >
//               {isAnalyzing ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Analyzing...
//                 </>
//               ) : (
//                 <>
//                   <Shield className="h-4 w-4 mr-2" />
//                   Analyze Article
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Results Section */}
//       {result && (
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Summary Card */}
//           <Card className="p-6 bg-gradient-card shadow-card">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <FileText className="h-5 w-5 text-accent" />
//                 <h3 className="text-lg font-semibold">AI Summary</h3>
//               </div>

//               <div className="p-4 bg-muted/30 rounded-lg">
//                 <p className="text-sm leading-relaxed">{result.summary}</p>
//               </div>
//             </div>
//           </Card>

//           {/* Detection Results Card */}
//           <Card className="p-6 bg-gradient-card shadow-card">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Shield className="h-5 w-5 text-primary" />
//                 <h3 className="text-lg font-semibold">Authenticity Check</h3>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     {result.isRealNews ? (
//                       <CheckCircle className="h-5 w-5 text-success" />
//                     ) : (
//                       <AlertTriangle className="h-5 w-5 text-danger" />
//                     )}
//                     <Badge
//                       variant={result.isRealNews ? "default" : "destructive"}
//                       className={result.isRealNews ? "bg-success" : "bg-danger"}
//                     >
//                       {result.isRealNews ? "Likely Real" : "Likely Fake"}
//                     </Badge>
//                   </div>

//                   <span className="text-2xl font-bold">
//                     {Math.round(result.confidence)}%
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Confidence Level</span>
//                     <span>{Math.round(result.confidence)}%</span>
//                   </div>
//                   <Progress
//                     value={result.confidence}
//                     className={`h-2 ${result.isRealNews ? '[&>div]:bg-success' : '[&>div]:bg-danger'}`}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}

//       {/* Highlighted Text Section */}
//       {result && result.highlightedWords.length > 0 && (
//         <Card className="p-6 bg-gradient-card shadow-card">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-warning" />
//               <h3 className="text-lg font-semibold">Key Indicators</h3>
//             </div>

//             <p className="text-sm text-muted-foreground">
//               Highlighted words that influenced our analysis:
//             </p>

//             <div
//               className="p-4 bg-muted/30 rounded-lg text-sm leading-relaxed"
//               dangerouslySetInnerHTML={{
//                 __html: highlightText(inputText, result.highlightedWords)
//               }}
//             />

//             <div className="flex flex-wrap gap-2">
//               {result.highlightedWords.map((word, index) => (
//                 <Badge key={index} variant="outline" className="text-xs">
//                   {word}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default NewsAnalyzer;
